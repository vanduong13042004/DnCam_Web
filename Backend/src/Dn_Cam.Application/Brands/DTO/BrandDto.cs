using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.Brands.DTO
{
    [AutoMapFrom(typeof(Brand))]
    public class BrandDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string LogoUrl { get; set; }
    }
}
