namespace OniriumBE.DTOs.Shop
{
    public class ProductVariantDto
    {
        public int ColorId { get; set; }
        public List<IFormFile> Images { get; set; }
        public List<StockDto> Stocks { get; set; }

    }
}
