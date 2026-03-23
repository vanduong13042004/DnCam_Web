using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dn_Cam.Entities
{
    [Table("Categories")]
    public class Category : FullAuditedEntity<int>
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}