using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Dn_Cam.Entities;
using Dn_Cam.Orders.DTO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dn_Cam.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedAndSortedResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<OrderItem, int> _orderItemRepository;
        private readonly IRepository<Product, int> _productRepository;
        private readonly IRepository<Cart, int> _cartRepository;
        private readonly IRepository<CartItem, int> _cartItemRepository;
        public OrderAppService(
            IRepository<Order, int> repository,
            IRepository<OrderItem, int> orderItemRepository,
            IRepository<Product, int> productRepository,
            IRepository<Cart, int> cartRepository,
            IRepository<CartItem, int> cartItemRepository) : base(repository)
        {
            _orderItemRepository = orderItemRepository;
            _productRepository = productRepository;
            _cartRepository = cartRepository;
            _cartItemRepository = cartItemRepository;
        }
        public override async Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            if (!AbpSession.UserId.HasValue)
            {
                throw new UserFriendlyException("Bạn phải đăng nhập để đặt hàng!");
            }
            int currentUserId = (int)AbpSession.UserId.Value;
            var myCart = await _cartRepository.FirstOrDefaultAsync(c => c.UserId == currentUserId);
            if (myCart == null)
            {
                throw new UserFriendlyException("Giỏ hàng của bạn đang trống, không thể đặt hàng!");
            }
            var cartItems = await _cartItemRepository.GetAllListAsync(ci => ci.CartId == myCart.Id);
            if (!cartItems.Any())
            {
                throw new UserFriendlyException("Không có sản phẩm nào trong giỏ để thanh toán!");
            }
            var order = ObjectMapper.Map<Order>(input);
            order.UserId = currentUserId;
            order.Status = 0; 
            order.TotalAmount = 0;
            var orderId = await Repository.InsertAndGetIdAsync(order);
            decimal totalMoney = 0;
            foreach (var item in cartItems)
            {
                var product = await _productRepository.GetAsync(item.ProductId);
                var orderItem = new OrderItem
                {
                    OrderId = orderId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price 
                };
                totalMoney += (orderItem.UnitPrice * orderItem.Quantity);
                await _orderItemRepository.InsertAsync(orderItem);
                await _cartItemRepository.DeleteAsync(item.Id);
            }
            order.TotalAmount = totalMoney;
            await CurrentUnitOfWork.SaveChangesAsync(); 
            return ObjectMapper.Map<OrderDto>(order);
        }
        public async Task<List<OrderDto>> GetMyOrdersAsync()
        {
            if (!AbpSession.UserId.HasValue)
            {
                throw new UserFriendlyException("Bạn phải đăng nhập để xem lịch sử mua hàng!");
            }
            int currentUserId = (int)AbpSession.UserId.Value;
           
            var myOrders = await Repository.GetAll()
                                           .Where(o => o.UserId == currentUserId)
                                           .OrderByDescending(o => o.Id)
                                           .ToListAsync();
            return ObjectMapper.Map<List<OrderDto>>(myOrders);
        }
    }
}