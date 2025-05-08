import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Generic/Tabs";
import CharHeader from "./CharHeader";
import { Armor, Items, MagicItem, Weapon } from "../../assets/icons/generic";
import { useState } from "react";
import InventoryWeapon from "./InventoryWeapon";
import InventoryArmor from "./InventoryArmor";
import InventoryMagicalItems from "./InventoryMagicalItems";
import InventoryGeneralItems from "./InventoryGeneralItems ";
import SelectedItemsOverview from "./SelectedItemsOverview";

const tabs = [
  {
    value: "weapons",
    label: "Armi",
    icon: Weapon,
  },
  {
    value: "armor",
    label: "Armatura",
    icon: Armor,
  },
  {
    value: "magic",
    label: "Oggeti magici",
    icon: MagicItem,
  },
  {
    value: "generic",
    label: "Comune",
    icon: Items,
  },
];

const CharInventory = () => {
  const [activeTab, setActiveTab] = useState("weapons");

  return (
    <TabsContent value="equipment" className="mt-0 container-fluid ">
      <CharHeader
        title="Scegli l’Equipaggiamento"
        description=" Ogni eroe ha bisogno degli strumenti giusti per affrontare il viaggio.
          Armi, armature e oggetti utili: scegli con saggezza. La classe e il
          passato del tuo personaggio potrebbero già avergli lasciato qualche
          dono iniziale."
      />



<div className="grid grid-cols-4 items-start gap-5">  
      <SelectedItemsOverview />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 col-span-3">
        <TabsList className=" rounded-2xl bg-dark-lighter  w-full flex items-center">
          <div className=" grid grid-cols-4 gap-0 w-2/3 mx-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-xs group hover:text-gray-300 transition-colors duration-300 data-[state=active]:font-bold data-[state=active]:opacity-100
               data-[state=active]:bg-dark rounded-sm"
              >
                <div className="flex items-center justify-center">
                  <tab.icon className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </div>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        <InventoryWeapon />
        <InventoryArmor />
        <InventoryMagicalItems />
        <InventoryGeneralItems />
      </Tabs>
</div>
    </TabsContent>
  );
};

export default CharInventory;
