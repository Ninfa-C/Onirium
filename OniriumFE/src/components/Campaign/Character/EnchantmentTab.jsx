import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../Generic/Cards";
import { TabsContent } from "../../Generic/Tabs";
import { useEffect, useState } from "react";
import {
  getCharacterAssign,
  getSpellsUpdate,
} from "../../../redux/slices/characterDetailsSlice";
import { LineDecoration } from "../../../assets/decoration";
import { Button } from "../../Generic/ButtonCustom";
import { Book, Plus, Trash3 } from "react-bootstrap-icons";
import UpdateModal from "./UpdateModal";
import { deleSpellFromChar, updateItemOrSpell } from "../../../api/CampaignApi";

const EnchantmentTab = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const { characterAssign } = useSelector((state) => state.characterDetails);
  const spellUpdated = characterAssign?.isSpellUpdated;

  useEffect(() => {
    if (characterAssign && !spellUpdated) {
      dispatch(getSpellsUpdate(characterAssign));
    }
  }, [dispatch, characterAssign, spellUpdated]);

  const spellcastingAbilities = {
    Artefice: "Intelligenza",
    Bardo: "Carisma",
    Chierico: "Saggezza",
    Druido: "Saggezza",
    Mago: "Intelligenza",
    Paladino: "Carisma",
    Ranger: "Saggezza",
    Stregone: "Carisma",
    Warlock: "Carisma",
  };

  const mainClass = characterAssign?.character.classes[0]?.className;
  const spellcastingAbility = spellcastingAbilities[mainClass] || "Nessuna";

  const proficiencyBonus = characterAssign?.character?.proficiencyBonus;
  const statMod = Math.floor(
    (characterAssign?.character?.stats?.find(
      (stat) => stat.name === spellcastingAbility
    ).value -
      10) /
      2
  );

  const saveDC = 8 + proficiencyBonus + statMod;
  const attackBonus = proficiencyBonus + statMod;
  const cantrips = characterAssign?.character?.spells?.filter(
    (spell) => spell.spell?.level === "Trucchetto"
  );

  const spellsByLevel = characterAssign?.character?.spells
    .filter((spell) => spell.spell?.level !== "Trucchetto")
    .reduce((acc, spell) => {
      const level = spell.spell?.level;
      if (!acc[level]) acc[level] = [];
      acc[level].push(spell);
      return acc;
    }, {});

  const handleRemove = async (item) => {
    try {
      await deleSpellFromChar(characterAssign.character.id, item.spellId);
      dispatch(getCharacterAssign(characterAssign.id));
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  const handlePrepared = async (item) => {
    const request = { ItemId: item.spellId, IsEquiped: !item.isPrepared };
    try {
      await updateItemOrSpell(characterAssign.character.id, request);
      dispatch(getCharacterAssign(characterAssign.id));
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  return (
    <TabsContent value="spells" className="p-6">
      <div className="flex items-center">
        <LineDecoration className="flex-grow h-1 mr-5 scale-x-[-1] " />
        <h4 className="text font-serif text-gold whitespace-nowrap uppercase text-xl">
          libro degli incantesimi
        </h4>
        <LineDecoration className="flex-grow h-1 ml-5 " />
      </div>

      <Card className="border-none text-white">
        <CardContent className="space-y-6">
          {/* Statistiche di Lancio */}
          <div>
            <div className="flex justify-between mb-3 items-center">
              <h3 className="text-gold font-medium">Statistiche di Lancio</h3>
              <Button
                className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
                onClick={() => {
                  setModalOpen(true), setCategory("spell");
                }}
              >
                Gestisci incantesimi
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gold/5 p-4 rounded-md border border-gold/10">
              <div>
                <h4 className="text-sm font-medium mb-1">
                  Caratteristica da Incantatore
                </h4>
                <p className="text-gray-400">{spellcastingAbility}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">CD Tiro Salvezza</h4>
                <p className="text-gray-400">{saveDC}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Bonus di Attacco</h4>
                <p className="text-gray-400">
                  {attackBonus >= 0 ? "+" : ""}
                  {attackBonus}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Fonte</h4>
                <p className="text-gray-400">
                  {characterAssign.character.classes[0].className}
                </p>
              </div>
            </div>
          </div>

          {/* Trucchetti */}
          {cantrips.length > 0 && (
            <div>
              <h3 className="text-gold font-medium mb-2">Trucchetti</h3>
              <div className="space-y-3">
                {cantrips.map((spell, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gold/5 rounded-md border border-gold/10"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gold">
                        {spell.spell.name}
                      </h4>
                      <div className="flex gap-2">
                        <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                          Trucchetto
                        </span>
                        {spell.isPrepared ? (
                          <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                            Preparato
                          </span>
                        ) : (
                          <span className="text-xs bg-black/40 text-gray-400 px-2 py-1 rounded">
                            Non preparato
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                      <div>
                        <span className="text-gray-400">Tempo:</span>{" "}
                        <span className="text-white">{spell.spell.cost}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Gittata:</span>{" "}
                        <span className="text-white">{spell.spell.range}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Durata:</span>{" "}
                        <span className="text-white">
                          {spell.spell.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-300 mt-2">
                        {spell?.spell?.description}
                      </p>
                      <div className="flex">
                        <Button onClick={() => handleRemove(spell)}>
                          <Trash3 />
                        </Button>
                        {
                          <Button>
                            <Book onClick={() => handlePrepared(spell)}/>
                          </Button>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incantesimi per livello */}
          {Object.entries(spellsByLevel).map(([level, spells]) => (
            <div key={level}>
              <h3 className="text-gold font-medium mb-2">
                Incantesimi di {level}° Livello
              </h3>
              <div className="space-y-3">
                {spells.map((spell, i) => (
                  <div
                    key={i}
                    className="p-3 bg-gold/5 rounded-md border border-gold/10"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gold">
                        {spell.spell?.name}
                      </h4>
                      <div className="flex gap-2">
                        <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                          {level}° Livello
                        </span>
                        {spell.isPrepared ? (
                          <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                            Preparato
                          </span>
                        ) : (
                          <span className="text-xs bg-black/40 text-gray-400 px-2 py-1 rounded">
                            Non preparato
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                      <div>
                        <span className="text-gray-400">Tempo:</span>{" "}
                        <span className="text-white">{spell.spell?.cost}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Gittata:</span>{" "}
                        <span className="text-white">{spell.spell?.range}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Durata:</span>{" "}
                        <span className="text-white">
                          {spell.spell?.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-300 mt-2">
                        {spell?.spell?.description}
                      </p>
                      <div className="flex">
                        <Button onClick={() => handleRemove(spell)}>
                          <Trash3 />
                        </Button>
                        {
                          <Button>
                            <Book onClick={() => handlePrepared(spell)}/>
                          </Button>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <UpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        character={characterAssign}
        category={category}
      />
    </TabsContent>
  );
};

export default EnchantmentTab;
