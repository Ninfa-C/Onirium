import { useDispatch, useSelector } from "react-redux";
import {
  Carisma,
  Costituzione,
  Destrezza,
  Forza,
  Intelligenza,
  Saggezza,
} from "../../assets/icons/action";
import { TabsContent } from "../Generic/Tabs";
import { increaseStat, decreaseStat } from "../../redux/slices/selectionSlice";
import HitPoints from "./HitPoints";
import StartingBoostSelector from "./StartingBoostSelector ";
import CharHeader from "./CharHeader";

// Mappa tra nome della stat e l’icona corrispondente
const statIcons = {
  forza: Forza,
  destrezza: Destrezza,
  costituzione: Costituzione,
  intelligenza: Intelligenza,
  saggezza: Saggezza,
  carisma: Carisma,
};

const CharSkills = () => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.selection);
  const charStats = useSelector((state) => state.selection.stats);
  const dataStats = useSelector((state) => state.data.stat);

  return (
    <TabsContent value="attributes" className="mt-0 container-fluid ">
      <CharHeader
        title="Punti Abilità"
        description="Fornisci forza, astuzia e spirito al tuo eroe. Ogni punto speso forgia il destino: più grande è il dono, più alto è il prezzo. "
      />

      <div className="grid lg:grid-cols-2 items-baseline gap-10">
        <table className="border-collapse w-full table-auto text-left ">
          <thead className="border-b-gold">
            <tr className=" text-white opacity-75 uppercase">
              <th className="text-left pb-3">Abilità</th>
              <th className="text-center">Punteggio</th>
              <th className="text-center">Modificatore</th>
            </tr>
          </thead>
          <tbody>
            {charStats.length > 0 &&
              charStats.map((item) => {
                const statName = dataStats
                  .find((r) => r.id === item.id)
                  ?.name?.toLowerCase();
                const IconComponent = statName ? statIcons[statName] : null;
                const totalValue =
                  item.value +
                  (character.startingBoost.find((b) => b.id === item.id)
                    ?.value || 0);
                const mod = Math.floor((totalValue - 10) / 2);

                return (
                  <tr
                    key={item.id}
                    className="text-white hover:bg-dark cursor-pointer"
                  >
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 text-gold-light" />
                        )}
                        <p className=" text-sm mt-1">
                          {dataStats.find((r) => r.id === item.id)?.name}
                          {character.startingBoost?.some(
                            (b) => b.id === item.id
                          ) && (
                            <span className="ml-2 text-sm text-gold opacity-90">
                              (+
                              {
                                character.startingBoost.find(
                                  (b) => b.id === item.id
                                ).value
                              }
                              )
                            </span>
                          )}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => dispatch(decreaseStat(item.id))}
                          className="text-white px-2 py-1 rounded hover:text-gold cursor-pointer"
                        >
                          −
                        </button>
                        <span
                          className={`w-6 text-center ${
                            character.startingBoost.find(
                              (b) => b.id === item.id
                            )
                              ? "text-gold opacity-90"
                              : ""
                          }`}
                        >
                          {item.value +
                            (character.startingBoost.find(
                              (b) => b.id === item.id
                            )?.value || 0)}
                        </span>
                        <button
                          type="button"
                          onClick={() => dispatch(increaseStat(item.id))}
                          className="text-white px-2 py-1 rounded hover:text-gold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        {mod >= 0 ? "+" : ""}
                        {mod}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <StartingBoostSelector />
          <HitPoints />
        </div>
      </div>
    </TabsContent>
  );
};

export default CharSkills;
