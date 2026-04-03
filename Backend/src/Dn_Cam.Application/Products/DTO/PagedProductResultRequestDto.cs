using Abp.Application.Services.Dto;

namespace Dn_Cam.Products.DTO
{
    public class PagedProductResultRequestDto : PagedAndSortedResultRequestDto
    {
        // tìm theo tên
        public string Keyword { get; set; }
        // lọc theo Category
        public int? CategoryId { get; set; }
        public int? BrandId { get; set; }
        //lọc theo giá 
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
    }
}