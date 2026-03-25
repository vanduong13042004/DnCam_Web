using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Dn_Cam.Entities;
using Dn_Cam.Products.DTO;

namespace Dn_Cam.Products
{
    public class ProductAppService : AsyncCrudAppService<Product, ProductDto, int, PagedAndSortedResultRequestDto, CreateProductDto, ProductDto>, IProducAppService
    {
        public ProductAppService(IRepository<Product, int> repository) : base(repository)
        {
        }
    }
}
