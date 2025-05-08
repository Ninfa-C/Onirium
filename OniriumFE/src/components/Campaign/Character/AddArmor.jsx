import Pagination from "../../Generic/Pagination";
import SearchBar from "../../Generic/SearchBar";
import { ScrollArea } from "radix-ui";
import { fetchItemsByCategory } from "../../../redux/slices/dataSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Dash, ExclamationCircle, Info, Plus } from "react-bootstrap-icons";

const AddArmor = ({ data, setData }) => {
  const [search, setSearch] = useState("");
  const dataArmor = useSelector((state) => state.data.item.armatura);
  const dispatch = useDispatch();

  const isItemSelected = (id) =>
    data?.some((item) => item.ItemId === id) || false;

  const lg = useMediaQuery({ query: "(min-width: 1024px)" });

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered =
    dataArmor?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const paginatedArmors = lg
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
        return [...validData, { ItemId: item.id, Quantity: 1, IsEquiped: false }];
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
    dispatch(fetchItemsByCategory("armatura"));
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
                  <div
                    className="flex justify-between flex-1"
                    onClick={() => handleItemClick(item)}
                  >
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
      {lg && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filtered.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default AddArmor;
