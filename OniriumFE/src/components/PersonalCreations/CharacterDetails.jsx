import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertDialog } from "radix-ui";
import {
  clearCharacterDetails,
  getCharacterDetails,
} from "../../redux/slices/characterDetailsSlice";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Pencil,
  Share,
} from "react-bootstrap-icons";
import { Card, CardContent, CardFooter } from "../Generic/Cards";
import { RectangleDecor, SquareDecor } from "../../assets/decoration";
import { Tabs, TabsList, TabsTrigger } from "../Generic/Tabs";
import InfoTab from "./InfoTab";
import AbilitiesTab from "./AbilitiesTab";
import EquipTab from "./EquipTab";
import SpellsTab from "./SpellsTab";
import OniriumLoader from "../Generic/OniriumLoader";
import { deleteCharacter } from "../../api/CampaignApi";

const CharacterDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const { character, loading } = useSelector(
    (state) => state.characterDetails
  );
  const navigateTo = useNavigate();
  
  const handleDelete = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      await deleteCharacter(character.id);
      navigateTo("/Creations");
    } catch {
      setError(true);
    }
  };
  

  const equippedArmor = character?.inventory[0]?.items?.find(
    (item) => item.isEquiped && item.category === "Armatura"
  );
  const dexterityStat = character?.stats?.find(
    (stat) => stat.name.toLowerCase() === "destrezza"
  );
  const dexModifier = dexterityStat
    ? Math.floor((dexterityStat.value - 10) / 2)
    : 0;

  let armorClass = 10;

  if (equippedArmor) {
    switch (equippedArmor.armorType?.toLowerCase()) {
      case "leggera":
        armorClass = equippedArmor.armorClass + dexModifier;
        break;
      case "media":
        armorClass = equippedArmor.armorClass + Math.min(dexModifier, 2);
        break;
      case "pesante":
        armorClass = equippedArmor.armorClass;
        break;
      default:
        armorClass = equippedArmor.armorClass + dexModifier;
        break;
    }
  } else {
    armorClass += dexModifier;
  }

  const [activeTab, setActiveTab] = useState("items");
  const tabs = [
    {
      value: "info",
      label: "info",
      //icon: UserIcon,
    },
    {
      value: "abilities",
      label: "abilità",
      //icon: PersonGear,
    },
    {
      value: "items",
      label: "equipaggiamento",
      //icon: BookOpenIcon,
    },
    ...(character?.spells.length >0 ? [{ label: "Incantesimi", value: "spells"}] : []), 
  ];

  useEffect(() => {
    if (id) {
      dispatch(getCharacterDetails(id));
    }
    return () => {
      dispatch(clearCharacterDetails());
    };
  }, [id, dispatch]);


  if (loading)
    return (
      <div className="h-[90vh] flex justify-center imtes-center"><OniriumLoader size="md" text="CARICAMENTO"/></div>
    );
  if (error) return <div>Errore: {error}</div>;
  if (!character) return <div>Personaggio non trovato</div>;

  return (
    <div className="min-h-screen bg-dark text-white">      
      {/* Header */}
      <div className="relative py-6 bg-second-background border-b border-gold/20 bg-parchment">
        <div className="container-fluid mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/Creations"
                className="text-gold hover:bg-gold/10 hover:text-gold"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gold">{character.name}</h1>
              <div className="bg-dark text-gold border border-gold/50 px-2 py-0.5 rounded-full">
                Lvl {character.level}
              </div>
            </div>
            <div className="flex gap-2">
              {/* <button
                type="button"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold flex items-center hover:cursor-pointer border px-2 py-1 bg-dark"
              >
                <Pencil className="mr-2 h-4 w-4" /> Modifica
              </button> */}
              {/* <button
                type="button"
                className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30  flex items-center hover:cursor-pointer px-2 py-1"
              >
                <Share className="mr-2 h-4 w-4" /> Condividi
              </button> */}
              <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className="inline-flex h-[35px] items-center justify-center rounded bg-red-500/30 px-[15px] font-medium leading-none outline-none outline-offset-1 hover:bg-red-500/50 focus-visible:outline-2 cursor-pointer select-none">
                 Elimina Eroe
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-1 bg-dark/80 blur-lg" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-dark  p-[25px] shadow-[var(--shadow-6)] focus:outline-none border border-gold/50">
                  <AlertDialog.Title className="m-0 text-lg font-medium text-red-500">
                    Sei sicuro?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="mb-5 mt-5 leading-normal">
                    Questa azione sarà irriversibile e cancellerà tutti i dati
                    appartenenti a questo avventuriero.
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-2">
                    <AlertDialog.Cancel asChild>
                      <button className="inline-flex h-[35px] items-center justify-center rounded  px-[15px] font-medium leading-none  outline-none outline-offset-1 cursor-pointer  hover:bg-gray-700/70 border border-gray-700 focus-visible:outline-2 select-none">
                        Annulla
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        className="inline-flex h-[35px] items-center justify-center rounded bg-red-500/30 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red-500/50 cursor-pointer focus-visible:outline-2 focus-visible:outline-red7 select-none"
                        onClick={handleDelete}
                      >
                        Conferma
                      </button>
                    </AlertDialog.Action>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm border border-red-500/30 p-2 rounded bg-red-500/5">
                      C'è stato un errore nella cancellazione. Riprova.
                    </div>
                  )}
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
            </div>
          </div>
        </div>
      </div>
      {/* Main Contet */}
      <div className="container-fluid mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* aside */}
          <div className="md:col-span-1">
            <Card className=" bg-parchment border border-gold/30 ">
              {/* img */}
              <div className="h-80 w-full relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(http://localhost:5034/${character.image.replace(
                      /\\/g,
                      "/"
                    )})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg text-gold">
                    {character.race.subrace
                      ? character.race.subrace
                      : character.race.name}{" "}
                    • {character.class.map(c => c.subClass ? `${c.name}-${c.subClass}` : c.name).join(" / ")}
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>42</span>
                  </div> */}
                </div>
                {/* stats */}
                <div
                  className={`grid grid-cols-${
                    character.stats.length / 2
                  } gap-2 space-y-5 mb-2`}
                >
                  {character.stats.length > 0 &&
                    character.stats.map((item) => {
                      const modifier = Math.floor((item.value - 10) / 2);
                      return (
                        <div
                          key={item.name}
                          className="relative flex flex-col items-center justify-center h-18 bg-dark"
                        >
                          <RectangleDecor className="absolute w-full h-full text-gold" />
                          <div className="z-10 flex flex-col items-center">
                            <p className="text-xs font-light tracking-wide">
                              {item.name?.slice(0, 3).toUpperCase()}
                            </p>
                            <p className="text-gold">{item.value}</p>
                          </div>
                          <div className="absolute bottom-[-18px] z-20 flex items-center justify-center w-10 h-10">
                            <SquareDecor
                              className="absolute w-full h-full text-gold"
                              fill="#1C1C1B"
                            />
                            <p className="z-10 text-xs">
                              {modifier >= 0 ? `+${modifier}` : modifier}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* other stats */}                
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative flex flex-col items-center justify-center h-18 bg-dark">
                    <RectangleDecor className="absolute w-full h-full text-gold" />
                    <div className="z-10 flex flex-col items-center">
                      <p className="text-xs font-light tracking-wide">CA</p>
                      <p className="text-gold">{armorClass}</p>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center justify-center h-18 bg-dark">
                    <RectangleDecor className="absolute w-full h-full text-gold" />
                    <div className="z-10 flex flex-col items-center">
                      <p className="text-xs font-light tracking-wide">PF</p>
                      <p className="text-gold">{character.lifePoints}</p>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center justify-center h-18 bg-dark">
                    <RectangleDecor className="absolute w-full h-full text-gold" />
                    <div className="z-10 flex flex-col items-center">
                      <p className="text-xs font-light tracking-wide">INIZ</p>
                      <p className="text-gold"> + {dexModifier}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter className="grid grid-cols-2 gap-2 p-6 ">
                <button
                  type="button"
                  className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold flex items-center hover:cursor-pointer border px-2 py-1 rounded-sm bg-dark justify-center"
                >
                  <Heart className="mr-2 h-4 w-4" /> Mi Piace
                </button>
                <button
                  type="button"
                  className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 flex items-center hover:cursor-pointer px-2 py-1 rounded-sm justify-center"
                >
                  <Bookmark className="mr-2 h-4 w-4" /> Salva
                </button>
              </CardFooter> */}
            </Card>
          </div>
          {/* tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full col-span-2"
          >
            <TabsList className="relative">
              <div className={`border-gold/40 border grid grid-cols-${tabs.length} p-1 rounded-sm `}>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="relative group pb-2 rounded-sm text-gray-400 hover:text-white transition-colors duration-300 data-[state=active]:text-white data-[state=active]:bg-gold/40"
                  >
                    <div className="flex items-center justify-center">
                      {/* <tab.icon className="h-4 w-4 mr-2" /> */}
                      <span className="hidden lg:inline uppercase">
                        {tab.label}
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>


            <InfoTab character={character} />
            <AbilitiesTab character={character}/>
            <EquipTab character={character}/>
            {character?.spells.length > 0 && <SpellsTab character={character}/>}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default CharacterDetails;
