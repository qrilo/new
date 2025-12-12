using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Api.Migrations
{
    public partial class RemoveUniqueIndexOnUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP INDEX IF EXISTS IX_Banks_UserId;");

            migrationBuilder.CreateIndex(
                name: "IX_Banks_UserId",
                table: "Banks",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Banks_UserId",
                table: "Banks");

            migrationBuilder.CreateIndex(
                name: "IX_Banks_UserId",
                table: "Banks",
                column: "UserId",
                unique: true);
        }
    }
}