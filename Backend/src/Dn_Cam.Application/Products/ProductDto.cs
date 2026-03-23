using Abp.Application.Services.Dto;
using System;

namespace Dn_Cam.Products.Dto
{
    public class ProductDto : EntityDto<int>
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string MainImage { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
    }
}