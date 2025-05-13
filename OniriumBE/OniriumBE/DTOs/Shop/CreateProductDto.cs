namespace OniriumBE.DTOs.Shop
{
    public class CreateProductDto
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public List<ProductVariantDto> Variants { get; set; }
    }
}
