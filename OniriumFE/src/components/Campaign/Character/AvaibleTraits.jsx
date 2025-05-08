import { useEffect } from "react";

const AvaibleTraits = ({trait}) => {
  useEffect(() => {}, [trait]);

  return (
    <div key={trait.id} className="rounded-md">
      <div className="flex justify-between mb-2">
        <h4 className="text-gold text-sm">{trait.name}</h4>
        <p className="text-xs text-gold px-2 py-0.5 bg-dark-lighter rounded-sm flex items-center">
          {trait.source}
        </p>
      </div>
      <p
        className="text-xs text-gray-400 line-clamp-1 leading-tight overflow-hidden"
        title={trait.description}
      >
        {trait.description}
      </p>
    </div>
  );
};

export default AvaibleTraits;
