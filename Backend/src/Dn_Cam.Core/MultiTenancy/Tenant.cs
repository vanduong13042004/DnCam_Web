using Abp.MultiTenancy;
using Dn_Cam.Authorization.Users;

namespace Dn_Cam.MultiTenancy;

public class Tenant : AbpTenant<User>
{
    public Tenant()
    {
    }

    public Tenant(string tenancyName, string name)
        : base(tenancyName, name)
    {
    }
}
