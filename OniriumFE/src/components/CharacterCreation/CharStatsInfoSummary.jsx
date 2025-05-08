import { useSelector } from "react-redux";
import {
  LineDecoration,
  MiddleDecor,
  RectangleDecor,
  SquareDecor,
} from "../../assets/decoration";

const CharStatsInfoSummary = () => {
  const characterStat = useSelector((state) => state.selection.stats);
  const character = useSelector((state) => state.selection);
  const {
    lifePoints,
    classAssignments,
    backgroundId,
    raceId,
    subraceId,
    selectedClass,
  } = character;
  const data = useSelector((state) => state.data);
  const characterstartingBoost = useSelector(
    (state) => state.selection.startingBoost
  );
  const dataStat = useSelector((state) => state.data.stat);
  const statsNames = characterStat
    .map((item) => {
      const classData = dataStat.find((c) => c.id === item.id);
      const boost = characterstartingBoost.find((c) => c.id === item.id)?.value;
      return {
        name: classData.name,
        value: item.value,
        boost: boost || 0,
      };
    })
    .filter(Boolean);

  return (
    <div>
      <div className="flex items-center mb-8">
        <LineDecoration className="flex-grow h-1 ml-5 scale-x-[-1] " />
        <h4 className="text font-serif text-gold whitespace-nowrap">
          STATISTICHE E CLASSI
        </h4>
        <LineDecoration className="flex-grow h-1 ml-5 " />
      </div>
      <div className={`grid grid-cols-${statsNames.length} gap-5 px-20`}>
        {statsNames.length > 0 &&
          statsNames.map((item) => {
            const totalValue =
              item.value +
              (characterstartingBoost.find((b) => b.id === item.id)?.value ||
                0);
            const modifier = Math.floor((totalValue - 10) / 2);
            return (
              <div
                key={item.name}
                className="relative flex flex-col items-center justify-center h-25 text-white"
              >
                <RectangleDecor className="absolute w-full h-full text-gold" />
                <div className="z-10 flex flex-col items-center">
                  <p className="text-sm font-light tracking-wide">
                    {item.name?.slice(0, 3).toUpperCase()}
                  </p>
                  <p className="text-3xl">{totalValue}</p>
                </div>
                <div className="absolute bottom-[-25px] z-20 flex items-center justify-center w-14 h-14">
                  <SquareDecor
                    className="absolute w-full h-full text-gold"
                    fill="#121212"
                  />
                  <p className="z-10 font-semibold text-sm">
                    {modifier >= 0 ? `+${modifier}` : modifier}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="grid grid-cols-2 p-8 gap-8 text-sm">
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-stone-800 pb-2">
            <span className="text-stone-400">Razza</span>
            {raceId && (
              <p className="">{data.race.find((r) => r.id === raceId)?.name}</p>
            )}
          </div>
          {subraceId && (
            <div className="flex justify-between items-center border-b border-stone-800 pb-2">
              <span className="text-stone-400">Sottorazza</span>
              <span>
                {
                  data.race
                    .find((r) => r.id === raceId)
                    ?.subraces?.find((s) => s.id === subraceId)?.name
                }
              </span>
            </div>
          )}
          <div className="flex justify-between items-center border-b border-stone-800 pb-2">
            <span className="text-stone-400">Background</span>
            {backgroundId && (
              <p>{data.background.find((r) => r.id === backgroundId)?.name}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-400">Punti Vita</span>
            <span className="text-red-900 font-medium">{lifePoints}</span>
          </div>
        </div>
        <div className="space-y-3">
          <p>{classAssignments.length > 1 ? `Classi:` : `Classe:`}</p>
          <div className="">
            {selectedClass.map((item, i) => {
              const classData = classAssignments.find((c) => c.id === item.id);
              return (
                <div className="border border-gold/40 p-4" key={i}>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-[#D4AF37] font-medium">
                      {classData.levelinClass}
                    </p>
                  </div>
                  {item.subclasses && item.subclasses.length > 0 && (
                    <p className="text-sm text-stone-400 mt-1">
                      Sottoclasse: {item.subclasses[0].name}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharStatsInfoSummary;
