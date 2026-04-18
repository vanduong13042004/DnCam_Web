using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.Entities;

namespace Dn_Cam.CartItems.DTO
{
    [AutoMap(typeof(CartItem))]
    public class CartItemDto : EntityDto<int>

    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        //public string ProductName { get; set; }
        //public decimal ProductPrice { get; set; }
        //public string MainImage { get; set; }
        //public int StockQuantity { get; set; }

    }
}
