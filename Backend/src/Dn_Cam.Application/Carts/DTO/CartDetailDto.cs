using Abp.Application.Services.Dto;
using System.Collections.Generic;

namespace Dn_Cam.Carts.DTO
{
    public class CartDetailDto : EntityDto<int>
    {
        public decimal ItemsTotal { get; set; } // Tổng tiền các món hàng
        public decimal ShippingFee { get; set; }
        public decimal TotalAmount { get; set; }
        public List<CartItemDetailDto> Items { get; set; } = new List<CartItemDetailDto>();
    }
}