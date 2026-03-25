using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Dn_Cam.Categories.DTO;
using Dn_Cam.Entities;

namespace Dn_Cam.Categories
{
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, int, PagedAndSortedResultRequestDto, CreateCategoryDto, CategoryDto>, ICategoryAppService
    {
        public CategoryAppService(IRepository<Category, int> repository)
            : base(repository)
        {
        }
    }
}