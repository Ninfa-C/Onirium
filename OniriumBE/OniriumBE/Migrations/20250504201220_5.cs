using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OniriumBE.Migrations
{
    /// <inheritdoc />
    public partial class _5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CharacterClassId",
                table: "Proficiencies",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proficiencies_CharacterClassId",
                table: "Proficiencies",
                column: "CharacterClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_Proficiencies_CharacterClasses_CharacterClassId",
                table: "Proficiencies",
                column: "CharacterClassId",
                principalTable: "CharacterClasses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proficiencies_CharacterClasses_CharacterClassId",
                table: "Proficiencies");

            migrationBuilder.DropIndex(
                name: "IX_Proficiencies_CharacterClassId",
                table: "Proficiencies");

            migrationBuilder.DropColumn(
                name: "CharacterClassId",
                table: "Proficiencies");
        }
    }
}
