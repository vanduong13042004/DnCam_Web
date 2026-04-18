using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Dn_Cam.Carts.DTO;
using Dn_Cam.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Dn_Cam.Carts
{
    public class CartAppService : ApplicationService, ICartAppService
    {
        private readonly IRepository<Cart, int> _cartRepository;
        private readonly IRepository<CartItem, int> _cartItemRepository;
        public CartAppService(
            IRepository<Cart, int> cartRepository,
            IRepository<CartItem, int> cartItemRepository)
        {
            _cartRepository = cartRepository;
            _cartItemRepository = cartItemRepository;
        }
        public async Task AddToCartAsync(AddToCartDto input)
        {
            if (!AbpSession.UserId.HasValue)
            {
                throw new UserFriendlyException("Bạn phải đăng nhập mới được thêm vào giỏ hàng nhé!");
            }
            int currentUserId = (int)AbpSession.UserId.Value;

            var myCart = await _cartRepository.FirstOrDefaultAsync(c => c.UserId == currentUserId);

            if (myCart == null)
            {
                myCart = new Cart
                {
                    UserId = currentUserId
                };

                myCart.Id = await _cartRepository.InsertAndGetIdAsync(myCart);
            }

            var existingItem = await _cartItemRepository.FirstOrDefaultAsync(
                item => item.CartId == myCart.Id && item.ProductId == input.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += input.Quantity;
                await _cartItemRepository.UpdateAsync(existingItem);
            }
            else
            {
                var newItem = new CartItem
                {
                    CartId = myCart.Id,
                    ProductId = input.ProductId,
                    Quantity = input.Quantity
                };
                await _cartItemRepository.InsertAsync(newItem);
            }
        }
        public async Task<CartDetailDto> GetMyCartAsync()
        {
            if (!AbpSession.UserId.HasValue)
            {
                throw new UserFriendlyException("Bạn phải đăng nhập mới được xem giỏ hàng nhé!");
            }
            int currentUserId = (int)AbpSession.UserId.Value;
            var myCart = await _cartRepository.FirstOrDefaultAsync(c => c.UserId == currentUserId);
            if (myCart == null)
            {
                return new CartDetailDto
                {
                    Id = 0,
                    TotalAmount = 0,
                    Items = new System.Collections.Generic.List<CartItemDetailDto>()
                };
            }
            // 3. Lấy danh sách các món hàng (CartItems) và ánh xạ (Select) sang DTO
            var items = await _cartItemRepository.GetAll()
                .Where(ci => ci.CartId == myCart.Id)
                .Select(ci => new CartItemDetailDto
                {
                    Id = ci.Id,
                    CartId = ci.CartId,
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    // Dùng Navigation Property (ci.Product) để lấy dữ liệu bảng Product mà không cần viết Join phức tạp
                    ProductName = ci.Product.Name,
                    ProductPrice = ci.Product.Price,
                    MainImage = ci.Product.MainImage,
                    StockQuantity = ci.Product.StockQuantity
                }).ToListAsync();

            // 4. Tính tổng tiền của cả giỏ hàng (bằng LINQ Sum)
            decimal itemsTotal = items.Sum(i => i.Quantity * i.ProductPrice);
            decimal ShippingFee = 30000;
            if (itemsTotal > 5000000)
            {
                ShippingFee = 0;
            }
            decimal finalTotal = itemsTotal + ShippingFee;
            // 5. Đóng gói tất cả vào CartDetailDto (Master) và trả về
            return new CartDetailDto
            {
                Id = myCart.Id,
                ItemsTotal = itemsTotal,
                TotalAmount = finalTotal,
                ShippingFee = ShippingFee,
                Items = items
            };
        }
    }
}