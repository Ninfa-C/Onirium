import { useDispatch, useSelector } from "react-redux";
import {
  swapStartingBoost,
  updateStartingBoost,
} from "../../redux/slices/selectionSlice";

const StartingBoostSelector = () => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.selection);
  const data = useSelector((state) => state.data);
  const dataStats = useSelector((state) => state.data.stat);

  const selectedRace = data.race.find((r) => r.id === character.raceId);
  const selectedSubrace = selectedRace?.subraces?.find(
    (s) => s.id === character.subraceId
  );

  const isUmanoComune =
    selectedRace?.name?.toLowerCase() === "umano" &&
    selectedSubrace?.name?.toLowerCase() === "comune";

  const handleBoostChange = (index, newId) => {
    dispatch(updateStartingBoost({ index, id: newId }));
  };
  const handleSwap = () => {
    dispatch(swapStartingBoost());
  };

  return (
    <div className=" lg:flex gap-4 w-full items-baseline justify-between mb-5">
      <h2 className="text-white col">Bonus iniziali:</h2>
      {isUmanoComune ? (
        <div className="flex items-center gap-4">
          <p className="text-gold-light font-medium">+2</p>
          <select
            value={character.startingBoost?.[0]?.id || ""}
            onChange={(e) => handleBoostChange(0, e.target.value)}
            className="text-sm rounded-md border border-gray-700 bg-second-background px-3 py-1 hover:border-gold"
          >
            <option value="">Seleziona un'abilità</option>
            {dataStats.map((stat) => (
              <option key={stat.id} value={stat.id}>
                {stat.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <p className="text-gold-light font-medium">+2</p>
            <select
              value={character.startingBoost?.[0]?.id || ""}
              onChange={(e) => handleBoostChange(0, e.target.value)}
              className="text-sm border border-gray-700 bg-second-background px-3 py-1 hover:border-gold w-max"
            >
              <option value="">Seleziona un'abilità</option>
              {dataStats
                .filter((stat) => stat.id !== character.startingBoost?.[1]?.id)
                .map((stat) => (
                  <option key={stat.id} value={stat.id}>
                    {stat.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={handleSwap}
            type="button"
            className="border border-gray-700 hover:border-gold w-15 transition disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:bg-transparent disabled:hover:border-gray-700 "
            title="Scambia"
            disabled={
              !character.startingBoost?.[0]?.id ||
              !character.startingBoost?.[1]?.id
            }
          >
            ⇄
          </button>
          <div className="flex items-center gap-4">
            <p className="text-gold-light font-medium">+1</p>
            <select
              value={character.startingBoost?.[1]?.id || ""}
              onChange={(e) => handleBoostChange(1, e.target.value)}
              className="text-sm border border-gray-700 bg-second-background px-3 py-1 hover:border-gold"
            >
              <option value="">Seleziona un'abilità</option>
              {dataStats
                .filter((stat) => stat.id !== character.startingBoost?.[0]?.id)
                .map((stat) => (
                  <option key={stat.id} value={stat.id}>
                    {stat.name}
                  </option>
                ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default StartingBoostSelector;
