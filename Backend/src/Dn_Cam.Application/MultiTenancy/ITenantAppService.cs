using Abp.Application.Services;
using Dn_Cam.MultiTenancy.Dto;

namespace Dn_Cam.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}

