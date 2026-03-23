using Abp.Zero.EntityFrameworkCore;
using Dn_Cam.Authorization.Roles;
using Dn_Cam.Authorization.Users;
using Dn_Cam.Entities;
using Dn_Cam.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace Dn_Cam.EntityFrameworkCore;

public class Dn_CamDbContext : AbpZeroDbContext<Tenant, Role, User, Dn_CamDbContext>
{
    public DbSet<Category> Categories { get; set; }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductSpecification> ProductsSpecifications { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public Dn_CamDbContext(DbContextOptions<Dn_CamDbContext> options)
        : base(options)
    {
    }
}
