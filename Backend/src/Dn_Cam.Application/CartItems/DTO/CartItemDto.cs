using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.Entities;

namespace Dn_Cam.CartItems.DTO
{
    [AutoMapFrom(typeof(CartItem))]
    public class CartItemDto : EntityDto<int>

    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductMainImage { get; set; }
        public int ProductStockQuantity { get; set; }

    }
}
