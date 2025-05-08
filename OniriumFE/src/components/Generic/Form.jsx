import { ChevronDown } from "react-bootstrap-icons";
import { cn } from "../../utils/utils";
import { Select } from "radix-ui";

const FormField = ({ label, children, htmlFor, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-white font-light uppercase text-sm"
      >
        {label}
      </label>
      {children}
    </div>
  );
};

const InputWithIcon = ({
  icon,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  inputClassName = "",
  id,
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-3 h-4 w-4 text-gray-500">{icon}</div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-2 pl-10 bg-dark-darker border border-gold/30 focus:white text-white placeholder:text-gray-500 flex h-10 w-full rounded-md text-sm  autofill:bg-yellow-200 ${inputClassName}`}
      />
    </div>
  );
};

const InputForm = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border bg-second-background border-gray-700 px-3 py-2 text-sm file:border-0 placeholder:text-muted-foreground",

        className
      )}
      {...props}
    />
  );
};

const CustomCheckbox = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="peer hidden"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`w-5 h-5 flex items-center justify-center cursor-pointer border border-gold rounded-sm transition
              peer-checked:bg-gold peer-checked:border-gold
              peer-hover:border-gold ${disabled ? "opacity-10 cursor-not-allowed" : "bg-dark"}`}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-black"
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
      {label && (
        <label
          htmlFor={id}
          className={cn("text-white cursor-pointer", className)}
        >
          {label}
        </label>
      )}
    </div>
  );
};

const SelectForm = ({
  className = "",
  placeholder = "Seleziona...",
  value,
  onChange,
  data,
}) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={cn(
          "flex items-center rounded-md bg-second-background outline-none relative border border-gray-700 hover:border-gold gap-10 py-2 text-sm px-2 truncate",
          className
        )}
        aria-label="seleziona"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-second-background shadow-lg z-50">
          <Select.Viewport className="p-[5px] overflow-y-auto border border-gold/20 rounded-md text-xs">
            {data().map((t, i) => (
              <Select.Item
                className="relative flex select-none items-center px-10 py-3 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gold/40 data-[highlighted]:outline-none text-xs"
                key={i}
                value={t.value}
              >
                <Select.ItemText className="text-xs">{t.value}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center text-xs"></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export { FormField, InputWithIcon, InputForm, CustomCheckbox, SelectForm };
