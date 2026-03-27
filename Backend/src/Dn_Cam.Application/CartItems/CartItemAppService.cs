using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Dn_Cam.CartItems.DTO;
using Dn_Cam.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.CartItems
{
    public class CartItemAppService : AsyncCrudAppService<CartItem, CartItemDto, int, PagedAndSortedResultRequestDto, CreateCartItemDto, CartItemDto>, ICartItemAppService
    {
        public CartItemAppService(IRepository<CartItem, int> repository) : base(repository)
        {
        }
    }
}
