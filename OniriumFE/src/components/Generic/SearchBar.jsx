import { Search } from "react-bootstrap-icons";
import { cn } from "../../utils/utils";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Cerca oggetti...",
  classname,
  classnameContainer
}) => {
  return (
    <div className={cn("flex items-center gap-2 bg-bg-secondary border border-gray-700 rounded-xl px-4 py-2 focus-within:border-gold transition-all my-5 bg-second-background",
      classnameContainer
    )}>
      <Search className="w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "bg-transparent outline-none placeholder-gray-500 text-sm w-full",
          classname
        )}
      />
    </div>
  );
};

export default SearchBar;
