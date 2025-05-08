namespace OniriumBE.DTOs.Shop
{
    public class OrderDto
    {
        public int OrderID { get; set; }
        public string UserID { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string OrderStatus { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
    }
}
