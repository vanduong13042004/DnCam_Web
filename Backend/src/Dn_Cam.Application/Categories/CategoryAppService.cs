using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using Dn_Cam.Categories.DTO;
using Dn_Cam.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dn_Cam.Categories
{
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, int, PagedAndSortedResultRequestDto, CreateCategoryDto, CategoryDto>, ICategoryAppService
    {
        public CategoryAppService(IRepository<Category, int> repository)
            : base(repository)
        {
        }
        public async Task CreateListCategory(List<CreateCategoryDto> listCategory)
        {
            var entities = ObjectMapper.Map<List<Category>>(listCategory);
            Repository.InsertRange(entities);
        }
    }
    
}