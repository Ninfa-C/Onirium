import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Generic/Tabs";
import CharHeader from "./CharHeader";
import TabSpells from "./TabSpells";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedSpells } from "../../redux/slices/selectionSlice";
import { resetSpells } from "../../redux/slices/dataSlice";

const CharSpells = () => {
  const Spells = useSelector((state) => state.data.spell);
  const [activeTab, setActiveTab] = useState("0");
  const dispatch = useDispatch();
  const classAssignments = useSelector(
    (state) => state.selection.classAssignments
  );
  const selectedClassDetails = useSelector(
    (state) => state.selection.selectedClass
  );

  const casterProgression = {
    Mago: 1,
    Stregone: 1,
    Chierico: 1,
    Druido: 1,
    Bardo: 1,
    Warlock: 1,
    Paladino: 0.5,
    Ranger: 0.5,
    Guerriero: 0.33,
    Ladro: 0.33,
  };

  const classNames = classAssignments
    .map((cls) => {
      const classData = selectedClassDetails.find((c) => c.id === cls.id);
      if (!classData) return null;
      const coeff = casterProgression[classData.name] ?? 0;
      return {
        name: classData.name,
        level: cls.levelinClass,
        effective: cls.levelinClass * coeff,
      };
    })
    .filter(Boolean);

  const maxSpellLevel = Math.max(
    ...classNames.map((cls) => Math.floor((cls.effective + 1) / 2))
  );

  const availableTabs = Array.from({ length: maxSpellLevel + 1 }, (_, i) => ({
    value: i.toString(),
    label: i === 0 ? "Trucchetti" : `lvl ${i}`,
  }));

  useEffect(() => {
    dispatch(resetSpells());
    dispatch(clearSelectedSpells());
  }, [classAssignments]);

  return (
    <TabsContent value="spells" className="mt-0 container-fluid">
      <CharHeader
        title="Scegli le Tue Magie"
        description="Ogni incantesimo è un patto sussurrato nell’ombra, un frammento di potere rubato all’ignoto. Le parole arcane graffiano l’anima, e chi osa pronunciarle si lega al destino. Scegli con cura… ché ogni magia ha un prezzo"
      />
      {availableTabs.length <= 1 ? (
        <p className="opacity-75">
          La magia sussurra da mondi dimenticati… ma nessuna runa è stata ancora
          tracciata dal tuo volere.
        </p>
      ) : (
        <div className="grid grid-cols-4 items-start gap-5">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 col-span-4"
          >
            <TabsList className="rounded-2xl bg-dark-lighter w-full flex items-center justify-center">
              {availableTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs group hover:text-gray-300 transition-colors duration-300 data-[state=active]:font-bold data-[state=active]:opacity-100 data-[state=active]:bg-dark rounded-sm"
                >
                  <div className="flex items-center justify-center">
                    <span className="hidden lg:inline">{tab.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {availableTabs.map((tab) => (
              <TabSpells
                key={tab.value}
                value={tab.value}
                level={parseInt(tab.value)}
                characterClass={null}
                multiClass={classNames}
              />
            ))}
          </Tabs>
        </div>
      )}
    </TabsContent>
  );
};

export default CharSpells;
