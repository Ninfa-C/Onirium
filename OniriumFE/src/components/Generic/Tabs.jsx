import React, { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = ({ value, onValueChange, children, className }) => {
  return (
    <TabsPrimitive.Root value={value} onValueChange={onValueChange} className={className}>
      {children}
    </TabsPrimitive.Root>
  );
};

const TabsList = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`h-10 bg-muted p-1 text-muted-foreground ${className || ""}`}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`hover:cursor-pointer inline-flex items-center justify-center tracking-wider font-extralight px-3 py-1.5 opacity-75 focus-visible:outline-none data-[state=active]:shadow-lg transition-all duration-200 ${className || ""}`}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ""}`}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
