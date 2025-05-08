import { useSelector } from "react-redux";
import { TabsContent } from "../Generic/Tabs";
import SingleAbility from "./SingleAbility";
import CharHeader from "./CharHeader";


const CharAbilities = () => {
  const selectedSkills = useSelector((state) => state.selection.selectedSkills);
  const data = useSelector((state) => state.data.skills);
  const selectedClasses = useSelector((state) => state.selection.selectedClass[0]);  
  const classAbility = selectedClasses?.proficiencies?.find(
    (p) => p.name.toLowerCase() === "abilità"
  );

  return (
    <TabsContent value="skills" className="mt-0 container-fluid ">
      <CharHeader
        title="Seleziona le abilità"
        description="Il tuo personaggio ha affinato alcune abilità nel corso del suo cammino. Quelle già vissute non si dimenticano, ma ora è tempo di scegliere cosa renderà grande la sua leggenda."
      >
        {selectedClasses && (
          <p className="text-gray-400 italic mb-5">
            La classe{" "}
            <span className="capitalize">{selectedClasses.name.toLowerCase()}</span>{" "}
            sussurra alcune inclinazioni naturali... seguirle o meno dipenderà da
            te: {classAbility?.description?.toLowerCase()}
          </p>
        )}
      </CharHeader>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((item) => {
          const selected = selectedSkills.find((s) => s.id === item.id);
          return (
            <SingleAbility
              key={item.id}
              skill={item}
              stat={item.stat?.slice(0, 3).toUpperCase() || ""}
              checked={selected?.isProficiency || false}
            />
          );
        })}
      </div>
    </TabsContent>
  );
};

export default CharAbilities;
