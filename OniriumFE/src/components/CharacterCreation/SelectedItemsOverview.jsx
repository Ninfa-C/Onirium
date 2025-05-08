import { useDispatch, useSelector } from "react-redux";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import { Dash, Plus, ExclamationTriangle, XLg } from "react-bootstrap-icons";

const SelectedItemsOverview = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selection.selectedItems);
  const allItems = useSelector((state) => state.data.item);
  const stats = useSelector((state) => state.selection.stats);
  const dataStat = useSelector((state) => state.data.stat);
  const ForzaId = dataStat.find((s) => s.name === "Forza")?.id;
  const forza = stats.find((s) => s.id === ForzaId)?.value || 10;
  const maxWeight = forza * 7.5;

  const getItemById = (id) =>
    Object.values(allItems)
      .flat()
      .find((item) => item.id === id);

  const updateQuantity = (itemId, amount) => {
    const updated = selectedItems.map((i) =>
      i.ItemId === itemId
        ? { ...i, Quantity: Math.max(1, i.Quantity + amount) }
        : i
    );
    dispatch(updateCharacterInfo({ selectedItems: updated }));
  };

  const removeItem = (itemId) => {
    const updated = selectedItems.filter((i) => i.ItemId !== itemId);
    dispatch(updateCharacterInfo({ selectedItems: updated }));
  };

  const totalWeight = selectedItems.reduce((sum, si) => {
    const item = getItemById(si.ItemId);
    return item ? sum + item.weight * si.Quantity : sum;
  }, 0);

  return (
    <div className="p-4 bg-second-background rounded-md border border-gray-700 max-h-[550px]">
      <h4 className="text-gold mb-3">Equipaggiamento Selezionato</h4>
      <div className="relative">
        <div className="scrollable-container pr-2 max-h-[450px] overflow-y-auto">
          <ul className="space-y-2  ">
            {selectedItems.map((si) => {
              const item = getItemById(si.ItemId);
              if (!item) return null;
              return (
                <li
                  key={si.ItemId}
                  className="flex items-center justify-between text-sm border-b-gold pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.weight} kg x {si.Quantity} ={" "}
                      <span className="text-white">
                        {item.weight * si.Quantity} kg
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(si.ItemId, -1)}
                      className="text-gold hover:text-white"
                    >
                      <Dash size={14} />
                    </button>
                    <span>{si.Quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(si.ItemId, 1)}
                      className="text-gold hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(si.ItemId)}
                      className="text-red-400 hover:text-red-600 text-xs ml-3"
                    >
                      <XLg />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-gray-400">
          Peso trasportato:{" "}
          <span
            className={`${
              totalWeight > maxWeight ? "text-red-500" : "text-white"
            }`}
          >
            {totalWeight.toFixed(1)} / {maxWeight} kg
          </span>
        </p>
        {totalWeight > maxWeight && (
          <ExclamationTriangle
            className="text-red-500"
            title="Stai trasportando troppo! Rallenterai i tuoi movimenti."
            size={18}
          />
        )}
      </div>
    </div>
  );
};

export default SelectedItemsOverview;
