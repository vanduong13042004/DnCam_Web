using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Dn_Cam.Entities
{
    [Table("Brands")]
    public class Brand : Entity<int>, ISoftDelete
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(1000)]
        public string LogoUrl { get; set; }

        public bool IsDeleted { get; set; }
    }
}
