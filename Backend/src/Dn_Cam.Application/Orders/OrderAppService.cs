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

            if (input.Items == null || !input.Items.Any())
            {
                throw new UserFriendlyException("Đơn hàng không có sản phẩm nào!");
            }

            var order = ObjectMapper.Map<Order>(input);
            order.UserId = currentUserId;
            order.Status = 0; // 0: Chờ xác nhận
            order.ItemsTotal = 0; 
            order.ShippingFee = 30000; 
            order.TotalAmount = 0; 

            var orderId = await Repository.InsertAndGetIdAsync(order);

            decimal calculatedItemsTotal = 0;

            foreach (var itemDto in input.Items)
            {
                // Lấy sản phẩm thật từ Database để lấy giá gốc 
                var product = await _productRepository.GetAsync(itemDto.ProductId);

                var orderItem = new OrderItem
                {
                    OrderId = orderId, // Gắn vào hóa đơn vừa tạo ở trên
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity,
                    UnitPrice = product.Price // Dùng giá của Database, TUYỆT ĐỐI không dùng giá từ Frontend gửi lên
                };

                calculatedItemsTotal += (orderItem.UnitPrice * orderItem.Quantity);

                // Lưu món hàng con xuống DB
                await _orderItemRepository.InsertAsync(orderItem);

                // Tìm xem món hàng này trong giỏ của khách là thằng nào, rồi xóa nó đi (Vì đã mua rồi)
                var cartItemToDelete = await _cartItemRepository.FirstOrDefaultAsync(ci => ci.ProductId == itemDto.ProductId && ci.Cart.UserId == currentUserId);
                if (cartItemToDelete != null)
                {
                    await _cartItemRepository.DeleteAsync(cartItemToDelete);
                }
            }

            order.ItemsTotal = calculatedItemsTotal;
            order.TotalAmount = calculatedItemsTotal + order.ShippingFee;

            await CurrentUnitOfWork.SaveChangesAsync();

            // Trả về kết quả cho React
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

