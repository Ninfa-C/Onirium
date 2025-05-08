import { useSelector } from "react-redux";
import { Card } from "../Generic/Cards";
import { Heart } from "react-bootstrap-icons";

const CharInfoSummary = () => {
  const character = useSelector((state) => state.selection);
  const {
    name,
    imagePreview,
    lifePoints,
    classAssignments,
    backgroundId,
    raceId,
    subraceId,
  } = character;
  const data = useSelector((state) => state.data);

  const totalLevel = classAssignments.reduce(
    (total, item) => total + item.levelinClass,
    0
  );

  return (
      <div className="relative h-35 bg-gradient-to-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
        <div className="relative z-10 h-full flex items-center px-8">
          <div className="flex items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/30">
              <img
                alt={name}
                className="object-cover absolute w-full h-full inset-0"
                src={imagePreview}
              />
            </div>
            <div className="ml-6 uppercase">                
              <h3 className="text-2xl font-serif text-gold">{name || "Nome"}</h3>
              <div className="flex items-center mt-1 text-stone-400 gap-1 text-sm">
              <p>LVL {totalLevel || 0}</p>
              <span className="mx-2">•</span>
                {raceId && (
                  <p className="">
                    {subraceId
                      ? data.race
                          .find((r) => r.id === raceId)
                          ?.subraces?.find((s) => s.id === subraceId)?.name
                      : raceId
                      ? data.race.find((r) => r.id === raceId)?.name
                      : "razza"}
                  </p>
                ) || `Razza`}
                <span className="mx-2">•</span>
                <span>
                  {backgroundId && (
                    <p className="inline ml-2">
                      {data.background.find((r) => r.id === backgroundId)?.name}
                    </p>
                  ) || `Background`}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center" title="Punti ferita totali">
                  <Heart className="h-5 text-red-900 mr-1" />
                  {lifePoints}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CharInfoSummary;
