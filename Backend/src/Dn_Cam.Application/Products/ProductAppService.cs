using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Dn_Cam.Entities;
using Dn_Cam.Products.Dto;
using Dn_Cam.Products.DTO;
using System.Linq;

namespace Dn_Cam.Products
{
    public class ProductAppService : AsyncCrudAppService<Product, ProductDto, int, PagedProductResultRequestDto, CreateProductDto, ProductDto>, IProducAppService
    {
        public ProductAppService(IRepository<Product, int> repository) : base(repository)
        {
        }
        protected override IQueryable<Product> CreateFilteredQuery(PagedProductResultRequestDto input)
        {
            var query = Repository.GetAll();

            if (!string.IsNullOrWhiteSpace(input.Keyword))
            {
                query = query.Where(p => p.Name.Contains(input.Keyword) || p.Description.Contains(input.Keyword));
            }

            if (input.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == input.CategoryId.Value);
            }

            if (input.BrandId.HasValue)
            {
                query = query.Where(p => p.BrandId == input.BrandId.Value);
            }

            if (input.MinPrice.HasValue)
            {
                query = query.Where(p => p.Price >= input.MinPrice.Value);
            }

            if (input.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= input.MaxPrice.Value);
            }

            return query;
        }
    }
    internal interface IProducAppService
    {
    }
}
