import { useEffect, useState } from "react";
import {
  clearCharacterDetails,
  getCharacterAssign,
} from "../../../redux/slices/characterDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader } from "../../Generic/Cards";
import { Tabs, TabsList, TabsTrigger } from "../../Generic/Tabs";
import InfoTab from "./InfoTab";
import InventoryTab from "./InventoryTab";
import EnchantmentTab from "./EnchantmentTab";
import { Button } from "../../Generic/ButtonCustom";
import { Plus } from "react-bootstrap-icons";
import LevelUp from "./LevelUp";
import OniriumLoader from "../../Generic/OniriumLoader";

const CharInfoShow = (id) => {
  const dispatch = useDispatch();

  const [updateModal, setUpdateModal] = useState(false);

  const { characterAssign, loading } = useSelector((state) => state.characterDetails);

  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    {
      value: "info",
      label: "Info",
      //icon: UserIcon,
    },
    {
      value: "items",
      label: "Inventario",
      //icon: BookOpenIcon,
    },
    ...(characterAssign?.character?.spells?.length > 0
      ? [{ label: "Incantesimi", value: "spells" }]
      : []),
  ];

  useEffect(() => {
    if (id) {
      dispatch(getCharacterAssign(id.id));
    }
    return () => {
      dispatch(clearCharacterDetails());
    };
  }, [id, dispatch]);

  if (loading)
    return (
      <div className="h-[90vh] flex justify-center imtes-center"><OniriumLoader size="md" text="CARICAMENTO"/></div>
    );

  return (
    <>
      <Card className="border-gold/30 bg-second-background">
        <CardHeader className="gap-3 flex-row items-center justify-between">
          <div className="gap-3 flex items-center">
            <div
              className="h-20 w-20 rounded-full inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(http://localhost:5034/${characterAssign?.character?.image.replace(
                  /\\/g,
                  "/"
                )})`,
              }}
            />
            <div>
              <p className="text-xl">{characterAssign?.character?.name}</p>
              <p className="text-gray-400">
                lvl {characterAssign?.character?.level} •
                {characterAssign?.character?.subraceName ||
                  characterAssign?.character?.raceName}{" "}
                •{" "}
                {characterAssign?.character?.classes
                  .map((c) =>
                    c.subClassName
                      ? `${c.className}-${c.subClassName}`
                      : c.className
                  )
                  .join(" / ")}
              </p>
            </div>
          </div>
          <div>
            <Button
              onClick={() => setUpdateModal(true)}
              className="border border-gold/30 text-gold hover:bg-gold/30 hover:text-white"
            >
              <Plus /> Modifica
            </Button>
          </div>
        </CardHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full col-span-2"
        >
          <TabsList className="relative">
            <div
              className={`grid grid-cols-2  lg:grid-cols-${tabs.length} p-1 rounded-sm`}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative group pb-2  hover:text-gray-300 transition-colors duration-300 data-[state=active]:text-gold"
                >
                  <div className="flex items-center justify-center">
                    <span className="inline">{tab.label}</span>
                  </div>
                  <div className=" absolute bottom-0 left-0 right-0 h-0.5  bg-transparent  group-data-[state=active]:bg-gold transition-all duration-300 scale-x-0 origin-left  group-data-[state=active]:scale-x-100 " />
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
          <InfoTab character={characterAssign?.character} />
          <InventoryTab />
          {characterAssign?.character?.spells?.length > 0 && <EnchantmentTab />}
        </Tabs>
      </Card>


      <LevelUp
       isOpen={updateModal}
       onClose={() => setUpdateModal(false)}
      />
    </>
  );
};

export default CharInfoShow;
