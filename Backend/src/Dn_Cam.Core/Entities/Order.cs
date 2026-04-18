using Abp.Domain.Entities.Auditing;
using Dn_Cam.Authorization.Users;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dn_Cam.Entities
{
    public enum PaymentMethodType
    {
        COD = 1,          // Thanh toán khi nhận hàng
        BankTransfer = 2, // Chuyển khoản
        VNPay = 3
    }

    public enum OrderStatus
    {
        Pending = 1,    // Chờ xác nhận
        Processing = 2, // Đang xử lý
        Shipping = 3,   // Đang giao
        Completed = 4,  // Hoàn thành
        Canceled = 5    // Đã hủy
    }
    [Table("Orders")]
    public class Order : FullAuditedEntity<int>
    {
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [Required]
        [StringLength(255)]
        public string ReceiverName { get; set; }

        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; }

        [Required]
        [StringLength(500)]
        public string ShippingAddress { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ItemsTotal { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ShippingFee { get; set; }

        public int PaymentMethod { get; set; }

        [StringLength(500)]
        public string Note { get; set; }

        public int Status { get; set; }

         public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}