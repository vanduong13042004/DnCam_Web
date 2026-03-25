using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Dn_Cam.Brands.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.Brands
{
    public interface IBrandAppService : IAsyncCrudAppService<BrandDto, int, PagedAndSortedResultRequestDto, CreateBrandDto, BrandDto>
    {
    }
}
