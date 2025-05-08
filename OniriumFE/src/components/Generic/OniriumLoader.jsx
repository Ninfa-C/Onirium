import { ECircle, ICircle, Runes } from "../../assets/decoration";
import { cn } from "../../utils/utils";

const OniriumLoader = ({ className, size = "md", text = "" }) => {
  const sizeClasses = {
    sm: "w-40 h-40",
    md: "w-60 h-60",
    lg: "w-80 h-80",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <div className="relative">

        <div className={cn("rounded-full animate-spin-slow opacity-90", sizeClasses[size])}>
           
          <Runes className="absolute h-full w-full text-white"/>
            
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ECircle className="absolute h-full w-full animate-spin-external" stroke="" />
            <ICircle className="absolute h-7/8 animate-spin-internal"/>
        </div>
      </div>

      <p
  className={cn(
    "mt-6 text-amber-200 font-serif italic transition-opacity duration-1000 tracking-widest whitespace-nowrap overflow-hidden",
    textSizeClasses[size]
  )}
>
  {text}{text && <span className="animate-dots"></span>}
</p>
    </div>
  );
};

export default OniriumLoader;
