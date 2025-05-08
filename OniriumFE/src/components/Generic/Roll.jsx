import { useEffect, useState } from "react";
import { RollDices } from "../../assets/icons/action";
import { getDiceInstance } from "../../utils/diceService";
import { useDispatch, useSelector } from "react-redux";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";

// Dati HP per classi
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

const Roll = ({ className, ...props }) => {
  const character = useSelector((state) => state.selection);
  const dataClasses = useSelector((state) => state.data.class);
  const dataStats = useSelector((state) => state.data.stat);
  const stats = useSelector((state) => state.selection.stats);
  const boosts = useSelector((state) => state.selection.startingBoost);
  const dispatch = useDispatch();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    getDiceInstance().then(() => setReady(true));
  }, []);

  const getModCostituzione = () => {
    const costituzioneStat = dataStats.find(
      (s) => s.name?.toLowerCase() === "costituzione"
    );
    if (!costituzioneStat) return 0;

    const base = stats.find((s) => s.id === costituzioneStat.id)?.value || 0;
    const bonus = boosts.find((b) => b.id === costituzioneStat.id)?.value || 0;
    const totale = base + bonus;
    return Math.floor((totale - 10) / 2);
  };

  const handleRoll = async (e) => {
    e.preventDefault();
    const dice = await getDiceInstance();
    const modCost = getModCostituzione();
    const rolls = [];
    let fixedHp = 0;
    const classAssignments = character.classAssignments || [];
    classAssignments.forEach((cls, index) => {
      const classObj = dataClasses.find((c) => c.id === cls.id);
      const className = classObj?.name?.toLowerCase();
      const level = cls.levelinClass;
      const classInfo = classHitDiceData[className];
      if (!classInfo || !level || level <= 0) return;
      if (index === 0) {
        fixedHp += classInfo.fixed + modCost;
        if (level > 1) {
          rolls.push({
            qty: level - 1,
            sides: parseInt(classInfo.dice.slice(2)),
            modifier: modCost * (level - 1),
          });
        }
      } else {
        rolls.push({
          qty: level,
          sides: parseInt(classInfo.dice.slice(2)),
          modifier: modCost * level,
        });
      }
    });
    if (rolls.length === 0) {
      dispatch(updateCharacterInfo({ lifePoints: fixedHp }));
      return;
    }
    dice.show().roll(rolls);
    dice.onRollComplete = (results) => {
      let rolledHp = 0;
      results.forEach((roll) => {
        const base = roll.rolls.reduce((sum, r) => sum + r.value, 0);
        const total = base + (roll.modifier || 0);
        rolledHp += total;
      });
      const total = fixedHp + rolledHp;
      dispatch(updateCharacterInfo({ lifePoints: total }));
    };
  };

  const modCost = getModCostituzione();
  const previewDetails = character.classAssignments?.map((cls, index) => {
    const classObj = dataClasses.find((c) => c.id === cls.id);
    const className = classObj?.name?.toLowerCase();
    const level = cls.levelinClass;
    const info = classHitDiceData[className];
    if (!info || !level) return null;
    const parts = [];
    if (index === 0) {
      parts.push(
        `${classObj.name} (lvl ${level}): ${info.fixed} + ${modCost} = ${
          info.fixed + modCost
        }`
      );
      if (level > 1) {
        parts.push(`Tira ${level - 1}x ${info.dice} + ${modCost} per livello`);
      }
    } else {
      parts.push(
        `${classObj.name} (lvl ${level}): ${level} x ${info.dice} + ${modCost} per livello`
      );
    }

    return (
      <li key={cls.id} className="text-xs text-gray-400 ml-1">
        {parts.map((p, i) => (
          <div key={i}>{p}</div>
        ))}
      </li>
    );
  });

  return (
    <div>
      <div className="flex gap-1 items-center">
        <p className="text-sm "> Ti senti fortunato?</p>
        <button
          disabled={!ready}
          onClick={handleRoll}
          type="button"
          className={`cursor-pointer rounded-sm 
        flex items-center justify-center
        transition-colors duration-200
        focus:outline-none text-sm px-3 py-1 border-1 border-zinc-800 hover:border-gold ${
          className || ""
        }`}
          {...props}
        >
          <RollDices className="h-4" />
          <span className="text-white font-medium ml-1">Roll</span>
        </button>
      </div>
      {previewDetails?.length > 0 && (
        <ul className="mt-2 space-y-1 list-none">{previewDetails}</ul>
      )}
    </div>
  );
};

export default Roll;
