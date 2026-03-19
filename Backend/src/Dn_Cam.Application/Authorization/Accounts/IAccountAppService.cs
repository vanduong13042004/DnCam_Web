using Abp.Application.Services;
using Dn_Cam.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace Dn_Cam.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
