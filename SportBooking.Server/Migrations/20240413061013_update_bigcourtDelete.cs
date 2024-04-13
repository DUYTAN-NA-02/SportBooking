using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportBooking.Server.Migrations
{
    /// <inheritdoc />
    public partial class update_bigcourtDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courts_bigCourts_BigCourtId",
                table: "Courts");

            migrationBuilder.AddForeignKey(
                name: "FK_Courts_bigCourts_BigCourtId",
                table: "Courts",
                column: "BigCourtId",
                principalTable: "bigCourts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courts_bigCourts_BigCourtId",
                table: "Courts");

            migrationBuilder.AddForeignKey(
                name: "FK_Courts_bigCourts_BigCourtId",
                table: "Courts",
                column: "BigCourtId",
                principalTable: "bigCourts",
                principalColumn: "Id");
        }
    }
}
