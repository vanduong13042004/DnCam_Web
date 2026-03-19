using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Dn_Cam.EntityFrameworkCore;
using Dn_Cam.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Dn_Cam.Web.Tests;

[DependsOn(
    typeof(Dn_CamWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class Dn_CamWebTestModule : AbpModule
{
    public Dn_CamWebTestModule(Dn_CamEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(Dn_CamWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(Dn_CamWebMvcModule).Assembly);
    }
}