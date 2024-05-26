using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SportBooking.Server.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f3d817a-5ac9-43fe-b2ff-9bbdc9781845");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8f309c4-1827-4e1b-a961-062e15b8508f");

            migrationBuilder.AddColumn<string>(
                name: "numberManager",
                table: "Courts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "697bcc8f-095d-4667-9031-8ed4409a0c32", null, "Admin", "ADMIN" },
                    { "e4aed12e-4659-40ac-a9c4-1ec8691e1de0", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "697bcc8f-095d-4667-9031-8ed4409a0c32");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4aed12e-4659-40ac-a9c4-1ec8691e1de0");

            migrationBuilder.DropColumn(
                name: "numberManager",
                table: "Courts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8f3d817a-5ac9-43fe-b2ff-9bbdc9781845", null, "Admin", "ADMIN" },
                    { "c8f309c4-1827-4e1b-a961-062e15b8508f", null, "User", "USER" }
                });
        }
    }
}
