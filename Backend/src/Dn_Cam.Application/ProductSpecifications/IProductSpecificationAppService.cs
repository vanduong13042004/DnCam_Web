using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Dn_Cam.ProductSpecifications.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.ProductSpecifications
{
    public interface IProductSpecificationAppService : IAsyncCrudAppService <ProductSpecificationDto, int, PagedAndSortedResultRequestDto, CreateProductSpecificationDto, ProductSpecificationDto>
    {
    }
}
