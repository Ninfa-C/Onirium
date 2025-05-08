import { useState, useEffect } from "react";
import { ChevronDown, Clock } from "react-bootstrap-icons";
import { Select } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import { cn } from "../../utils/utils";

const generateTimeOptions = (step = 30, from = 8, to = 24) => {
  const options = [];
  for (let h = from; h <= to; h++) {
    for (let m = 0; m < 60; m += step) {
      const hour = String(h).padStart(2, "0");
      const minute = String(m).padStart(2, "0");
      options.push(`${hour}:${minute}`);
    }
  }
  return options;
};

export default function TimePicker({ value, onChange, className }) {
  const [selected, setSelected] = useState(value || "");

  useEffect(() => {
    if (value !== selected) {
      setSelected(value);
    }
  }, [value]);

  return (
    <Select.Root   
      value={selected}
      onValueChange={(time) => {
        setSelected(time);
        onChange && onChange({ target: { value: time } });
      }}
    >
      {console.log(value)}

      <Select.Trigger
        className={cn("flex items-center rounded-md bg-second-background outline-none relative w-full border border-gray-700 hover:border-gold gap-10 py-2", className)}
        aria-label="seleziona ora"
      >
        <Select.Icon>
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
        </Select.Icon>
        <Select.Value placeholder="-- : --" />
        <Select.Icon>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-second-background shadow-lg z-50">
          <Select.Viewport className="p-[5px] overflow-y-auto border border-gold/20 rounded-md">
            {generateTimeOptions().map((t) => (
              <Select.Item
                className="relative flex select-none items-center px-10 py-3 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gold/40 data-[highlighted]:outline-none"
                key={t}
                value={t}
              >
                <Select.ItemText>{t}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
