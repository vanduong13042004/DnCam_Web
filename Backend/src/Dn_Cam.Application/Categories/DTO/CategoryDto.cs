using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.Entities;

namespace Dn_Cam.Categories.DTO
{
    [AutoMap(typeof(Category))]
    public class CategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }
    }
}