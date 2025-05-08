/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { LineDecoration } from "../../assets/decoration";
import { Description } from "@headlessui/react";
import { useEffect } from "react";
import { fetchTraitPreview } from "../../redux/slices/dataSlice";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import { Proficient } from "../../assets/icons/action";
import { Circle } from "react-bootstrap-icons";

const CharTraitsSumary = () => {
  const character = useSelector((state) => state.selection);
  const dispatch = useDispatch();
  const { selectedTraits, selectedSkills } = character;
  const data = useSelector((state) => state.data);

  const traits = selectedTraits
    .map((item) => {
      const classData = data.traitsPreview.find((c) => c.id === item.id);
      return {
        name: classData.name || "",
        description: item.description,
        source: item.sourceNameIt,
      };
    })
    .filter(Boolean);

  const skills = selectedSkills
    .map((item) => {
      const classData = data.skills.find((c) => c.id === item.id);
      return {
        name: classData.name,
        isProficiency: item.isProficiency,
        stat: classData.stat,
      };
    })
    .filter(Boolean);

  const getColumnCount = (count) => Math.min(Math.ceil(count / 10), 4);
  const columns = getColumnCount(traits.length);

  const getModifierForTrait = (trait) => {
    const statName = trait.stat;
    if (!statName) return "";
    const stat = data.stat.find(
      (s) => s.name?.toLowerCase() === statName?.toLowerCase()
    );
    const statId = stat?.id;
    if (!statId) return "";

    const base = character.stats.find((s) => s.id === statId)?.value || 0;
    const boost =
      character.startingBoost.find((b) => b.id === statId)?.value || 0;
    const total = base + boost;
    const mod = Math.floor((total - 10) / 2);
    return mod >= 0 ? `+${mod}` : mod;
  };

  useEffect(() => {
    if (
      character.raceId &&
      character.backgroundId &&
      character.classAssignments.length > 0
    ) {
      dispatch(
        fetchTraitPreview({
          raceId: character.raceId,
          subraceId: character.subraceId,
          backgroundId: character.backgroundId,
          classAssignments: character.classAssignments,
        })
      ).then((action) => {
        if (action.payload) {
          const availableTraits = action.payload.filter(
            (trait) => trait.isAvailable
          );
          dispatch(updateCharacterInfo({ selectedTraits: availableTraits }));
        }
      });
    }
  }, [
    character.raceId,
    character.subraceId,
    character.backgroundId,
    character.classAssignments,
  ]);

  return (
    <div className="px-8 mb-8">
      <div className="flex items-center mb-6 px-8">
        <LineDecoration className="flex-grow h-1 ml-5 scale-x-[-1] " />
        <h4 className="font-serif text-gold whitespace-nowrap uppercase">
          abilità e tratti
        </h4>
        <LineDecoration className="flex-grow h-1 ml-5 " />
        {console.log(skills, traits)}
      </div>
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="space-y-3">
          <div className="p-4 grid grid-cols-2 gap-4 text-xs">
            {skills.map((item, i) => {
              return (
                <div
                  className="border-b border-stone-800 pb-2 flex justify-between items-center px-3"
                  key={i}
                >
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-white w-5">
                      {getModifierForTrait(item) == 0 ?  "0" : getModifierForTrait(item)}
                    </p>
                    <p className="font-medium col-span-3">{item.name}</p>
                  </div>
                  {item.isProficiency ? (
                    <Proficient className="h-4 w-4 text-gold" />
                  ) : (
                    <Circle className="h-4 w-4 text-gold" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`col-span-2 grid md:grid-cols-${columns} space-y-3`}>
          {traits.map((t) => (
            <div key={t.id} className="rounded-md">
              <div className="flex justify-between mb-2">
                <h4 className="text-gold text-sm">{t.name}</h4>
                <p className="text-xs text-gold px-2 py-0.5 bg-dark-lighter rounded-sm flex items-center">
                  {t.source}
                </p>
              </div>
              <p
                className="text-xs text-gray-400 line-clamp-1 leading-tight overflow-hidden"
                title={t.description}
              >
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharTraitsSumary;
