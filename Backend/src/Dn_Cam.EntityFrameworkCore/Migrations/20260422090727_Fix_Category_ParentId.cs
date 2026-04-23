using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dn_Cam.Migrations
{
    /// <inheritdoc />
    public partial class Fix_Category_ParentId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ParenId",
                table: "Categories",
                newName: "ParentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "Categories",
                newName: "ParenId");
        }
    }
}
