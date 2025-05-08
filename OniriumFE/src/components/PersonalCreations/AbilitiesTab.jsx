import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Generic/Cards";
import { TabsContent } from "../Generic/Tabs";

const AbilitiesTab = ({ character }) => {
  const classSavingThows = character?.class[0]?.proficiencies?.find(
    (p) => p.name.toLowerCase() === "tirisalvezza"
  );
  const proficientStats = classSavingThows
    ? classSavingThows.description.split(",").map((s) => s.trim())
    : [];

  const savingThrowsDisplay = character.stats.map((stat) => {
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
  const skills = character.skills.map((skill) => {
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

  const fullProficiencies = character.class[0]?.proficiencies || [];
  const multiclassProficiencies = character.class.slice(1).flatMap((c) => {
    const multiclasse = multiclassProficienciesTable[c.name];
    return multiclasse ? multiclasse : [];
  });
  const allProficiencies = [...fullProficiencies, ...multiclassProficiencies];

  const uniqueProficiencies = allProficiencies.reduce((acc, curr) => {
    if (!acc.find((p) => p.name === curr.name)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <TabsContent value="abilities" className="mt-6">
      <Card className="bg-second-background border border-gold/30 text-white">
        <CardHeader>
          <CardTitle className="text-gold">Abilità e Competenze</CardTitle>
          <CardDescription className="text-gray-400">
            Abilità, tiri salvezza e competenze del personaggio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-gold text-sm font-medium mb-2">
                Tiri Salvezza
              </h3>
              <div className="space-y-2">
                {savingThrowsDisplay.map((stat, index) => (
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

            <div className="col-span-2">
              <h3 className="text-gold text-sm font-medium mb-2">Abilità</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                {skills.map((skill, index) => (
                  <div className="flex justify-between items-center border-b border-gold/10">
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
          </div>

          <div className="mt-6">
            <h3 className="text-gold text-sm font-medium mb-2">
              Altre Competenze
            </h3>
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Armi</h4>
                {uniqueProficiencies
                  .filter((prof) => prof.name === "Armi")
                  .map((prof, index) => (
                    <p key={index} className="text-gray-300">
                      {prof.description}
                    </p>
                  ))}
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Armature</h4>
                {uniqueProficiencies
                  .filter((prof) => prof.name === "Armature")
                  .map((prof, index) => (
                    <p key={index} className="text-gray-300">
                      {prof.description}
                    </p>
                  ))}
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Strumenti</h4>
                {uniqueProficiencies
                  .filter((prof) => prof.name === "Strumenti")
                  .map((prof, index) => (
                    <p key={index} className="text-gray-300">
                      {prof.description}
                    </p>
                  ))}
              </div>             
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AbilitiesTab;
