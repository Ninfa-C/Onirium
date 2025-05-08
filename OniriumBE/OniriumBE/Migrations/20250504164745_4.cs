using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OniriumBE.Migrations
{
    /// <inheritdoc />
    public partial class _4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Skills_CampaignCharacters_CampaignCharacterId",
                table: "Skills");

            migrationBuilder.DropIndex(
                name: "IX_Skills_CampaignCharacterId",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "CampaignCharacterId",
                table: "Skills");

            migrationBuilder.AlterColumn<string>(
                name: "SubClassName",
                table: "CharacterClasses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "CampaignCharacterSkills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignCharacterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsProficient = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignCharacterSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignCharacterSkills_CampaignCharacters_CampaignCharacterId",
                        column: x => x.CampaignCharacterId,
                        principalTable: "CampaignCharacters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CampaignCharacterSkills_CampaignCharacterId",
                table: "CampaignCharacterSkills",
                column: "CampaignCharacterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CampaignCharacterSkills");

            migrationBuilder.AddColumn<Guid>(
                name: "CampaignCharacterId",
                table: "Skills",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SubClassName",
                table: "CharacterClasses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Skills_CampaignCharacterId",
                table: "Skills",
                column: "CampaignCharacterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Skills_CampaignCharacters_CampaignCharacterId",
                table: "Skills",
                column: "CampaignCharacterId",
                principalTable: "CampaignCharacters",
                principalColumn: "Id");
        }
    }
}
