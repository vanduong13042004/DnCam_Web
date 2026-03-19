using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Dn_Cam.Controllers
{
    public abstract class Dn_CamControllerBase : AbpController
    {
        protected Dn_CamControllerBase()
        {
            LocalizationSourceName = Dn_CamConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
