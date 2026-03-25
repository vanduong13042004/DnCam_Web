using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Dn_Cam.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.Orders.DTO
{
    [AutoMapFrom(typeof(Order))]
    public class OrderDto : EntityDto<int>
    {
        public int UserId { get; set; }
        public string ReceiverName { get; set; }
        public string PhoneNumber { get; set; }
        public string ShippingAddress { get; set; }
        public decimal TotalAmount { get; set; }
        public int PaymentMethod { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
