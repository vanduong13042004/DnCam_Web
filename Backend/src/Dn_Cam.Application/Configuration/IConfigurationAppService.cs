using Dn_Cam.Configuration.Dto;
using System.Threading.Tasks;

namespace Dn_Cam.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
