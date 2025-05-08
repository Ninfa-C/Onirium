import React from "react";
import { Corner } from "../../assets/decoration";

const Corners = () => {
  return (
    <>
      <div className="absolute top-1 right-53 z-0">
        <Corner className="text-gold/30 h-50 rotate-90" />
      </div>
      <div className="absolute top-1 left-53 z-0">
        <Corner className="text-gold/30 h-50 rotate-180" />
      </div>
      <div className="absolute bottom-0 left-53  z-0">
        <Corner className="text-gold/30 h-50 rotate-270" />
      </div>
      <div className="absolute bottom-0 right-53 z-0">
        <Corner className="text-gold/30 h-50" />
      </div>
    </>
  );
};

export default Corners;