using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Dn_Cam.Authorization;

namespace Dn_Cam;

[DependsOn(
    typeof(Dn_CamCoreModule),
    typeof(AbpAutoMapperModule))]
public class Dn_CamApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<Dn_CamAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(Dn_CamApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}
