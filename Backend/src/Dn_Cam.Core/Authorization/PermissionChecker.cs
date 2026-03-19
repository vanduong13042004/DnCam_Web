using Abp.Authorization;
using Dn_Cam.Authorization.Roles;
using Dn_Cam.Authorization.Users;

namespace Dn_Cam.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
