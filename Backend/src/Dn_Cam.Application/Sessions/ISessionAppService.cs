using Abp.Application.Services;
using Dn_Cam.Sessions.Dto;
using System.Threading.Tasks;

namespace Dn_Cam.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
