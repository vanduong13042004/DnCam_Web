using Abp.Modules;
using Abp.Reflection.Extensions;
using Dn_Cam.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Dn_Cam.Web.Host.Startup
{
    [DependsOn(
       typeof(Dn_CamWebCoreModule))]
    public class Dn_CamWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public Dn_CamWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(Dn_CamWebHostModule).GetAssembly());
        }
    }
}
