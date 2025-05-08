import { useEffect, useState } from "react";
import { TabsContent } from "../Generic/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByCategory } from "../../redux/slices/dataSlice";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import * as WeaponIcons from "../../assets/icons/weapon";
import { Weapon } from "../../assets/icons/generic";
import {
  Acido,
  Contundenti,
  Forza,
  Freddo,
  Fulmine,
  Fuoco,
  Necro,
  Perforanti,
  Psi,
  Radiante,
  Taglienti,
  Tuono,
  Veleno,
} from "../../assets/icons/dmgType";
import SearchBar from "../Generic/SearchBar";
import Pagination from "../Generic/Pagination";

const iconMap = {
  "mazza chiodata": WeaponIcons.Mazzachiodata,
  "ascia bipenne": WeaponIcons.AsciaBipenne,
  arco: WeaponIcons.Arco,
  randello: WeaponIcons.Randello,
  pugnale: WeaponIcons.Pugnale,
  balestra: WeaponIcons.Balestra,
  mazzafrusto: WeaponIcons.MazzaFerrata,
  falcione: WeaponIcons.Falcione,
  martello: WeaponIcons.Martello,
  ascia: WeaponIcons.AsciaMano,
  lancia: WeaponIcons.Lancia,
  mazza: WeaponIcons.Mazza,
  moschetto: WeaponIcons.Moschetto,
  piccone: WeaponIcons.Picca,
  pistola: WeaponIcons.Pistola,
  stocco: WeaponIcons.Stocco,
  scimitarra: WeaponIcons.Scimitarra,
  falce: WeaponIcons.Falce,
  fionda: WeaponIcons.Fionda,
  "lancia corta": WeaponIcons.LanciaCorta,
  bastone: WeaponIcons.Bastone,
  spada: WeaponIcons.Spada,
  tridente: WeaponIcons.Tridente,
  frusta: WeaponIcons.Frusta,
};

const InventoryWeapon = () => {
  const [search, setSearch] = useState("");
  const dataWeapon = useSelector((state) => state.data.item.arma);
  const selectedItems = useSelector((state) => state.selection.selectedItems);
  const dispatch = useDispatch();

  const isItemSelected = (id) =>
    selectedItems.some((item) => item.ItemId === id) || false;

  const toggleItem = (item) => {
    const exists = selectedItems.find((i) => i.ItemId === item.id);
    const updated = exists
      ? selectedItems.filter((i) => i.ItemId !== item.id)
      : [...selectedItems, { ItemId: item.id, Quantity: 1, IsEquiped: false }];
    dispatch(updateCharacterInfo({ selectedItems: updated }));
  };

  const getWeaponIcon = (weaponName) => {
    const name = weaponName.toLowerCase();
    if (iconMap[name]) return iconMap[name];
    const fallback = Object.keys(iconMap).find((key) => name.includes(key));
    return fallback ? iconMap[fallback] : Weapon;
  };

  const getDamageIcon = (type) => {
    const iconMap = {
      acido: Acido,
      contundenti: Contundenti,
      forza: Forza,
      freddo: Freddo,
      fulmine: Fulmine,
      fuoco: Fuoco,
      necrotici: Necro,
      perforanti: Perforanti,
      psichici: Psi,
      radianti: Radiante,
      taglienti: Taglienti,
      tuono: Tuono,
      veleno: Veleno,
    };
    return iconMap[type.toLowerCase()] || null;
  };
//PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const filteredWeapons = dataWeapon?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ) || [];
  
  const paginatedWeapons = filteredWeapons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchItemsByCategory("arma"));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  
  return (
    <TabsContent value="weapons" className="mt-0 container-fluid ">
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paginatedWeapons.map((item) => {
            const Icon = getWeaponIcon(item.name);
            return (
              <div
                key={item.id}
                className={`flex p-3 rounded-md cursor-pointer transition-colors gap-3 ${
                  isItemSelected(item.id)
                    ? "border border-gold"
                    : "bg-bg-secondary border border-gray-700 hover:border-gray-600"
                }`}
              >
                <div>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    className="peer hidden"
                    checked={isItemSelected(item.id)}
                    onChange={() => toggleItem(item)}
                  />
                  <label
                    htmlFor={`checkbox-${item.id}`}
                    className="w-4 h-4 border-1 flex items-center mt-1 justify-center cursor-pointer border-gold peer-checked:bg-gold peer-checked:border-gold peer-hover:border-gold"
                  >
                    {isItemSelected(item.id) && (
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
                <div className="flex justify-between flex-1">
                  <div>
                    <div className="flex gap-1 items-center">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    <p className="text-xs ml-5 text-secondary">
                    <span>
                    <span className="font-semibold text-white">
                      {item.weight}
                    </span>{" "}
                    kg
                  </span> -  <span>
                    <span className="font-semibold text-white">
                      {item.value}
                    </span>{" "}
                    mo
                  </span>
                    </p>
                  </div>
                  <div className="text-right flex flex-col justify-between items-end">
                    {item.damages?.map((dmg, idx) => {
                      const Icon = getDamageIcon(dmg.damageType);
                      return (
                        <p
                          key={idx}
                          className="flex items-center gap-1 text-xs rounded-full bg-dark-lighter py-0.5 px-2.5 font-semibold text-gold border border-gold/40"
                        >
                          {dmg.damageDice} {dmg.damageType}
                          {/* <span title={dmg.damageType}>
                             {Icon && <Icon className="w-4 h-4 text-gold rotate-45" />}
                          </span>                                                    */}
                        </p>
                      );
                    })}

                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
                <div></div>
              </div>
            );
          })}
      </div>
<Pagination currentPage={currentPage} totalPages={Math.ceil(filteredWeapons.length / itemsPerPage)} onPageChange={setCurrentPage}/>

    </TabsContent>
  );
};

export default InventoryWeapon;
