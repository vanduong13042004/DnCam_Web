using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Dn_Cam.Carts.DTO;
using Dn_Cam.Entities;
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
    }
}