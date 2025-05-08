import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../../redux/slices/dataSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../Generic/Cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Generic/Tabs";
import { Link } from "react-router-dom";
import { BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  ArrowLeft,
  ArrowRight,
  Backpack,
  FileText,
  Save,
  PersonGear,
  ChatHeart,
} from "react-bootstrap-icons";
import CharInfo from "./CharInfo";
import CharSkills from "./CharSkills";
import { setInitialCharacterData } from "../../redux/slices/selectionSlice";
import CharAbilities from "./CharAbilities";
import CharInventory from "./CharInventory";
import CharSpells from "./CharSpells";
import ChracterSummary from "./ChracterSummary";
import { createCharacter } from "../../api";

import { useNavigate } from "react-router-dom";

const CharacterCreate = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const charStats = useSelector((state) => state.selection.stats);
  const charSkills = useSelector((state) => state.selection.selectedSkills);
  const dataStats = useSelector((state) => state.data.stat);
  const dataSkills = useSelector((state) => state.data.skills);
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.data.isLoading);
  const navigate = useNavigate();
  const tabs = [
    {
      value: "info",
      label: "Informazioni",
      icon: UserIcon,
    },
    {
      value: "attributes",
      label: "Attributi",
      icon: PersonGear,
    },
    {
      value: "skills",
      label: "Abilità",
      icon: BookOpenIcon,
    },
    {
      value: "equipment",
      label: "Equipaggiamento",
      icon: Backpack,
    },
    {
      value: "spells",
      label: "Incantesimi",
      icon: FileText,
    },
    {
      value: "review",
      label: "Compendio",
      icon: Save,
    },
  ];
  const goToNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].value);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].value);
    }
  };
   
  const state = useSelector((state)=> state.selection)


  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();  
    formData.append("Name", state.name);
    formData.append("RaceId", state.raceId);
    if(state.subraceId){
      formData.append("SubraceId", state.subraceId);
    }    
    formData.append("BackgroundId", state.backgroundId);
    formData.append("LifePoints", state.lifePoints);
    formData.append("MaxWeight", state.maxWeight);
 
      formData.append("Image", selectedFile);
    
    state.stats.forEach((s, i) => {
      formData.append(`Stats[${i}].StatId`, s.id);
      formData.append(`Stats[${i}].Value`, s.value.toString());
    });
  
    state.selectedSkills.forEach((s, i) => {
      formData.append(`Skills[${i}].SkillId`, s.id);
      formData.append(`Skills[${i}].IsProficient`, s.isProficiency.toString());
    });
  
    state.selectedItems.forEach((i, idx) => {
      formData.append(`Items[${idx}].ItemId`, i.ItemId);
      formData.append(`Items[${idx}].Quantity`, (i.quantity || 1).toString());
      formData.append(`Items[${idx}].IsEquiped`, (i.isEquiped || false).toString());
    });
  
    state.selectedSpells.forEach((sp, idx) => {
      formData.append(`Spells[${idx}].SpellId`, sp.SpellId);
      formData.append(`Spells[${idx}].IsPrepared`, (sp.isPrepared || false).toString());
    });
  
    state.selectedTraits.forEach((tr, idx) => {
      formData.append(`Traits[${idx}].TraitId`, tr.id);
      formData.append(`Traits[${idx}].Source`, tr.source);
    });
  
    state.classAssignments.forEach((ca, idx) => {
      formData.append(`ClassAssignments[${idx}].ClassId`, ca.id);
      formData.append(`ClassAssignments[${idx}].LevelInClass`, ca.levelinClass.toString());
      if (ca.subclass) {
        formData.append(`ClassAssignments[${idx}].SubclassId`, ca.subclass);
      }
    });
  
    try {
      const res = await createCharacter(formData);
      console.log("Creato:", res);
      navigate("/Creations");
    } catch (err) {
      console.error("Errore nella creazione:", err);
    }
  };

  useEffect(() => {
    if (
      dataStats.length > 0 &&
      dataSkills.length > 0 &&
      charStats.length === 0 &&
      charSkills.length === 0
    ) {
      const initialStats = dataStats.map((s) => ({
        id: s.id,
        value: 8,
      }));

      const initialSkills = dataSkills.map((s) => ({
        id: s.id,
        isProficiency: false,
      }));

      dispatch(
        setInitialCharacterData({ stats: initialStats, skills: initialSkills })
      );
    }
  }, [dataStats, dataSkills, charStats, charSkills, dispatch]);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <main className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-light tracking-wider text-white">
              CREA PERSONAGGIO
            </h1>
            <p className="text-gray-400 mt-1">
              Crea un nuovo eroe per le tue avventure
            </p>
          </div>
        </div>
        <Card className="border-[#222222] bg-dark shadow-lg animate-pulse">
          <CardHeader className="border-b-gold border-[#222222] bg-black rounded-t-lg h-24"></CardHeader>
          <CardContent className="pt-6 h-96"></CardContent>
          <CardFooter className="border-t border-[#222222] pt-4 flex justify-between"></CardFooter>
        </Card>
      </main>
    );
  }
  return (
    <main className="container-fluid py-8">
      <Card className="border-theme bg-second-background shadow-lg bg-parchment">
        <div className="flex justify-between items-center mb-6 p-5 ">
          <div>
            <h1 className="text-3xl font-light tracking-widest text-gold mb-3">
              CREA IL TUO AVVENTURIERO
            </h1>
            <p className="text-gray-400 mt-1">
              Costruisci un nuovo eroe per le tue avventure, le tue scelte
              plasmeranno il tuo viaggio attraverso i reami.
            </p>
          </div>
          <Link to="/Creations">
            <button className="border-[#222222] text-white cursor-pointer opacity-60 hover:opacity-100">
              ANNULLA
            </button>
          </Link>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className=" rounded-t-lg py-0">
            <TabsList className="relative">
              <div className="border-b-1 border-gray-700 grid grid-cols-6 gap-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="relative group pb-2  hover:text-gray-300 transition-colors duration-300 data-[state=active]:text-gold"
                  >
                    <div className="flex items-center justify-center">
                      <tab.icon className="h-4 w-4 mr-2" />
                      <span className="hidden lg:inline">{tab.label}</span>
                    </div>
                    <div className=" absolute bottom-0 left-0 right-0 h-0.5  bg-transparent  group-data-[state=active]:bg-gold transition-all duration-300 scale-x-0 origin-left  group-data-[state=active]:scale-x-100 " />
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </CardHeader>

          <form className="py-8" onSubmit={handleSave}>
            <CharInfo onFileSelect={setSelectedFile} />
            <CharSkills />
            <CharAbilities />
            <CharInventory />
            <CharSpells/>
            <ChracterSummary/>
             <CardFooter className="rounded-b-lg flex justify-between items-center h-16 px-10">
            {activeTab !== tabs[0].value ? (
              <button
                type="button"
                className="border-[#222222] text-white hover:cursor-pointer flex items-center"
                onClick={goToPreviousTab}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                INDIETRO
              </button>
            ) : (
              <div />
            )}
            {activeTab === tabs[tabs.length - 1].value ? (
              <button
                type="submit"
                className="border-[#222222] text-white hover:cursor-pointer flex items-center"
              >
                <Save className="mr-2 w-4" />
                SALVA
              </button>
            ) : (
              <button
                type="button"
                className="border-[#222222] text-white hover:cursor-pointer flex items-center"
                onClick={goToNextTab}
              >
                AVANTI
                <ArrowRight className="ml-2 w-4" />
              </button>
            )}
          </CardFooter>
          </form>
         
        </Tabs>
      </Card>
    </main>
  );
};

export default CharacterCreate;
