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

    }
}