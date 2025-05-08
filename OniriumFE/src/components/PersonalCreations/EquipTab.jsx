import { Book, BookFill } from "react-bootstrap-icons";
import { Armor, MagicItem } from "../../assets/icons/generic";
import { Taglienti } from "../../assets/icons/dmgType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Generic/Cards";
import { TabsContent } from "../Generic/Tabs";

const EquipTab = ({ character }) => {
  return (
    <TabsContent value="items" className="mt-6">
      <Card className="bg-second-background border border-gold/30 text-white">
        <CardHeader>
          <CardTitle className="text-gold">Equipaggiamento</CardTitle>
          <CardDescription className="text-gray-400">
            Armi, armature e oggetti posseduti
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="flex items-center text-gold text-sm font-medium mb-2">
              <Taglienti className="h-4 w-4 mr-2 rotate-45" /> Armi
            </h3>
            {character?.inventory[0]?.items
              .filter((item) => item.category === "Arma")
              .map((item, i) => (
                <div
                  className="p-3 bg-gold/5 rounded-md border border-gold/10"
                  key={i}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gold">{item.name}</h4>
                    {item.isMagic ? (
                      <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                        Magico
                      </span>
                    ) : (
                      <span className="text-xs bg-black/40 text-gray-400 px-2 py-1 rounded">
                        Normale
                      </span>
                    )}
                  </div>
                  {item.damages.map((damage, i) => (
                    <div
                      className="grid grid-cols-3 gap-2 mt-2 text-sm"
                      key={i}
                    >
                      <div>
                        <span className="text-gray-400">Danni:</span>
                        <span className="text-white"> {damage.damageDice}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Tipo:</span>
                        <span className="text-white capitalize">
                          {" "}
                          {damage.damageType}{" "}
                        </span>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-300 mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>

          <div>
            <h3 className="flex items-center text-gold text-sm font-medium mb-2">
              <Armor className="h-4 w-4 mr-2" /> Armatura
            </h3>
            {character?.inventory[0]?.items
              .filter((item) => item.category === "Armatura")
              .map((item, i) => (
                <div
                  className="p-3 bg-gold/5 rounded-md border border-gold/10"
                  key={i}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gold">{item.name}</h4>
                    {item.isMagic ? (
                      <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                        Magico
                      </span>
                    ) : (
                      <span className="text-xs bg-black/40 text-gray-400 px-2 py-1 rounded">
                        Normale
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    <div>
                      <span className="text-gray-400">CA Base:</span>
                      <span className="text-white"> {item.armorClass}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tipo:</span>
                      <span className="text-white"> {item.armorType}</span>
                    </div>
                    {item.requirements.length > 0 && (
                      <div>
                        <span className="text-gray-400">Requisito:</span>
                        <span className="text-white">
                          {" "}
                          {item.requirements[0].statName
                            .slice(0, 3)
                            .toUpperCase()}{" "}
                          {item.requirements[0].minimumValue}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>

          {character?.inventory[0]?.items.some(
            (item) => item.category === "Oggetto Magico"
          ) && (
            <div className="mt-6">
              <h3 className="flex items-center text-gold text-sm font-medium mb-2">
                <MagicItem className="h-4 w-4 mr-2" /> Oggetti Magici
              </h3>
              <div className="space-y-3">
                {character.inventory[0].items
                  .filter((item) => item.category === "Oggetto Magico")
                  .map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-gold/5 rounded-md border border-gold/10"
                    >
                      <h4 className="font-medium text-gold">{item.name}</h4>
                      <p className="text-xs text-gray-300 mt-1">
                        {item.description || "Nessuna descrizione disponibile."}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {character?.inventory[0]?.items.some(
            (item) =>
              item.category !== "Arma" &&
              item.category !== "Armatura" &&
              item.category !== "Oggetto Magico"
          ) && (
            <div className="mt-6">
              <h3 className="flex items-center text-gold text-sm font-medium mb-2">
                <BookFill className="h-4 w-4 mr-2" /> Inventario
              </h3>
              <div className="p-3 bg-gold/5 rounded-md border border-gold/10">
                <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                  {character.inventory[0].items
                    .filter(
                      (item) =>
                        item.category !== "Arma" &&
                        item.category !== "Armatura" &&
                        item.category !== "Oggetto Magico"
                    )
                    .map((item, index) => (
                      <li key={index}>
                        {item.name}
                        {item.quantity > 1 ? ` (${item.quantity})` : ""}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default EquipTab;
