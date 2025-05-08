import { useDispatch, useSelector } from "react-redux";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import { Stars } from "react-bootstrap-icons";
import * as SpellSchoolIcons from "../../assets/icons/spellSchool";
import * as SpellDamage from "../../assets/icons/dmgType";
import { Rituale } from "../../assets/icons/generic";
import {
  A2,
  B2,
  Distance,
  Istant,
  R2,
  Round,
  Self,
  Time,
  Touch,
} from "../../assets/icons/action";

const SingleEnchantment = ({ spell }) => {
  const dispatch = useDispatch();
  const selectedSpells = useSelector((state) => state.selection.selectedSpells);

  const isSelected = selectedSpells.some((s) => s.SpellId === spell.id);


  const handleChange = () => {
    let updated;
    if (isSelected) {
      updated = selectedSpells.filter((s) => s.SpellId !== spell.id);
    } else {
      updated = [
        ...selectedSpells,
        {
          SpellId: spell.id,
          SpellLevel: parseInt(spell.level) || 0,
          IsPrepared: true,
        },
      ];
    }
    dispatch(updateCharacterInfo({ selectedSpells: updated }));
  };

  const SchoolIcon = SpellSchoolIcons[spell.school];

  const renderActionIcon = (cost) => {
    switch (cost?.toLowerCase()) {
      case "azione":
        return <A2 className="h-4 w-4 " />;
      case "bonus":
        return <B2 className="h-4 w-4 " />;
      case "reazione":
        return <R2 className="h-4 w-4 " />;
      case "istantanea":
        return <Istant className="h-4 w-4 " />;
      case "1 round":
        return <Round className="h-4 w-4 " />;
      default:
        return (
          <>
            <Time className="h-4 w-4 " /> {cost}
          </>
        );
    }
  };

  const renderRangenIcon = (cost) => {
    switch (cost?.toLowerCase()) {
      case "contatto":
        return <Touch className="h-4 w-4 " />;
      case "personale":
        return <Self className="h-4 w-4 " />;
      default:
        return (
          <>
            <Distance className="h-3 w-3 " /> {cost}
          </>
        );
    }
  };

  return (
    <div
      className={`flex p-3 rounded-md cursor-pointer transition-colors gap-3 ${
        isSelected
          ? "border border-gold"
          : "bg-bg-secondary border border-gray-700 hover:border-gray-600"
      }`}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={`checkbox-${spell.id}`}
          className="peer hidden"
          checked={isSelected}
          onChange={handleChange}
        />
        <label
          htmlFor={`checkbox-${spell.id}`}
          className="w-4 h-4 border-1 flex items-center mt-1 justify-center cursor-pointer border-gold peer-checked:bg-gold peer-checked:border-gold peer-hover:border-gold"
        >
          {isSelected && (
            <svg
              className="w-4 h-4 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </label>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium">{spell.name}</h3>            
          </div>
          <div className="flex gap-2">
            <span title={spell.school}>
              {SchoolIcon && <SchoolIcon className="w-4 h-4 text-gold" />}
            </span>
            {spell.isRitual && (
              <span title="Rituale">
                <Rituale className="text-violet-400 w-4 h-4" />{" "}
              </span>
            )}
          </div>
        </div>
        {spell.classes.length > 0 && (
          <p className="text-sm text-gold">
            {spell.classes.map((cls, i) => (
              <span key={i}>
                {cls.name}
                {i < spell.classes.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}

        <p className="text-xs mt-1">
          Tempo di lancio:{" "}
          <span className="text-sm mt-1 text-gray-400">{spell.cost}</span>
        </p>
        <p className="text-xs">
          Gittata:{" "}
          <span className="text-sm mt-1 text-gray-400">{spell.range}</span>
        </p>
        <p className="text-xs">
          Componenti:{" "}
          <span className="text-sm mt-1 text-gray-400">{spell.components}</span>
        </p>
        <p className="text-xs mb-3">
          Durata:{" "}
          <span className="text-sm mt-1 text-gray-400">
            {" "}
            {spell.isConcentration && `Concentrazione, fino a `}
            {spell.duration}
          </span>
        </p>

        <p className="text-xs mb-2">{spell.description}</p>
        {spell.damage?.length > 0 && (
          <p className="text-xs text-gold mb-1">
            Danni:{" "}
            {spell.damage.map((d, i) => (
              <span key={i}>
                {d.damageDice} {d.damageType}
                {i < spell.damage.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}

        <p className="text-sm flex items-center gap-1">
          Riassunto:
          <span title={spell.cost}  className="flex items-center gap-1">{renderActionIcon(spell.cost)}</span>|
          <span title={`Gittata: ${spell.range}`} className="flex items-center gap-1">
            {renderRangenIcon(spell.range)}
          </span>
          |
          <span title={`Durata: ${spell.duration}`} className="flex items-center gap-1">
            {renderActionIcon(spell.duration)}
          </span>
          {spell.isRitual && (
            <>
              |
              <span title="Rituale">
                <Rituale className="text-violet-400 w-4 h-4" />{" "}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SingleEnchantment;
