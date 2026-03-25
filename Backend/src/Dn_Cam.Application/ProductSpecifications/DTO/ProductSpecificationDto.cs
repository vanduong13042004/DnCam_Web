using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.ProductSpecifications.DTO
{
    [AutoMapFrom(typeof(ProductSpecification))]
    public class ProductSpecificationDto : EntityDto<int>
    {
        public int ProductId { get; set; }
        public string SpecName { get; set; }
        public string SpecValue { get; set; }
    }
}
