import React from "react";

const BlackScreen = ({ top = 45, height = "C_hight" }) => {
  return (
    <div
      className={`absolute top-[${top}px] left-0 w-full h-[${height}vh] bg-black opacity-50`}
    ></div>
  );
};

export default BlackScreen;
