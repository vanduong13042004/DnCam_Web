using Abp.AutoMapper;
using Dn_Cam.Entities;
using System.ComponentModel.DataAnnotations;

namespace Dn_Cam.Products.DTO
{
    [AutoMapTo(typeof(Product))]
    public class CreateProductDto 
    {
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int BrandId { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string MainImage { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}