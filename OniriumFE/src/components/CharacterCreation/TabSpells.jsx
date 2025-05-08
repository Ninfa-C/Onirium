import { useEffect, useState } from "react";
import SearchBar from "../Generic/SearchBar";
import { TabsContent } from "../Generic/Tabs";
import Pagination from "../Generic/Pagination";
import { useDispatch, useSelector } from "react-redux";
import SingleEnchantment from "./SingleEnchantment";
import { fetchSpellsByFilter, resetSpells } from "../../redux/slices/dataSlice";

const TabSpells = ({ value, level, characterClass, multiClass = [] }) => {
  const dispatch = useDispatch();
  const [custom, setCustom] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataSpell = useSelector((state) => state.data.spell);
  const spellLevelLabel = value === "0" ? "Trucchetto" : value;
  const itemsPerPage = 6;

  const filteredSpells =
    dataSpell?.filter(
      (item) =>
        item.level === spellLevelLabel &&
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedSchool === "" || item.school === selectedSchool)
    ) || [];

  const paginatedSpells = filteredSpells.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSchool]);

  useEffect(() => {
    if (level == null || multiClass.length === 0) return;
    dispatch(resetSpells());
    dispatch(
      fetchSpellsByFilter({
        level,
        className: characterClass,
        custom,
        multiClass,
      })
    );
  }, [dispatch, level, characterClass, custom, JSON.stringify(multiClass)]);

  return (
    <TabsContent value={value} className="mt-0 container-fluid ">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          classnameContainer="flex-1"
        />
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
        <div
          className="flex items-center gap-2 mt-1.5"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paginatedSpells.map((item) => (
          <SingleEnchantment spell={item} key={item.id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredSpells.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </TabsContent>
  );
};

export default TabSpells;
