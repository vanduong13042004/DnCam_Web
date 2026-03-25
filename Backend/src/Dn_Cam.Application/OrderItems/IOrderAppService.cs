using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Dn_Cam.OrderItems.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.OrderItems
{
    public interface IOrderItemAppService : IAsyncCrudAppService<OrderItemDto, int, PagedAndSortedResultRequestDto, CreateOrderItemDto, OrderItemDto>
    {
    }
}
