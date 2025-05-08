import { useDispatch, useSelector } from "react-redux";
import { InputForm } from "../Generic/Form";
import Roll from "../Generic/Roll";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import { useEffect, useMemo } from "react";

// Mappa dei dati HP per classe
const classHitDiceData = {
  barbaro: { dice: "1d12", fixed: 12, avg: 7 },
  bardo: { dice: "1d8", fixed: 8, avg: 5 },
  chierico: { dice: "1d8", fixed: 8, avg: 5 },
  druido: { dice: "1d8", fixed: 8, avg: 5 },
  guerriero: { dice: "1d10", fixed: 10, avg: 6 },
  ladro: { dice: "1d8", fixed: 8, avg: 5 },
  mago: { dice: "1d6", fixed: 6, avg: 4 },
  monaco: { dice: "1d8", fixed: 8, avg: 5 },
  paladino: { dice: "1d10", fixed: 10, avg: 6 },
  ranger: { dice: "1d10", fixed: 10, avg: 6 },
  stregone: { dice: "1d6", fixed: 6, avg: 4 },
  warlock: { dice: "1d8", fixed: 8, avg: 5 },
  artefice: { dice: "1d8", fixed: 8, avg: 5 },
};

const HitPoints = () => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.selection);
  const selectedClasses = useSelector((state) => state.selection.selectedClass);
  const dataStats = useSelector((state) => state.data.stat);
  const stats = useSelector((state) => state.selection.stats);
  const boosts = useSelector((state) => state.selection.startingBoost);

  const totalLevels = character.classAssignments.reduce(
    (sum, cls) => sum + (cls.levelinClass || 0),
    0
  );

  // Modificatore di Costituzione
  const modCost = useMemo(() => {
    const costituzione = dataStats.find((s) => s.name?.toLowerCase() === "costituzione");
    const base = stats.find((s) => s.id === costituzione?.id)?.value || 0;
    const bonus = boosts.find((b) => b.id === costituzione?.id)?.value || 0;
    return Math.floor((base + bonus - 10) / 2);
  }, [stats, boosts, dataStats]);

  // Calcolo della media dei PF
  const { breakdown, total } = useMemo(() => {
    let total = 0;
    const breakdown = [];

    character.classAssignments.forEach((cls, index) => {
      const classObj = selectedClasses.find((c) => c.id === cls.id);
      const className = classObj?.name?.toLowerCase();
      const level = cls.levelinClass;
      const classData = classHitDiceData[className];
      if (!classData || !level) return;
  
      let line = `${classObj.name}: `;
      let classHP = 0;
  
      if (index === 0) {
        classHP += classData.fixed + modCost;
        line += `${classData.fixed} + ${modCost}`;
        if (level > 1) {
          const extra = (classData.avg + modCost) * (level - 1);
          classHP += extra;
          line += ` + ${level - 1} × (${classData.avg} + ${modCost})`;
        }
      } else {
        const extra = (classData.avg + modCost) * level;
        classHP += extra;
        line += `${level} × (${classData.avg} + ${modCost})`;
      }
  
      line += ` = ${classHP}`;
      breakdown.push(line);
      total += classHP;
    });
  
    return { breakdown, total };
  }, [character.classAssignments, modCost, selectedClasses]);

  // Imposta la vita al caricamento
  useEffect(() => {
    if (total > 0 && character.lifePoints !== total) {
      dispatch(updateCharacterInfo({ lifePoints: total }));
    }
  }, [total, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCharacterInfo({ [name]: value }));
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="lifePoints" className="text-white">
          Punti Ferita
        </label>
        <InputForm
          id="lifePoints"
          name="lifePoints"
          type="number"
          value={character.lifePoints}
          onChange={handleInputChange}
          min="1"
          className="text-white mt-1 no-spinner pl-3 ml-3 w-13 inline h-6 rounded-none hover:border-gold"
        />
      </div>
      <div className="text-sm text-gray-400 my-2 space-y-1">
        {breakdown.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      {totalLevels > 1 && <Roll />}
    </>
  );
};

export default HitPoints;
