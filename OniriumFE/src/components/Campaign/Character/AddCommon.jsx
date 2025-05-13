import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "../../Generic/Pagination";
import { ScrollArea } from "radix-ui";
import { Dash, Plus } from "react-bootstrap-icons";
import SearchBar from "../../Generic/SearchBar";
import { fetchItemsByCategory } from "../../../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const AddCommon = ({ data, setData }) => {
  const [search, setSearch] = useState("");
  const dataItems = useSelector((state) => state.data.item.oggettivari);
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.characterDetails.commonItems);

  const isItemSelected = (id) =>
    data.some((item) => item.ItemId === id) ||
    inventory.some((item) => item.item.id === id) ||
    false;

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const lg = useMediaQuery({ query: "(min-width: 1024px)" });

  const filtered =
    dataItems?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const paginatedItems = lg
    ? filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filtered;

  const handleItemClick = (item) => {
    setData((prevData) => {
      const validData = Array.isArray(prevData) ? prevData : [];
      const existingItem = validData?.find(
        (dataItem) => dataItem?.ItemId === item.id
      );
      if (existingItem) {
        return validData;
      } else {
        return [
          ...validData,
          { ItemId: item.id, Quantity: 1, IsEquiped: false },
        ];
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
    dispatch(fetchItemsByCategory("oggettivari"));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      <ScrollArea.Root className="h-[45vh] overflow-hidden rounded">
        <ScrollArea.Viewport className="size-full rounded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {paginatedItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`flex p-3 rounded-md cursor-pointer transition-colors gap-3 ${
                    isItemSelected(item.id)
                      ? "border border-gold"
                      : "bg-bg-secondary border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex-1" onClick={() => handleItemClick(item)}>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-base font-medium">{item.name}</span>

                      {item.effects && item.effects.length > 0 && (
                        <div className="md:flex gap-2 items-center">
                          {item.effects.map((effect, i) => (
                            <div key={i}>
                              {effect.effectType && (
                                <span
                                  className="flex items-center gap-1 text-xs rounded-full bg-dark-lighter py-0.5 px-2.5 font-semibold text-gold border border-gold/40"
                                  title={effect.description}
                                >
                                  {effect.effectType}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>{" "}
                    <p className="text-xs text-zinc-400">{item.description}</p>
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
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-violet-400 border-violet-400">
                        {item.rarity}
                      </p>
                      {item.requiresAttunement && (
                        <span className="text-xs text-red-400 italic">
                          Richiede sintonia
                        </span>
                      )}
                    </div>
                  </div>
                  {isItemSelected(item.id) && (
                    <div className="flex items-center justify-end gap-2">
                      <Dash
                        className="cursor-pointer text-gold"
                        onClick={() => handleDecrementQuantity(item)}
                      />
                      <p className="text-gold font-semibold">
                        {data.find((dataItem) => dataItem.ItemId === item.id)
                          ?.Quantity ||
                          inventory.find(
                            (invItem) => invItem.item.id === item.id
                          )?.quantity ||
                          0}
                      </p>
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
      {lg && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filtered.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AddCommon;
