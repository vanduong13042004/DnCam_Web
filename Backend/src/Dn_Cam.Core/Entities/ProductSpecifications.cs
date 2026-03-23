using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Dn_Cam.Entities
{
    [Table("ProductSpecifications")]
    public class ProductSpecification : Entity<int>
    {   [Required]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        [Required]
        [StringLength(255)]
        public string SpecName { get; set; }
        public string SpecValue { get; set; }
        
    }
}
