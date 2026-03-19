using Abp.MultiTenancy;
using Dn_Cam.Editions;
using Dn_Cam.MultiTenancy;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Dn_Cam.EntityFrameworkCore.Seed.Tenants;

public class DefaultTenantBuilder
{
    private readonly Dn_CamDbContext _context;

    public DefaultTenantBuilder(Dn_CamDbContext context)
    {
        _context = context;
    }

    public void Create()
    {
        CreateDefaultTenant();
    }

    private void CreateDefaultTenant()
    {
        // Default tenant

        var defaultTenant = _context.Tenants.IgnoreQueryFilters().FirstOrDefault(t => t.TenancyName == AbpTenantBase.DefaultTenantName);
        if (defaultTenant == null)
        {
            defaultTenant = new Tenant(AbpTenantBase.DefaultTenantName, AbpTenantBase.DefaultTenantName);

            var defaultEdition = _context.Editions.IgnoreQueryFilters().FirstOrDefault(e => e.Name == EditionManager.DefaultEditionName);
            if (defaultEdition != null)
            {
                defaultTenant.EditionId = defaultEdition.Id;
            }

            _context.Tenants.Add(defaultTenant);
            _context.SaveChanges();
        }
    }
}
