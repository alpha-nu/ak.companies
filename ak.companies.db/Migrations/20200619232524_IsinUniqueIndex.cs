using Microsoft.EntityFrameworkCore.Migrations;

namespace ak.companies.db.Migrations
{
    public partial class IsinUniqueIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
               name: "IX_UNIQUE_ISIN",
               table: "Companies",
               column: "Isin",
               unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                 name: "IX_UNIQUE_ISIN",
                 table: "Companies");
        }
    }
}
