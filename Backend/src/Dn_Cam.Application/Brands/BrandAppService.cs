using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Dn_Cam.Brands.DTO;
using Dn_Cam.Entities;


namespace Dn_Cam.Brands
{
    public class BrandAppService : AsyncCrudAppService<Brand, BrandDto, int, PagedAndSortedResultRequestDto, CreateBrandDto, BrandDto>, IBrandAppService
    {
        public BrandAppService(IRepository<Brand, int> repository) : base(repository)
        {
        }
    }
}
