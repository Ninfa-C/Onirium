namespace OniriumBE.DTOs.Shop
{
    public class ProductVariantDto
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public int ColorId { get; set; }
        public List<StockDto> Stocks { get; set; }
    }
}
