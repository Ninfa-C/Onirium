import { LineDecoration } from "../../assets/decoration";
import InventorySpell from "./InventorySpell";
import InventorySummary from "./InventorySummary";

const CharEquipmentsSummary = () => {
  return (
    <div className="px-8">        
      <div className="flex items-center mb-6 px-8">
        <LineDecoration className="flex-grow h-1 ml-5 scale-x-[-1] " />
        <h4 className="font-serif text-gold whitespace-nowrap uppercase">
          equipaggiamento e incantesimi
        </h4>
        <LineDecoration className="flex-grow h-1 ml-5 " />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
    <InventorySummary/>
    <InventorySpell/>
      </div>
    </div>
  );
};

export default CharEquipmentsSummary;
