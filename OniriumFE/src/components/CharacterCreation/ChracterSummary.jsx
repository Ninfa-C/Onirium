//import { useSelector } from "react-redux";
import { TabsContent } from "../Generic/Tabs";
import CharEquipmentsSummary from "./CharEquipmentsSummary";
import CharInfoSummary from "./CharInfoSummary";
import CharStatsInfoSummary from "./CharStatsInfoSummary";
import CharTraitsSumary from "./CharTraitsSumary";

const ChracterSummary = () => {
  //   const character = useSelector((state) => state.selection);
  //   const {
  //     name,
  //     image,
  //     lifePoints,
  //     maxWeight,
  //     classAssignments,
  //     backgroundId,
  //     raceId,
  //     subraceId,
  //     selectedClass,
  //     stats,
  //     selectedSkills,
  //     selectedTraits,
  //     selectedSpells,
  //     selectedItems,
  //     startingBoost,
  //   } = character;

  return (
    <TabsContent value="review" className="mt-0 container-fluid">
      <div className="rounded-lg bg-second-background border border-gray-700 shadow-lg">
        <CharInfoSummary />
        <div className="p-x py-2 bg-dark">
          <CharStatsInfoSummary />
          <CharTraitsSumary />
          <CharEquipmentsSummary/>
        </div>
      </div>
    </TabsContent>
  );
};

export default ChracterSummary;
