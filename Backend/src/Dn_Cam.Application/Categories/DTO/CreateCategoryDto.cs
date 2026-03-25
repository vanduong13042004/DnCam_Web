using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;
using Dn_Cam.Entities;

namespace Dn_Cam.Categories.DTO
{
    [AutoMapTo(typeof(Category))]
    public class CreateCategoryDto
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}