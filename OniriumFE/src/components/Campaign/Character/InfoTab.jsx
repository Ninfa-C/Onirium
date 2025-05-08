import { useState } from "react";
import {
  LineDecoration,
  RectangleDecor,
  SquareDecor,
} from "../../../assets/decoration";
import { CardContent } from "../../Generic/Cards";
import { TabsContent } from "../../Generic/Tabs";
import { InputForm } from "../../Generic/Form";
import { Button } from "../../Generic/ButtonCustom";
import { updateLifeChar } from "../../../api/CampaignApi";
import { useDispatch, useSelector } from "react-redux";
import { getCharacterAssign } from "../../../redux/slices/characterDetailsSlice";

const InfoTab = ({ character }) => {
  const characterAssign = useSelector(
    (state) => state.characterDetails.characterAssign
  );
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    total: character?.totalLifePoints,
    current: character?.currentLifePoints,
    temporary: character?.temporaryLifePoints,
  });
  const [editing, setEditing] = useState(false);

  const equippedArmor = character?.inventory[0]?.items?.find(
    (item) => item.isEquiped && item.category === "Armatura"
  );
  const dexterityStat = character?.stats?.find(
    (stat) => stat.name.toLowerCase() === "destrezza"
  );
  const dexModifier = dexterityStat
    ? Math.floor((dexterityStat.value - 10) / 2)
    : 0;

  let armorClass = 10;

  if (equippedArmor) {
    switch (equippedArmor.armorType?.toLowerCase()) {
      case "leggera":
        armorClass = equippedArmor.armorClass + dexModifier;
        break;
      case "media":
        armorClass = equippedArmor.armorClass + Math.min(dexModifier, 2);
        break;
      case "pesante":
        armorClass = equippedArmor.armorClass;
        break;
      default:
        armorClass = equippedArmor.armorClass + dexModifier;
        break;
    }
  } else {
    armorClass += dexModifier;
  }

  const classSavingThows = character?.classes[0]?.classProficiencies?.find(
    (p) => p.type.toLowerCase() === "tirisalvezza"
  );
  const proficientStats = classSavingThows
    ? classSavingThows.description.split(",").map((s) => s.trim())
    : [];

  const savingThrowsDisplay = character?.stats?.map((stat) => {
    const baseMod = Math.floor((stat.value - 10) / 2);
    const isProficient = proficientStats.includes(stat.name);
    const finalValue =
      baseMod + (isProficient ? character.proficiencyBonus : 0);
    return {
      name: stat.name,
      value: finalValue,
      proficient: isProficient,
    };
  });

  const skills = character?.skills?.map((skill) => {
    const relatedStat = character.stats.find(
      (stat) => stat.name === skill.stat
    );
    const statValue = relatedStat ? relatedStat.value : 10;
    const modifier =
      Math.floor((statValue - 10) / 2) +
      (skill.isProficient ? character.proficiencyBonus : 0);
    return {
      name: skill.name,
      stat: skill.stat.slice(0, 3).toUpperCase(),
      value: modifier,
      isProficient: skill.isProficient,
    };
  });

  const multiclassProficienciesTable = {
    Barbaro: [
      { name: "Armature", description: "Scudi" },
      { name: "Armi", description: "Armi semplici, armi da guerra" },
    ],
    Bardo: [
      { name: "Armature", description: "Armature leggere" },
      { name: "Abilità", description: "Un'abilità a scelta" },
      { name: "Strumenti", description: "Uno strumento musicale a scelta" },
    ],
    Chierico: [
      {
        name: "Armature",
        description: "Armature leggere, armature medie, scudi",
      },
    ],
    Druido: [
      {
        name: "Armature",
        description: "Armature leggere, armature medie, scudi (no metallo)",
      },
    ],
    Guerriero: [
      {
        name: "Armature",
        description: "Armature leggere, armature medie, scudi",
      },
      { name: "Armi", description: "Armi semplici, armi da guerra" },
    ],
    Ladro: [
      { name: "Armature", description: "Armature leggere" },
      { name: "Abilità", description: "Un'abilità dalla lista del ladro" },
      { name: "Strumenti", description: "Arnesi da scasso" },
    ],
    Mago: [],
    Monaco: [{ name: "Armi", description: "Armi semplici, spade corte" }],
    Paladino: [
      {
        name: "Armature",
        description: "Armature leggere, armature medie, scudi",
      },
      { name: "Armi", description: "Armi semplici, armi da guerra" },
    ],
    Ranger: [
      {
        name: "Armature",
        description: "Armature leggere, armature medie, scudi",
      },
      { name: "Armi", description: "Armi semplici, armi da guerra" },
      { name: "Abilità", description: "Un'abilità dalla lista del ranger" },
    ],
    Stregone: [],
    Warlock: [
      { name: "Armature", description: "Armature leggere" },
      { name: "Armi", description: "Armi semplici" },
    ],
  };

  const fullProficiencies = character?.classes[0]?.classProficiencies || [];

  const multiclassProficiencies = Array.isArray(character?.classes)
    ? character.classes.slice(1).flatMap((c) => {
        const multiclasse = multiclassProficienciesTable?.[c.type];
        return Array.isArray(multiclasse) ? multiclasse : [];
      })
    : [];
  const allProficiencies = [...fullProficiencies, ...multiclassProficiencies];

  const uniqueProficiencies = allProficiencies.reduce((acc, curr) => {
    if (!acc.find((p) => p.type === curr.type)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const handleSaveEdit = async () => {
    const unchanged =
      character.totalLifePoints === form.total &&
      character.currentLifePoints === form.current &&
      character.temporaryLifePoints === form.temporary 

    if (unchanged) {
      setEditing(false);
      return;
    }
    try {
      await updateLifeChar(character.id, form);
      dispatch(getCharacterAssign(characterAssign.id));
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <TabsContent className="p-6 space-y-3" value="info">
      <div className="flex items-center mb-8">
        <LineDecoration className="flex-grow h-1 mr-5 scale-x-[-1] " />
        <h4 className="text font-serif text-gold whitespace-nowrap uppercase text-xl">
          statistiche e abilità
        </h4>
        <LineDecoration className="flex-grow h-1 ml-5 " />
      </div>

      <div
        className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 space-y-5 mb-3`}
      >
        {character?.stats?.length > 0 &&
          character.stats?.map((item) => {
            const modifier = Math.floor((item.value - 10) / 2);
            return (
              <div
                key={item.name}
                className="relative flex flex-col items-center justify-start h-20 bg-gold/5"
              >
                <RectangleDecor className="absolute w-full h-full text-gold" />
                <div className="z-10 flex flex-col items-center pt-4">
                  <p className="text-xs font-light tracking-wide">
                    {item.name?.slice(0, 3).toUpperCase()}
                  </p>
                  <p className="text-gold">{item.value}</p>
                </div>
                <div className="absolute bottom-[-23px] z-20 flex items-center justify-center w-12 h-12">
                  <SquareDecor
                    className="absolute w-full h-full text-gold"
                    fill="#25231F"
                  />
                  <p className="z-10 text-xs">
                    {modifier >= 0 ? `+${modifier}` : modifier}
                  </p>
                </div>
                <div></div>
              </div>
            );
          })}
      </div>

      <div className="grid grid-cols-6 gap-10">
        <div className="col-span-2">
          <h3 className="text-gold text-xl font-medium mb-2">Abilità</h3>
          <div className="grid grid-cols-1 gap-x-5">
            {skills?.map((skill, index) => (
              <div
                className="flex justify-between items-center border-b border-gold/10"
                key={index}
              >
                <p
                  key={index}
                  className={`py-1 border-b border-gold/10 ${
                    skill.isProficient ? "text-gold" : ""
                  }`}
                >
                  {skill.name} {skill.isProficient ? "*" : ""}
                  <span className="text-gray-400 "> ({skill.stat}) </span>
                </p>
                <span className="text-gold">
                  {skill.value > 0 ? "+" : ""}
                  {skill.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">* Competenza</p>
        </div>

        <div className="col-span-4">
          <div className="flex justify-between border-b border-gold/30 mb-3">
            <p>Classe Armatura</p>
            <p>{armorClass}</p>
          </div>
          <div className="flex justify-between border-b border-gold/30 mb-3">
            <p>Iniziativa</p>
            <p>{dexModifier}</p>
          </div>
          <div>
            <div>
              <div className="flex justify-between mb-3 items-center">
                <h3 className="text-gold text-xl font-medium">
                  Punti ferita
                </h3>
                {!editing ? (
                  <Button
                    className="h-8 border border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
                    onClick={() => setEditing(true)}
                  >
                    Modifica
                  </Button>
                ) : <Button
                className="h-8 border border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
                onClick={handleSaveEdit}
              >
                Salva
              </Button>}
              </div>
              <div className="flex justify-between border-b border-gold/30 mb-3 items-center">
                <p>Punti Ferita</p>
                {editing ? (
                  <div className="flex">
                    <InputForm
                      type="number"
                      autofill="off"
                      id="new"
                      value={form.current}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          current: e.target.value,
                        })
                      }
                      placeholder={character.currentLifePoints}
                      className="mb-1 h-6  border-none bg-gold/10 rounded-none text-white w-10 no-spinner"
                    />
                    <span>/</span>
                    <InputForm
                      type="number"
                      autofill="off"
                      id="new"
                      value={form.total}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          total: e.target.value,
                        })
                      }
                      placeholder={character.totalLifePoints}
                      className="h-6  border-none bg-gold/10 rounded-none text-white w-10 no-spinner"
                    />
                  </div>
                ) : (
                  <p>
                    {character?.currentLifePoints}/{character?.totalLifePoints}
                  </p>
                )}
              </div>
              <div className="flex justify-between border-b border-gold/30 mb-10">
                <p>Punti Ferita Temporanei</p>
                {editing ? (
                  <div>
                    <InputForm
                      type="number"
                      autofill="off"
                      id="new"
                      value={form.temporary}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          temporary: e.target.value,
                        })
                      }
                      placeholder={character.temporaryLifePoints}
                      className="h-6 mb-1 border-none bg-gold/10 rounded-none text-white w-10 no-spinner"
                    />
                  </div>
                ) : (
                  <p>{character?.temporaryLifePoints}</p>
                )}
              </div>
            </div>

            <h3 className="text-gold text-xl font-medium mb-3">
              Tiri Salvezza
            </h3>
            <div className="space-y-2 grid grid-cols-2 gap-x-5">
              {savingThrowsDisplay?.map((stat, index) => (
                <p
                  key={index}
                  className={`flex justify-between items-center py-1 border-b border-gold/10 ${
                    stat.proficient ? "text-gold" : ""
                  }`}
                >
                  {stat.name} {stat.proficient ? "*" : ""}
                  <span className="text-gold">
                    {stat.value > 0 ? "+" : ""}
                    {stat.value}
                  </span>
                </p>
              ))}
              <p className="text-xs italic text-gray-400">* Competenza</p>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-gold text-xl font-medium mb-2">
              Altre Competenze
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Armi</h4>
                {uniqueProficiencies
                  .filter((prof) => prof.type === "Armi")
                  .map((prof, index) => (
                    <p key={index} className="text-gray-400">
                      {prof.description}
                    </p>
                  ))}
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Armature</h4>
                {uniqueProficiencies
                  .filter((prof) => prof.type === "Armature")
                  .map((prof, index) => (
                    <p key={index} className="text-gray-400">
                      {prof.description}
                    </p>
                  ))}
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Strumenti</h4>
                {uniqueProficiencies
                  .filter((prof) => prof.type === "Strumenti")
                  .map((prof, index) => (
                    <p key={index} className="text-gray-400">
                      {prof.description}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default InfoTab;
