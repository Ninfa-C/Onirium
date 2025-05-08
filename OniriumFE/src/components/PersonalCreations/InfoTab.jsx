import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Generic/Cards";
import { TabsContent } from "../Generic/Tabs";

const InfoTab = ({ character }) => {
  const racialTraits = character.traits.filter(
    (t) => t.source === "Race" || t.source === "Subrace"
  );
  const classTraits = character.traits.filter(
    (t) => t.source === "Class" || t.source === "Subclass"
  );

  return (
    <TabsContent value="info" className="mt-6">
      <Card className="bg-second-background border border-gold/30 text-white">
        <CardHeader>
          <CardTitle className="text-gold">Retaggio e Destino</CardTitle>
          <CardDescription className="text-gray-400">
            Origini e caratteristiche principali
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-gold text-sm font-medium mb-1">Razza</h3>
              <p className="text-gray-300">
                {character.race.subrace
                  ? character.race.subrace
                  : character.race.name}
              </p>
            </div>
            <div>
              <h3 className="text-gold text-sm font-medium mb-1">Classe</h3>
              <p className="text-gray-300">
                {character.class
                  .map((c) => (c.subClass ? `${c.name}-${c.subClass}` : c.name))
                  .join(" / ")}
              </p>
            </div>
            <div>
              <h3 className="text-gold text-sm font-medium mb-1">Livello</h3>
              <p className="text-gray-300">{character.level}</p>
            </div>
          </div>

          {racialTraits.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gold mb-2">
                Tratti Razziali
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {racialTraits.map((trait) => (
                  <li key={trait.id}>{trait.name}</li>
                ))}
              </ul>
            </div>
          )}

          {classTraits.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gold mb-2">
                Caratteristiche di Classe
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {classTraits.map((trait, i) => (
                  <li key={i} title={trait.description}>
                    {trait.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {character.description && (
            <div>
              <h3 className="text-gold text-sm font-medium mb-1">
                Descrizione
              </h3>
              <p className="text-gray-300">
                {character.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default InfoTab;
