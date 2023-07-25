using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpaceWise.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDeletes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogposts_Users_UserId",
                table: "Blogposts");

            migrationBuilder.DropForeignKey(
                name: "FK_BlogpostSection_Blogposts_BlogpostId",
                table: "BlogpostSection");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BlogpostSection",
                table: "BlogpostSection");

            migrationBuilder.RenameTable(
                name: "BlogpostSection",
                newName: "BlogpostSections");

            migrationBuilder.RenameIndex(
                name: "IX_BlogpostSection_BlogpostId",
                table: "BlogpostSections",
                newName: "IX_BlogpostSections_BlogpostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BlogpostSections",
                table: "BlogpostSections",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogposts_Users_UserId",
                table: "Blogposts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BlogpostSections_Blogposts_BlogpostId",
                table: "BlogpostSections",
                column: "BlogpostId",
                principalTable: "Blogposts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogposts_Users_UserId",
                table: "Blogposts");

            migrationBuilder.DropForeignKey(
                name: "FK_BlogpostSections_Blogposts_BlogpostId",
                table: "BlogpostSections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BlogpostSections",
                table: "BlogpostSections");

            migrationBuilder.RenameTable(
                name: "BlogpostSections",
                newName: "BlogpostSection");

            migrationBuilder.RenameIndex(
                name: "IX_BlogpostSections_BlogpostId",
                table: "BlogpostSection",
                newName: "IX_BlogpostSection_BlogpostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BlogpostSection",
                table: "BlogpostSection",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogposts_Users_UserId",
                table: "Blogposts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BlogpostSection_Blogposts_BlogpostId",
                table: "BlogpostSection",
                column: "BlogpostId",
                principalTable: "Blogposts",
                principalColumn: "Id");
        }
    }
}
