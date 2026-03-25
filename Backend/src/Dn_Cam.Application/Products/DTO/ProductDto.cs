using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.Entities;
using System;

namespace Dn_Cam.Products.DTO
{
    [AutoMapFrom(typeof(Product))]
    public class ProductDto : EntityDto<int>
    {
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string MainImage { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreationTime { get; set; }
    }
}