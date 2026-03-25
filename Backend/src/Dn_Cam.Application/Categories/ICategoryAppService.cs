using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Dn_Cam.Categories.DTO;

namespace Dn_Cam.Categories
{
    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, int, PagedAndSortedResultRequestDto, CreateCategoryDto, CategoryDto>
    {
    }
}