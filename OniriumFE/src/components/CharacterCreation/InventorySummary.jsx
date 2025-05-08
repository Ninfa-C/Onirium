import { CircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const InventorySummary = () => {
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

  const totalWeight = selectedItems.reduce((sum, si) => {
    const item = getItemById(si.ItemId);
    return item ? sum + item.weight * si.Quantity : sum;
  }, 0);

  return (
    <div>
      <h4 className="text-gold mb-3 uppercase text-sm flex justify-between">
        Equipaggiamento{" "}
        <span
          className={`${
            totalWeight > maxWeight ? "text-red-500" : "text-gray-400"
          }`}
        >
          {totalWeight.toFixed(1)} / {maxWeight} kg
        </span>{" "}
      </h4>
      <div className="p-4 border border-gold/40 max-h-[550px] text-xs">
        <div className="relative">
          <div className="scrollable-container pr-2 max-h-[450px] overflow-y-auto">
            <ul className="space-y-2">
              {selectedItems.map((si) => {
                const item = getItemById(si.ItemId);
                if (!item) return null;
                return (
                  <li key={si.ItemId} className="pb-2">
                    <div className="flex justify-between">
                      {si.IsEquiped && (
                        <span title="Equipaggiato">
                          <CircleFill className="h-2 w-2 text-gold" />
                        </span>
                      )}
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        x {si.Quantity}
                        <span className="text-white ml-5">
                          {item.weight * si.Quantity} kg
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
