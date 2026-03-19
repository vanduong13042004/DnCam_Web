using Abp.Authorization;
using Abp.Runtime.Session;
using Dn_Cam.Configuration.Dto;
using System.Threading.Tasks;

namespace Dn_Cam.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : Dn_CamAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}
