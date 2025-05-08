import { useDispatch, useSelector } from "react-redux";
import { updateCharacterInfo } from "../../redux/slices/selectionSlice";
import { Info } from "react-bootstrap-icons";

const SingleAbility = ({ skill, stat }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.selection.selectedSkills);
  const backgroundId = useSelector((state) => state.selection.backgroundId);
  const backgrounds = useSelector((state) => state.data.background);

  const background = backgrounds.find((b) => b.id === backgroundId);

  const isProficient = skills.find((s) => s.id === skill.id)?.isProficiency || false;
  const isFromBackground = background?.skills?.some((s) => s.name === skill.name);

  const handleChange = () => {
    if (isFromBackground) return;
    const updatedSkills = skills.map((s) =>
      s.id === skill.id ? { ...s, isProficiency: !isProficient } : s
    );

    dispatch(updateCharacterInfo({ selectedSkills: updatedSkills }));
  };

  return (
    <div className="flex items-start gap-3 bg-second-background p-4 rounded-xl shadow hover:shadow-lg border border-gray-700">
      <div className="relative">
        <input
          type="checkbox"
          id={`checkbox-${skill.id}`}
          className="peer hidden"
          checked={isProficient}
          onChange={handleChange}
          disabled={isFromBackground}
        />
        <label
          htmlFor={`checkbox-${skill.id}`}
          className={`w-4 h-4 border-1 flex items-center justify-center cursor-pointer mt-1.5 border-gold peer-checked:bg-gold peer-checked:border-gold peer-hover:border-gold
            ${isFromBackground
              ? "bg-gold cursor-not-allowed opacity-30"
              : ""}`}
        >
          {(isProficient || isFromBackground) && (
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
        <div className="flex items-center gap-2">
          <h3 className="text-lg">{skill.name}</h3>
          <span className="text-gold font-light text-sm">
            ({stat || "??"})
          </span>
          <Info
            size={18}
            className="text-gray-400 cursor-pointer"
            title={skill.stat + (isFromBackground ? ' — Ottenuta dal background' : '')}
          />
        </div>
        <p className="text-sm text-zinc-400">{skill.description}</p>
      </div>
    </div>
  );
};

export default SingleAbility;
