import { useEffect, useState } from "react";
import { TabsContent } from "../Generic/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByCategory } from "../../redux/slices/dataSlice";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import { Weapon } from "../../assets/icons/generic";
import SearchBar from "../Generic/SearchBar";
import { ExclamationCircle, ExclamationTriangle, Info } from "react-bootstrap-icons";
import Pagination from "../Generic/Pagination";

const InventoryArmor = () => {
  const [search, setSearch] = useState("");
  const dataArmor = useSelector((state) => state.data.item.armatura);
  const selectedItems = useSelector((state) => state.selection.selectedItems);
  const dispatch = useDispatch();

  const isItemSelected = (id) =>
    selectedItems.some((item) => item.ItemId === id) || false;

  const toggleItem = (item) => {
    const exists = selectedItems.find((i) => i.ItemId === item.id);
    const updated = exists
      ? selectedItems.filter((i) => i.ItemId !== item.id)
      : [...selectedItems, { ItemId: item.id, Quantity: 1, IsEquiped: true }];
    dispatch(updateCharacterInfo({ selectedItems: updated }));
  };

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered =
    dataArmor?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const paginatedArmors = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchItemsByCategory("armatura"));
  }, [dispatch]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <TabsContent value="armor" className="mt-0 container-fluid ">
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paginatedArmors.map((item) => {
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
                    <span>{item.name}</span>
                    <Info
                      size={18}
                      className="text-gray-400 cursor-pointer"
                      title={item.description}
                    />
                  </div>
                  <p className="text-xs text-secondary">
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
                    <p className="flex items-center gap-1 text-xs rounded-full bg-dark-lighter py-0.5 px-2.5 font-semibold text-gold border border-gold/40">
                      CA {item.armorClass}
                    </p>
                   
                  
                  <div className="flex items-center gap-1"> 
                  <p className="text-xs">{item.armorType}</p>
                    {item.requirements.length > 0 &&
                      item.requirements.map((req, i) => (
                        <ExclamationCircle
                          key={i}
                          title={`Senza almeno ${req.minimumValue} in Forza, il peso di quest’armatura piegherà le tue ginocchia.`}
                          size={11}
                          className="cursor-pointer text-gold"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filtered.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </TabsContent>
  );
};

export default InventoryArmor;
