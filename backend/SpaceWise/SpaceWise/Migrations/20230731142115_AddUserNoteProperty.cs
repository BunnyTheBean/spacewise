using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpaceWise.Migrations
{
    /// <inheritdoc />
    public partial class AddUserNoteProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Users");
        }
    }
}
