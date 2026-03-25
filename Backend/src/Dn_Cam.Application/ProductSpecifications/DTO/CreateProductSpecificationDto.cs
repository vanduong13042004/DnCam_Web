using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.Entities;
using System.ComponentModel.DataAnnotations;

namespace Dn_Cam.ProductSpecifications.DTO
{
    [AutoMapTo(typeof(ProductSpecification))]
    
    public class CreateProductSpecificationDto 
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        [StringLength(255)]
        public string SpecName { get; set; }
        [Required]
        [StringLength(255)]
        public string SpecValue { get; set; }

    }
}
