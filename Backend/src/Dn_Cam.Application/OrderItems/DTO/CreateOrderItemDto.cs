using Abp.AutoMapper;
using Dn_Cam.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Dn_Cam.OrderItems.DTO
{
    [AutoMapTo(typeof(OrderItem))]
    public class CreateOrderItemDto
    {
        [Required]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
