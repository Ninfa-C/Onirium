import { cn } from "../../utils/utils";

const Card = ({className, ...props }) => (
    <div 
      className={cn("rounded-lg border bg-second-background",className) } 
      {...props} 
    />
  );
  
  const CardHeader = ({ className, ...props }) => (
    <div 
      className={cn("flex flex-col space-y-1.5 p-6 ", className)} 
      {...props} 
    />
  );
  
  const CardTitle = ({ className, ...props }) => (
    <h3 
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)} 
      {...props} 
    />
  );
  
  const CardDescription = ({ className, ...props }) => (
    <p 
      className={`text-sm text-muted-foreground ${className || ""}`} 
      {...props} 
    />
  );
  
  const CardContent = ({ className, ...props }) => (
    <div 
      className={cn("p-6",className )} 
      {...props} 
    />
  );
  
  const CardFooter = ({ className , ...props }) => (
    <div 
      className={cn("flex items-center pt-0",className)} 
      {...props} 
    />
  );
  
  export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };