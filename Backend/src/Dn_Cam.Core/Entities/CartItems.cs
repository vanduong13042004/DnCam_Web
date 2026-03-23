using Abp.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;


namespace Dn_Cam.Entities
{
    [Table("CartItems")]

    public class CartItem : Entity<int>
    {
        public int CartId {  get; set; }
        [ForeignKey("CartId")]
        public virtual Cart Cart {  get; set; }
        public int ProductId {  get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product {  get; set; }
        public int Quantity { get; set; }

    }
}
