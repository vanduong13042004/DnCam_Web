using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Dn_Cam.Entities;
using Dn_Cam.OrderItems.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.OrderItems
{
    public class OrderItemAppService : AsyncCrudAppService<OrderItem, OrderItemDto, int, PagedAndSortedResultRequestDto, CreateOrderItemDto, OrderItemDto>, IOrderItemAppService
    {
        public OrderItemAppService(IRepository<OrderItem, int> repository) : base(repository)
        {
        }
    }
}
