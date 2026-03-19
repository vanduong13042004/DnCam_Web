using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Dn_Cam.EntityFrameworkCore;

public static class Dn_CamDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<Dn_CamDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<Dn_CamDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
