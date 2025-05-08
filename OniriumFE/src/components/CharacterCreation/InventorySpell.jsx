import { useSelector } from "react-redux";

const InventorySpell = () => {
  const selectedSpells = useSelector((state) => state.selection.selectedSpells);
  const allSpells = useSelector((state) => state.data.spell);

  const getSpellById = (id) =>
    Object.values(allSpells)
      .flat()
      .find((item) => item.id === id);

  return (
    <div>
      <h4 className="text-gold mb-3 uppercase text-sm flex justify-between">
        incantesimi
      </h4>
      <div className="p-4 border border-gold/40 max-h-[550px] text-xs">
        <div className="relative">
          <div className="scrollable-container pr-2 max-h-[450px] overflow-y-auto">
            <ul className="space-y-2">
              {selectedSpells.map((si) => {
                const item = getSpellById(si.SpellId);
                if (!item) return null;
                return (
                  <li key={si.ItemId} className="pb-2">
                    <div className="flex justify-between">                     
                      <p className="font-medium">{item.name}</p>  
                      <div className="flex gap-2">
                      <p className="px-2 py-0.5 bg-dark-lighter">{item.level === "Trucchetto" ? item.level : `Liv. ${item.level}`}</p>                   
                    {si.IsPrepared ? <p className="px-2 py-0.5 bg-dark-lighter">Preparato</p> : ""}
                      </div>
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

export default InventorySpell;
