namespace OniriumBE.DTOs.Shop
{
    public class OrderDetailDto
    {
        public int OrderDetailID { get; set; }
        public int OrderID { get; set; }
        public Guid ProductID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public ProductDto Product { get; set; }
    }
}
