using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Organizations;
using Abp.Runtime.Caching;
using Abp.Zero.Configuration;
using Dn_Cam.Authorization.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace Dn_Cam.Authorization.Roles;

public class RoleManager : AbpRoleManager<Role, User>
{
    public RoleManager(
        RoleStore store,
        IEnumerable<IRoleValidator<Role>> roleValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        ILogger<AbpRoleManager<Role, User>> logger,
        IPermissionManager permissionManager,
        ICacheManager cacheManager,
        IUnitOfWorkManager unitOfWorkManager,
        IRoleManagementConfig roleManagementConfig,
        IRepository<OrganizationUnit, long> organizationUnitRepository,
        IRepository<OrganizationUnitRole, long> organizationUnitRoleRepository)
        : base(
              store,
              roleValidators,
              keyNormalizer,
              errors, logger,
              permissionManager,
              cacheManager,
              unitOfWorkManager,
              roleManagementConfig,
            organizationUnitRepository,
            organizationUnitRoleRepository)
    {
    }
}
