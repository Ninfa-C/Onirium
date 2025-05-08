import { useEffect, useState } from "react";
import { TabsContent } from "../Generic/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByCategory } from "../../redux/slices/dataSlice";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import SearchBar from "../Generic/SearchBar";
import Pagination from "../Generic/Pagination";

const InventoryGeneralItems = () => {
  const [search, setSearch] = useState("");
  
  const dataItems = useSelector((state) => state.data.item.oggettivari);
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered =
    dataItems?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchItemsByCategory("oggettivari"));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <TabsContent value="generic" className="mt-0 container-fluid">
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paginatedItems.map((item) => (
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
                className="w-4 h-4 border-1 flex items-center justify-center cursor-pointer border-gold peer-checked:bg-gold peer-checked:border-gold peer-hover:border-gold mt-1"
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

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400">{item.description}</p>

              {item.effects?.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-1">
                  {item.effects.map((effect, idx) => (
                    <span
                      key={idx}
                      title={effect.description}
                      className="text-xs bg-dark-lighter text-gold border border-gold/40 px-2 py-0.5 rounded-full"
                    >
                      {effect.effectType} {effect.value && `+${effect.value}`}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between text-xs text-secondary mt-2">
                <span>
                  <span className="font-semibold text-white">
                    {item.weight}
                  </span>{" "}
                  kg
                </span>
                <span>
                  <span className="font-semibold text-white">
                    {item.value}
                  </span>{" "}
                  mo
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filtered.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </TabsContent>
  );
};

export default InventoryGeneralItems;
