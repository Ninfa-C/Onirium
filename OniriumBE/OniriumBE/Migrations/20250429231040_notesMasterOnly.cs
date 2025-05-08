using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OniriumBE.Migrations
{
    /// <inheritdoc />
    public partial class notesMasterOnly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MasterNotes",
                table: "Sessions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MasterNotes",
                table: "Quests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MasterNotes",
                table: "Npcs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MasterNotes",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "MasterOnly",
                table: "CampaignNotes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MasterNotes",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "MasterNotes",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "MasterNotes",
                table: "Npcs");

            migrationBuilder.DropColumn(
                name: "MasterNotes",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "MasterOnly",
                table: "CampaignNotes");
        }
    }
}
