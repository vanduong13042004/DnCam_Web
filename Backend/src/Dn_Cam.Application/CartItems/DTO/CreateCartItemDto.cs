using Abp.AutoMapper;
using Dn_Cam.Entities;
using System.ComponentModel.DataAnnotations;

namespace Dn_Cam.CartItems.DTO
{
    [AutoMapTo(typeof(CartItem))]
    public class CreateCartItemDto
    {
        [Required]
        public int CartId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}