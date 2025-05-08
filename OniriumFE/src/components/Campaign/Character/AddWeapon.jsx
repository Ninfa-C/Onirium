import * as WeaponIcons from "../../../assets/icons/weapon";
import { ScrollArea } from "radix-ui";
import { Weapon } from "../../../assets/icons/generic";
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
} from "../../../assets/icons/dmgType";
import SearchBar from "../../Generic/SearchBar";
import Pagination from "../../Generic/Pagination";
import { fetchItemsByCategory } from "../../../redux/slices/dataSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dash, Plus } from "react-bootstrap-icons";
import { useMediaQuery } from 'react-responsive'

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

const AddWeapon = ({ data, setData }) => {
  const [search, setSearch] = useState("");
  const dataWeapon = useSelector((state) => state.data.item.arma);
  const dispatch = useDispatch();

  const isItemSelected = (id) =>
    data?.some((item) => item.ItemId === id) || false;

  const getWeaponIcon = (weaponName) => {
    const name = weaponName.toLowerCase();
    if (iconMap[name]) return iconMap[name];
    const fallback = Object.keys(iconMap).find((key) => name.includes(key));
    return fallback ? iconMap[fallback] : Weapon;
  };

  const lg = useMediaQuery({ query: '(min-width: 1024px)' })

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
  const itemsPerPage = 8;

  const filteredWeapons =
    dataWeapon?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const paginatedWeapons = lg
    ? filteredWeapons.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredWeapons; 


  const handleItemClick = (item) => {
    
    setData((prevData) => {
        const validData = Array.isArray(prevData) ? prevData : [];
      const existingItem = validData?.find(
        (dataItem) => dataItem?.ItemId === item.id
      );
      if (existingItem) {
        return validData;
      } else {
        return [...validData, { ItemId: item.id, Quantity: 1 }];
      }
    });
  };

  const handleIncrementQuantity = (item) => {
    setData((prevData) => {
      const existingItem = prevData?.find(
        (dataItem) => dataItem.ItemId === item.id
      );
      if (existingItem) {
        return prevData.map((dataItem) =>
          dataItem.ItemId === item.id
            ? { ...dataItem, Quantity: dataItem.Quantity + 1 }
            : dataItem
        );
      } else {
        return [...prevData, { ItemId: item.id, Quantity: 1 }];
      }
    });
  };

  const handleDecrementQuantity = (item) => {
    setData((prevData) => {
      return prevData
        .map((dataItem) =>
          dataItem.ItemId === item.id
            ? {
                ...dataItem,
                Quantity: dataItem.Quantity > 1 ? dataItem.Quantity - 1 : 0,
              }
            : dataItem
        )
        .filter((dataItem) => dataItem.Quantity > 0);
    });
  };
  useEffect(() => {
    dispatch(fetchItemsByCategory("arma"));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      {" "}
      <SearchBar value={search} onChange={setSearch} />
      <ScrollArea.Root className="h-[45vh] overflow-hidden rounded">
        <ScrollArea.Viewport className="size-full rounded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                  <div
                    className="flex justify-between flex-1"
                    onClick={() => handleItemClick(item)}
                  >
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
                        </span>{" "}
                        -{" "}
                        <span>
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
                          </p>
                        );
                      })}

                      <p className="text-xs">{item.description}</p>
                    </div>
                  </div>
                  {isItemSelected(item.id) && (
                    <div className="flex items-center justify-end gap-2">
                      <Dash
                        className="cursor-pointer text-gold"
                        onClick={() => handleDecrementQuantity(item)}
                      />
                      <p className="text-gold font-semibold">
                        {
                          data.find((dataItem) => dataItem.ItemId === item.id)
                            ?.Quantity
                        }
                      </p>{" "}
                      <Plus
                        className="cursor-pointer text-gold"
                        onClick={() => handleIncrementQuantity(item)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
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
      {lg &&
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredWeapons.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />}
      
    </>
  );
};

export default AddWeapon;
