using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.Shop;
using OniriumBE.Models.Shop;
using Serilog;

namespace OniriumBE.Services
{
    public class ShopService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public ShopService(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }

        public async Task<bool> CreateProductAsync(CreateProductDto dto)
        {
            try
            {
                var productId = Guid.NewGuid();

                var product = new Product
                {
                    Id = productId,
                    Name = dto.Name,
                    CategoryId = dto.CategoryId,
                    Price = dto.Price,
                    Description = dto.Description,
                    Tags = dto.Tags,
                    CratedAt = DateTime.UtcNow,
                    LastUpdated = DateTime.UtcNow,
                    Variants = new List<Variant>()
                };

                foreach (var variantDto in dto.Variants)
                {
                    var variant = new Variant
                    {
                        ProductId = productId,
                        ColorId = variantDto.ColorId,
                        Stocks = variantDto.Stocks.Select(s => new Stock
                        {
                            SizeId = s.SizeId,
                            Quantity = s.Quantity
                        }).ToList()
                    };

                    product.Variants.Add(variant);

                    if (variantDto.Images != null)
                    {
                        foreach (var file in variantDto.Images)
                        {
                            string webPath = null;

                            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                            var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "color-images", fileName);
                            await using (var stream = new FileStream(path, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }
                            webPath = Path.Combine("assets", "color-images", fileName);



                            _context.ColorImages.Add(new ColorImage
                            {
                                ColorId = variantDto.ColorId,
                                Image = webPath
                            });
                        }
                    }

                }
                _context.Product.Add(product);
                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione del prodotto");
                return false;
            }
        }

        public async Task<Product> GetProductAsync(Guid id)
        {
            return await _context.Product
                .Include(p => p.Variants)
                    .ThenInclude(v => v.Stocks)
                .Include(p => p.Variants)
                    .ThenInclude(v => v.Color)
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Product
                .Include(p => p.Variants)
                    .ThenInclude(v => v.Stocks)
                .Include(p => p.Category)
                .ToListAsync();
        }

        public async Task<bool> DeleteProductAsync(Guid id)
        {
            var product = await _context.Product
                .Include(p => p.Variants)
                    .ThenInclude(v => v.Stocks)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            _context.Stocks.RemoveRange(product.Variants.SelectMany(v => v.Stocks));
            _context.ProductVariant.RemoveRange(product.Variants);
            _context.Product.Remove(product);

            return await _services.SaveAsync();
        }


        public async Task<bool> UpdateProductAsync(Guid id, CreateProductDto dto)
        {
            var product = await _context.Product
                .Include(p => p.Variants)
                    .ThenInclude(v => v.Stocks)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            product.Name = dto.Name;
            product.CategoryId = dto.CategoryId;
            product.Price = dto.Price;
            product.Description = dto.Description;
            product.Tags = dto.Tags;
            product.LastUpdated = DateTime.UtcNow;

            var uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "assets", "color-images");
            Directory.CreateDirectory(uploadDir);

            var incomingColorIds = dto.Variants.Select(v => v.ColorId).ToList();

            var toRemove = product.Variants.Where(v => !incomingColorIds.Contains(v.ColorId)).ToList();

            foreach (var variant in toRemove)
            {
                _context.Stocks.RemoveRange(variant.Stocks);
                product.Variants.Remove(variant);

                var imgsToRemove = await _context.ColorImages.Where(i => i.ColorId == variant.ColorId).ToListAsync();
                _context.ColorImages.RemoveRange(imgsToRemove);
            }

            foreach (var variantDto in dto.Variants)
            {
                var existingVariant = product.Variants.FirstOrDefault(v => v.ColorId == variantDto.ColorId);
                if (existingVariant != null)
                {
                    _context.Stocks.RemoveRange(existingVariant.Stocks);
                    existingVariant.Stocks = variantDto.Stocks.Select(s => new Stock
                    {
                        SizeId = s.SizeId,
                        Quantity = s.Quantity
                    }).ToList();

                    if (variantDto.Images != null && variantDto.Images.Any())
                    {
                        foreach (var file in variantDto.Images)
                        {
                            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                            var path = Path.Combine(uploadDir, fileName);
                            await using (var stream = new FileStream(path, FileMode.Create))
                                await file.CopyToAsync(stream);

                            var webPath = Path.Combine("assets", "color-images", fileName).Replace("\\", "/");

                            _context.ColorImages.Add(new ColorImage
                            {
                                ColorId = variantDto.ColorId,
                                Image = webPath
                            });
                        }
                    }
                }
                else
                {
                    var newVariant = new Variant
                    {
                        ProductId = product.Id,
                        ColorId = variantDto.ColorId,
                        Stocks = variantDto.Stocks.Select(s => new Stock
                        {
                            SizeId = s.SizeId,
                            Quantity = s.Quantity
                        }).ToList()
                    };

                    product.Variants.Add(newVariant);

                    if (variantDto.Images != null)
                    {
                        foreach (var file in variantDto.Images)
                        {
                            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                            var path = Path.Combine(uploadDir, fileName);
                            await using (var stream = new FileStream(path, FileMode.Create))
                                await file.CopyToAsync(stream);

                            var webPath = Path.Combine("assets", "color-images", fileName).Replace("\\", "/");

                            _context.ColorImages.Add(new ColorImage
                            {
                                ColorId = variantDto.ColorId,
                                Image = webPath
                            });
                        }
                    }
                }
            }

            return await _services.SaveAsync();
        }



    }

}

