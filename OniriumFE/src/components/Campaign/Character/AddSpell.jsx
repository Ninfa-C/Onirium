import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "../../Generic/Pagination";
import { ScrollArea } from "radix-ui";
import SearchBar from "../../Generic/SearchBar";
import {
  fetchSpellsByFilter,
  resetSpells,
} from "../../../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import * as SpellSchoolIcons from "../../../assets/icons/spellSchool";
import { Rituale } from "../../../assets/icons/generic";
import {
  A2,
  B2,
  Distance,
  Istant,
  R2,
  Round,
  Self,
  Time,
  Touch,
} from "../../../assets/icons/action";

const AddSpell = ({ data, setData }) => {
  const [search, setSearch] = useState("");
  const [custom, setCustom] = useState(false);
  const spells = useSelector(
    (state) => state.characterDetails.characterAssign.character.spells
  );
  const DataSpells = useSelector((state) => state.data.spell);
  const [selectedSchool, setSelectedSchool] = useState("");
  const dispatch = useDispatch();
  const character = useSelector(
    (state) => state.characterDetails.characterAssign.character
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

  const isSelected = (id) =>
    data.some((item) => item.SpellId === id) ||
    spells.some((item) => item.spell.id === id) ||
    false;

  const classNames = character.classes
    .map((cls) => {
      const coeff = casterProgression[cls.className] ?? 0;
      return {
        name: cls.className,
        level: cls.levelInClass,
        effective: cls.levelInClass * coeff,
      };
    })
    .filter(Boolean);

  const SchoolIcon = (school) => {
    return SpellSchoolIcons[school] ? SpellSchoolIcons[school] : null;
  };

  const renderActionIcon = (cost) => {
    switch (cost?.toLowerCase()) {
      case "azione":
        return <A2 className="h-4 w-4 " />;
      case "bonus":
        return <B2 className="h-4 w-4 " />;
      case "reazione":
        return <R2 className="h-4 w-4 " />;
      case "istantanea":
        return <Istant className="h-4 w-4 " />;
      case "1 round":
        return <Round className="h-4 w-4 " />;
      default:
        return (
          <>
            <Time className="h-4 w-4 " /> {cost}
          </>
        );
    }
  };

  const renderRangenIcon = (cost) => {
    switch (cost?.toLowerCase()) {
      case "contatto":
        return <Touch className="h-4 w-4 " />;
      case "personale":
        return <Self className="h-4 w-4 " />;
      default:
        return (
          <>
            <Distance className="h-3 w-3 " /> {cost}
          </>
        );
    }
  };

  const filtered =
    DataSpells?.filter(
      (item) =>
        item?.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedSchool === "" || item.school === selectedSchool)
    ) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const lg = useMediaQuery({ query: "(min-width: 1024px)" });

  const paginatedSpells = lg
    ? filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filtered;


    const handleClick = (item) => {
      setData((prevData) => {
        const validData = Array.isArray(prevData) ? prevData : [];
    
        const existing = validData?.find(
          (dataItem) => dataItem?.SpellId === item.id
        );
    
        if (existing) {
          return validData.filter((dataItem) => dataItem.SpellId !== item.id);
        } else {
          return [
            ...validData,
            { SpellId: item.id, IsPrepared: false },
          ];
        }
      });
    };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSchool]);

  useEffect(() => {
    dispatch(resetSpells());
    dispatch(
      fetchSpellsByFilter({
        custom: custom,
        multiClass: classNames,
      })
    );
  }, [custom]);


  return (
    <>
      <div>
        {/* search + filtro + custom */}
        <div className="grid grid-cols-3 md:grid-cols-9  items-center gap-4 mb-4 justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            classnameContainer="col-span-3 md:col-span-5 lg:col-span-7"
          />
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="text-sm bg-dark-lighter text-white border border-gray-700 rounded-md px-3 py-2 ml-auto hover:border-gold/40  appearance-none focus:outline-none cursor-pointer"
          >
            <option value="">Tutte le Scuole</option>
            {[
              "Abiurazione",
              "Ammaliamento",
              "Divinazione",
              "Evocazione",
              "Illusione",
              "Invocazione",
              "Necromanzia",
              "Trasmutazione",
            ].map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
          </div>
          
          <div
            className="flex items-center gap-0.5 mt-1.5 col-span-1 md:col-span-2 lg:col-span-1"
            title="Abilita sortilegi scritti nell’inchiostro del caos creativo."
          >
            <span className="text-sm text-white">Incanti Proibiti</span>
            <div className="relative">
              <input
                id="custom-spells-checkbox"
                type="checkbox"
                className="peer hidden"
                checked={custom}
                onChange={(e) => setCustom(e.target.checked)}
              />
              <label
                htmlFor="custom-spells-checkbox"
                className="w-4 h-4 border-1 flex items-center justify-center cursor-pointer border-gold peer-checked:bg-gold peer-checked:border-gold peer-hover:border-gold"
              >
                {custom && (
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </label>
            </div>
          </div>
        </div>
        {/* spells */}
        <div>
          <ScrollArea.Root className="h-[45vh] overflow-hidden rounded">
            <ScrollArea.Viewport className="size-full rounded">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {paginatedSpells.map((item) => (
                  <div
                    key={item.id}
                    className={`flex p-3 rounded-md cursor-pointer transition-colors gap-3 ${
                      isSelected(item.id)
                        ? "border border-gold"
                        : "bg-bg-secondary border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex-1" onClick={() => handleClick(item)}>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-base font-medium">{item.name}</h3>

                        <div className="flex gap-2">
                          <span title={item.school}>
                            {SchoolIcon(item.school) && (
                              <SchoolIcon className="w-4 h-4 text-gold" />
                            )}
                          </span>
                          {item.isRitual && (
                            <span title="Rituale">
                              <Rituale className="text-violet-400 w-4 h-4" />
                            </span>
                          )}
                          <div className="rounded-full px-4 border border-gold/30 text-sm">
                            {item.level === "Trucchetto"
                              ? "Trucchetto"
                              : `lvl ${item.level}`}
                          </div>                          
                        </div>
                      </div>
                      {item.classes.length > 0 && (
                        <p className="text-sm text-gold">
                          {item.classes.map((cls, i) => (
                            <span key={i}>
                              {cls.name}
                              {i < item.classes.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                      )}

                      <p className="text-xs mt-1">
                        Tempo di lancio:{" "}
                        <span className="text-sm mt-1 text-gray-400">
                          {item.cost}
                        </span>
                      </p>
                      <p className="text-xs">
                        Gittata:{" "}
                        <span className="text-sm mt-1 text-gray-400">
                          {item.range}
                        </span>
                      </p>
                      <p className="text-xs">
                        Componenti:{" "}
                        <span className="text-sm mt-1 text-gray-400">
                          {item.components}
                        </span>
                      </p>
                      <p className="text-xs mb-3">
                        Durata:{" "}
                        <span className="text-sm mt-1 text-gray-400">
                          {" "}
                          {item.isConcentration && `Concentrazione, fino a `}
                          {item.duration}
                        </span>
                      </p>

                      <p className="text-xs mb-2">{item.description}</p>
                      {item.damage?.length > 0 && (
                        <p className="text-xs text-gold mb-1">
                          Danni:{" "}
                          {item.damage.map((d, i) => (
                            <span key={i}>
                              {d.damageDice} {d.damageType}
                              {i < item.damage.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                      )}

                      <p className="text-sm flex items-center gap-1">
                        Riassunto:
                        <span
                          title={item.cost}
                          className="flex items-center gap-1"
                        >
                          {renderActionIcon(item.cost)}
                        </span>
                        |
                        <span
                          title={`Gittata: ${item.range}`}
                          className="flex items-center gap-1"
                        >
                          {renderRangenIcon(item.range)}
                        </span>
                        |
                        <span
                          title={`Durata: ${item.duration}`}
                          className="flex items-center gap-1"
                        >
                          {renderActionIcon(item.duration)}
                        </span>
                        {item.isRitual && (
                          <>
                            |
                            <span title="Rituale">
                              <Rituale className="text-violet-400 w-4 h-4" />{" "}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="vertical"
            >
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
          {lg && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filtered.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddSpell;
