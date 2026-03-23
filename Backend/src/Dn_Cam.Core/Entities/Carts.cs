using Abp.Domain.Entities.Auditing;
using Dn_Cam.Authorization.Users;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Dn_Cam.Entities
{
    [Table("Carts")]
    public class Cart : CreationAuditedEntity<int>
    {
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }

    }
}
