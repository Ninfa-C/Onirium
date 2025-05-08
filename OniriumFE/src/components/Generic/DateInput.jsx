import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { it } from "react-day-picker/locale";
import "react-day-picker/dist/style.css";
import { Calendar } from "react-bootstrap-icons";
import { cn } from "../../utils/utils";

const DateInput = ({ value, onChange, className }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState(value ? new Date(value) : undefined);

  const handleSelect = (date) => {
    setSelected(date);
    setShowPicker(false);
    onChange({ target: { value: date.toISOString().split("T")[0] } });
  };

  return (
    <div className="relative">
      <div
        onClick={() => setShowPicker(!showPicker)}
        className={cn(
          "flex items-center bg-second-background border border-gray-700 rounded-md hover:border-gold text-white p-2 cursor-pointer",
          className
        )}
      >
        <Calendar className="mr-2 h-5 w-5" />
        <span>
          {selected
            ? selected.toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "Seleziona una data"}
        </span>
      </div>

      {showPicker && (
        <div className="absolute z-50 bg-second-bg text-white border border-gold/30 mt-2 rounded shadow-lg capitalize">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={it}
            className="bg-dark border border-gold/30 p-4 shadow-lg"
            classNames={{
              today: `text-gold`,
              selected: `bg-gold/40 rounded-sm`,
              chevron: `fill-gold/60`,
              caption_label: "text-gold/60 font-medium",
              day: "hover:bg-gold/40 rounded-sm",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
