using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Dn_Cam.Entities;
using Dn_Cam.ProductSpecifications.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.ProductSpecifications
{
    public class ProductSpecificationAppService : AsyncCrudAppService<ProductSpecification, ProductSpecificationDto, int, PagedAndSortedResultRequestDto, CreateProductSpecificationDto, ProductSpecificationDto>, IProductSpecificationAppService
    {
        public ProductSpecificationAppService(IRepository<ProductSpecification, int> repository) : base(repository)
        {
        }
    }
}
