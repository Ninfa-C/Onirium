using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OniriumBE.Migrations
{
    /// <inheritdoc />
    public partial class _1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CharacterPlayerAssignments_Characters_CharacterId",
                table: "CharacterPlayerAssignments");

            migrationBuilder.AddColumn<Guid>(
                name: "CampaignCharacterId",
                table: "Skills",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CampaignCharacters",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BackgroundName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RaceName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubraceName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignCharacters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CampaignCharacterStats",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignCharacterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignCharacterStats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignCharacterStats_CampaignCharacters_CampaignCharacterId",
                        column: x => x.CampaignCharacterId,
                        principalTable: "CampaignCharacters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CampaignCharItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignCharacterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    IsEquiped = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignCharItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignCharItems_CampaignCharacters_CampaignCharacterId",
                        column: x => x.CampaignCharacterId,
                        principalTable: "CampaignCharacters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CampaignCharItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CampaignCharSpells",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignCharacterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpellId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsPrepared = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignCharSpells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignCharSpells_CampaignCharacters_CampaignCharacterId",
                        column: x => x.CampaignCharacterId,
                        principalTable: "CampaignCharacters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CampaignCharSpells_Spells_SpellId",
                        column: x => x.SpellId,
                        principalTable: "Spells",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CampaignCharTraits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CampaignCharacterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignCharTraits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignCharTraits_CampaignCharacters_CampaignCharacterId",
                        column: x => x.CampaignCharacterId,
                        principalTable: "CampaignCharacters",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CharacterClasses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignCharacterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClassId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LevelInClass = table.Column<int>(type: "int", nullable: false),
                    SubclassId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterClasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CharacterClasses_CampaignCharacters_CampaignCharacterId",
                        column: x => x.CampaignCharacterId,
                        principalTable: "CampaignCharacters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterClasses_Classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterClasses_Subclasses_SubclassId",
                        column: x => x.SubclassId,
                        principalTable: "Subclasses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Skills_CampaignCharacterId",
                table: "Skills",
                column: "CampaignCharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignCharacterStats_CampaignCharacterId",
                table: "CampaignCharacterStats",
                column: "CampaignCharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignCharItems_CampaignCharacterId",
                table: "CampaignCharItems",
                column: "CampaignCharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignCharItems_ItemId",
                table: "CampaignCharItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignCharSpells_CampaignCharacterId",
                table: "CampaignCharSpells",
                column: "CampaignCharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignCharSpells_SpellId",
                table: "CampaignCharSpells",
                column: "SpellId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignCharTraits_CampaignCharacterId",
                table: "CampaignCharTraits",
                column: "CampaignCharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterClasses_CampaignCharacterId",
                table: "CharacterClasses",
                column: "CampaignCharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterClasses_ClassId",
                table: "CharacterClasses",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterClasses_SubclassId",
                table: "CharacterClasses",
                column: "SubclassId");

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterPlayerAssignments_CampaignCharacters_CharacterId",
                table: "CharacterPlayerAssignments",
                column: "CharacterId",
                principalTable: "CampaignCharacters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Skills_CampaignCharacters_CampaignCharacterId",
                table: "Skills",
                column: "CampaignCharacterId",
                principalTable: "CampaignCharacters",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CharacterPlayerAssignments_CampaignCharacters_CharacterId",
                table: "CharacterPlayerAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_Skills_CampaignCharacters_CampaignCharacterId",
                table: "Skills");

            migrationBuilder.DropTable(
                name: "CampaignCharacterStats");

            migrationBuilder.DropTable(
                name: "CampaignCharItems");

            migrationBuilder.DropTable(
                name: "CampaignCharSpells");

            migrationBuilder.DropTable(
                name: "CampaignCharTraits");

            migrationBuilder.DropTable(
                name: "CharacterClasses");

            migrationBuilder.DropTable(
                name: "CampaignCharacters");

            migrationBuilder.DropIndex(
                name: "IX_Skills_CampaignCharacterId",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "CampaignCharacterId",
                table: "Skills");

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterPlayerAssignments_Characters_CharacterId",
                table: "CharacterPlayerAssignments",
                column: "CharacterId",
                principalTable: "Characters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
