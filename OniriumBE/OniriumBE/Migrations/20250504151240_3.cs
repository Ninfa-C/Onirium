using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OniriumBE.Migrations
{
    /// <inheritdoc />
    public partial class _3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CharacterClasses_Classes_ClassId",
                table: "CharacterClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_CharacterClasses_Subclasses_SubclassId",
                table: "CharacterClasses");

            migrationBuilder.DropIndex(
                name: "IX_CharacterClasses_ClassId",
                table: "CharacterClasses");

            migrationBuilder.DropIndex(
                name: "IX_CharacterClasses_SubclassId",
                table: "CharacterClasses");

            migrationBuilder.DropColumn(
                name: "ClassId",
                table: "CharacterClasses");

            migrationBuilder.DropColumn(
                name: "SubclassId",
                table: "CharacterClasses");

            migrationBuilder.AddColumn<string>(
                name: "ClassName",
                table: "CharacterClasses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SubClassName",
                table: "CharacterClasses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CurrentLifePoints",
                table: "CampaignCharacters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "CampaignCharacters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProficiencyBonus",
                table: "CampaignCharacters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TemporaryLifePoints",
                table: "CampaignCharacters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalLifePoints",
                table: "CampaignCharacters",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassName",
                table: "CharacterClasses");

            migrationBuilder.DropColumn(
                name: "SubClassName",
                table: "CharacterClasses");

            migrationBuilder.DropColumn(
                name: "CurrentLifePoints",
                table: "CampaignCharacters");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "CampaignCharacters");

            migrationBuilder.DropColumn(
                name: "ProficiencyBonus",
                table: "CampaignCharacters");

            migrationBuilder.DropColumn(
                name: "TemporaryLifePoints",
                table: "CampaignCharacters");

            migrationBuilder.DropColumn(
                name: "TotalLifePoints",
                table: "CampaignCharacters");

            migrationBuilder.AddColumn<Guid>(
                name: "ClassId",
                table: "CharacterClasses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SubclassId",
                table: "CharacterClasses",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CharacterClasses_ClassId",
                table: "CharacterClasses",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterClasses_SubclassId",
                table: "CharacterClasses",
                column: "SubclassId");

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterClasses_Classes_ClassId",
                table: "CharacterClasses",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterClasses_Subclasses_SubclassId",
                table: "CharacterClasses",
                column: "SubclassId",
                principalTable: "Subclasses",
                principalColumn: "Id");
        }
    }
}
