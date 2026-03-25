using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Dn_Cam.Products.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.Products
{
    public interface IProducAppService : IAsyncCrudAppService<ProductDto, int, PagedAndSortedResultRequestDto, CreateProductDto, ProductDto> 
    {
    }
}
