using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Dn_Cam.Entities
{
    [Table("Products")]
    public class Product : FullAuditedEntity<int>
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        [StringLength(2000)]
        public string MainImage { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
        public int BrandId { get; set; }
        [ForeignKey("BrandId")]
        public virtual Brand Brand { get; set; }
    }
}
