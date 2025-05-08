namespace OniriumBE.DTOs.Shop
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime CratedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public List<ProductVariantDto> Variants { get; set; }
    }
}
