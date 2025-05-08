import { ButtonDecor } from "../../assets/decoration";
import { cn } from "../../utils/utils";

const CustomButton = ({ children, className, color, ...props }) => {
  return (
    <button
      className={`rounded-lg 
        relative overflow-hidden
        flex items-center justify-center
        transition-colors duration-200
        focus:outline-none  ${className || ""}`}
      {...props}
    >
      <ButtonDecor
        className={`${color || "text-gold"} h-full w-full opacity-35 absolute`}
      />
      <span className="text-white font-medium text-[1.2em]">{children}</span>
    </button>
  );
};

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm hover:cursor-pointer h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}

    </button>
  );
};
export { CustomButton, Button };
