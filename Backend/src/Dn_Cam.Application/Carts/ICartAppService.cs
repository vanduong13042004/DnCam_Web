using Abp.Application.Services;
using Dn_Cam.Carts.DTO;
using System.Threading.Tasks;

namespace Dn_Cam.Carts
{
    public interface ICartAppService : IApplicationService
    {
        // Khai báo một hàm để thêm đồ vào giỏ
        Task AddToCartAsync(AddToCartDto input);
    }
}