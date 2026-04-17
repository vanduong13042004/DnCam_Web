using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Dn_Cam.CartItems.DTO;
using Dn_Cam.Entities;
using Microsoft.EntityFrameworkCore; // Bắt buộc phải có using này để dùng ToListAsync() và FirstOrDefaultAsync()
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dn_Cam.CartItems
{
    public class CartItemAppService : AsyncCrudAppService<CartItem, CartItemDto, int, PagedAndSortedResultRequestDto, CreateCartItemDto, CartItemDto>, ICartItemAppService
    {
        // 1. Khai báo đúng kiểu IRepository của bảng Cart
        private readonly IRepository<Cart, int> _cartRepository;

        // 2. Tiêm (Inject) _cartRepository qua Constructor
        public CartItemAppService(
            IRepository<CartItem, int> repository,
            IRepository<Cart, int> cartRepository // Thêm dòng này vào
        ) : base(repository)
        {
            _cartRepository = cartRepository; // Gán giá trị
        }

        [AbpAuthorize] // Bắt buộc phải đăng nhập mới được gọi hàm này
        public async Task<List<CartItemDto>> GetMyCartAsync()

        {

            // 1. Lấy Id của người dùng đang đăng nhập
            var currentUserId = AbpSession.UserId;

            if (currentUserId == null)
            {
                return new List<CartItemDto>(); // Chưa đăng nhập thì trả về mảng rỗng
            }

            // 2. Tìm cái Giỏ hàng (Cart) của người này thông qua IRepository<Cart>
            var myCart = await _cartRepository.FirstOrDefaultAsync(c => c.UserId == currentUserId.Value);
            if (myCart == null)
            {
                return new List<CartItemDto>(); // Chưa có giỏ hàng thì cũng trả về rỗng
            }

            // 3. Lấy tất cả các món hàng (CartItems) nằm trong cái Giỏ đó
            // Lưu ý: Dùng trực tiếp biến 'Repository' của class cha (AsyncCrudAppService)
            var items = await Repository.GetAll()
                .Where(ci => ci.CartId == myCart.Id)
                .Select(ci => new CartItemDto
                {
                    Id = ci.Id,
                    ProductId = ci.ProductId,
                    CartId = ci.CartId,
                    Quantity = ci.Quantity,
                    ProductName = ci.Product.Name,
                    MainImage = ci.Product.MainImage,
                    ProductPrice = ci.Product.Price,
                    StockQuantity = ci.Product.StockQuantity,
                })
                .ToListAsync();

            return items;
        }
    }
}