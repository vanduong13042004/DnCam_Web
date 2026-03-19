using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Dn_Cam.Configuration;
using Dn_Cam.EntityFrameworkCore;
using Dn_Cam.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace Dn_Cam.Migrator;

[DependsOn(typeof(Dn_CamEntityFrameworkModule))]
public class Dn_CamMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public Dn_CamMigratorModule(Dn_CamEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(Dn_CamMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            Dn_CamConsts.ConnectionStringName
        );

        Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        Configuration.ReplaceService(
            typeof(IEventBus),
            () => IocManager.IocContainer.Register(
                Component.For<IEventBus>().Instance(NullEventBus.Instance)
            )
        );
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(Dn_CamMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}
