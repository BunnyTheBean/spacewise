using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpaceWise.Migrations
{
    /// <inheritdoc />
    public partial class AddBlogpost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogposts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Category = table.Column<int>(type: "INTEGER", nullable: true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogposts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Blogposts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BlogpostSection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    BlogpostId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogpostSection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogpostSection_Blogposts_BlogpostId",
                        column: x => x.BlogpostId,
                        principalTable: "Blogposts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Blogposts_UserId",
                table: "Blogposts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BlogpostSection_BlogpostId",
                table: "BlogpostSection",
                column: "BlogpostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogpostSection");

            migrationBuilder.DropTable(
                name: "Blogposts");
        }
    }
}
