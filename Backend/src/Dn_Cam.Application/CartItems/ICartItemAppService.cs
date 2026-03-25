using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Dn_Cam.CartItems.DTO;

namespace Dn_Cam.CartItems
{
    // Chú ý: Tham số thứ 4 đã được đổi thành CreateCartItemDto
    public interface ICartItemAppService : IAsyncCrudAppService<CartItemDto, int, PagedAndSortedResultRequestDto, CreateCartItemDto, CartItemDto>
    {
    }
}