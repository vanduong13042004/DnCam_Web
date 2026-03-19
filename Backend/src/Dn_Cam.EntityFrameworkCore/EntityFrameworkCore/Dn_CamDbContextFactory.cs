using Dn_Cam.Configuration;
using Dn_Cam.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Dn_Cam.EntityFrameworkCore;

/* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
public class Dn_CamDbContextFactory : IDesignTimeDbContextFactory<Dn_CamDbContext>
{
    public Dn_CamDbContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<Dn_CamDbContext>();

        /*
         You can provide an environmentName parameter to the AppConfigurations.Get method. 
         In this case, AppConfigurations will try to read appsettings.{environmentName}.json.
         Use Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") method or from string[] args to get environment if necessary.
         https://docs.microsoft.com/en-us/ef/core/cli/dbcontext-creation?tabs=dotnet-core-cli#args
         */
        var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

        Dn_CamDbContextConfigurer.Configure(builder, configuration.GetConnectionString(Dn_CamConsts.ConnectionStringName));

        return new Dn_CamDbContext(builder.Options);
    }
}
