using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Dn_Cam.Orders.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService <OrderDto, int, PagedAndSortedResultRequestDto, CreateOrderDto, OrderDto>
    {
        Task<List<OrderDto>> GetMyOrdersAsync();
    }
}
