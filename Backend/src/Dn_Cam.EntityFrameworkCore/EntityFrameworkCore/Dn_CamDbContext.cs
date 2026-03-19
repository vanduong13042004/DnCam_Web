using Abp.Zero.EntityFrameworkCore;
using Dn_Cam.Authorization.Roles;
using Dn_Cam.Authorization.Users;
using Dn_Cam.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace Dn_Cam.EntityFrameworkCore;

public class Dn_CamDbContext : AbpZeroDbContext<Tenant, Role, User, Dn_CamDbContext>
{
    /* Define a DbSet for each entity of the application */

    public Dn_CamDbContext(DbContextOptions<Dn_CamDbContext> options)
        : base(options)
    {
    }
}
