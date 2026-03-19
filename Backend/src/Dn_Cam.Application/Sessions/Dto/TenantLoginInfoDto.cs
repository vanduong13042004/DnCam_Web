using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Dn_Cam.MultiTenancy;

namespace Dn_Cam.Sessions.Dto;

[AutoMapFrom(typeof(Tenant))]
public class TenantLoginInfoDto : EntityDto
{
    public string TenancyName { get; set; }

    public string Name { get; set; }
}
