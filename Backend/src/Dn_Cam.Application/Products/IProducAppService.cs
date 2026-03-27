using Abp.Application.Services;
using Dn_Cam.Products.Dto;
using Dn_Cam.Products.DTO; 

namespace Dn_Cam.Products
{
    public interface IProductAppService : IAsyncCrudAppService<ProductDto, int, PagedProductResultRequestDto, CreateProductDto, ProductDto>
    {
    }
}