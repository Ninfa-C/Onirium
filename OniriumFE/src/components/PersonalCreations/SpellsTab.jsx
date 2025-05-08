import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../Generic/Cards";
import { TabsContent } from "../Generic/Tabs";

const SpellsTab = ({character}) => {
    const spellcastingAbilities = {
        "Artefice": "Intelligenza",
        "Bardo": "Carisma",
        "Chierico": "Saggezza",
        "Druido": "Saggezza",
        "Mago": "Intelligenza",
        "Paladino": "Carisma",
        "Ranger": "Saggezza",
        "Stregone": "Carisma",
        "Warlock": "Carisma"
      };
      
      const mainClass = character.class[0]?.name;
      const spellcastingAbility = spellcastingAbilities[mainClass] || "Nessuna";
      
    const proficiencyBonus = character?.proficiencyBonus;
    const statMod = Math.floor((character?.stats?.find(stat => stat.name === spellcastingAbility).value - 10) / 2);
    
    const saveDC = 8 + proficiencyBonus + statMod;
    const attackBonus = proficiencyBonus + statMod;
    const cantrips = character.spells.filter(spell => spell.spellLevel === "Trucchetto");

const spellsByLevel = character.spells
  .filter(spell => spell.spellLevel !== "Trucchetto")
  .reduce((acc, spell) => {
    const level = spell.spellLevel;
    if (!acc[level]) acc[level] = [];
    acc[level].push(spell);
    return acc;
  }, {});


    return ( 
<TabsContent value="spells" className="mt-6">
  <Card className="bg-second-background border border-gold/30 text-white">
    <CardHeader>
      <CardTitle className="text-gold">Incantesimi e Capacità Magiche</CardTitle>
      <CardDescription className="text-gray-400">
        Incantesimi, trucchetti e capacità magiche del personaggio
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-6">
      {/* Statistiche di Lancio */}
      <div>
        <h3 className="text-gold text-sm font-medium mb-2">Statistiche di Lancio</h3>
        <div className="grid grid-cols-2 gap-4 bg-gold/5 p-4 rounded-md border border-gold/10">
          <div>
            <h4 className="text-sm font-medium mb-1">Caratteristica da Incantatore</h4>
            <p className="text-gray-300">{spellcastingAbility}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">CD Tiro Salvezza</h4>
            <p className="text-gray-300">{saveDC}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Bonus di Attacco</h4>
            <p className="text-gray-300">{attackBonus >= 0 ? "+" : ""}{attackBonus}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Fonte</h4>
            <p className="text-gray-300">{character.class[0].name}</p>
          </div>
        </div>
      </div>

      {/* Trucchetti */}
      {cantrips.length > 0 && (
        <div>
          <h3 className="text-gold text-sm font-medium mb-2">Trucchetti</h3>
          <div className="space-y-3">
            {cantrips.map((spell, index) => (
              <div key={index} className="p-3 bg-gold/5 rounded-md border border-gold/10">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gold">{spell.name}</h4>
                  <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">Trucchetto</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                  <div><span className="text-gray-400">Tempo:</span> <span className="text-white">{spell.cost}</span></div>
                  <div><span className="text-gray-400">Gittata:</span> <span className="text-white">{spell.range}</span></div>
                  <div><span className="text-gray-400">Durata:</span> <span className="text-white">{spell.duration}</span></div>
                </div>
                <p className="text-xs text-gray-300 mt-2">{spell.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Incantesimi per livello */}
      {Object.entries(spellsByLevel).map(([level, spells]) => (
        <div key={level}>
          <h3 className="text-gold text-sm font-medium mb-2">Incantesimi di {level}° Livello</h3>
          <div className="space-y-3">
            {spells.map((spell, i) => (
              <div key={i} className="p-3 bg-gold/5 rounded-md border border-gold/10">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gold">{spell.name}</h4>
                  <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">{level}° Livello</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                  <div><span className="text-gray-400">Tempo:</span> <span className="text-white">{spell.cost}</span></div>
                  <div><span className="text-gray-400">Gittata:</span> <span className="text-white">{spell.range}</span></div>
                  <div><span className="text-gray-400">Durata:</span> <span className="text-white">{spell.duration}</span></div>
                </div>
                <p className="text-xs text-gray-300 mt-2">{spell.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
 
    </CardContent>
  </Card>
</TabsContent>

     );
}
 
export default SpellsTab;