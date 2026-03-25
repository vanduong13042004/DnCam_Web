using Abp.AutoMapper;
using Dn_Cam.Entities;
using Dn_Cam.OrderItems.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.Orders.DTO
{
    [AutoMapTo(typeof(Order))]
    public class CreateOrderDto
    {
        [Required(ErrorMessage = "Vui lòng nhập tên người nhận")]
        [StringLength(255)]
        public string ReceiverName { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        [StringLength(20)]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập địa chỉ giao hàng")]
        public string ShippingAddress { get; set; }
        public int PaymentMethod { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }
        public List<CreateOrderItemDto> Items { get; set; }
    }
}
