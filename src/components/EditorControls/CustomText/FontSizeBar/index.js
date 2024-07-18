import React from "react";
import { MdOutlineTextFields } from "react-icons/md";

const FontSizeBar = ({ textControl, handleFontSize }) => {
  return (
    <div className="my-10">
      <h3 className="flex items-center text-lg">
        <MdOutlineTextFields />
        <span className="ml-2 ">Text Size</span>
      </h3>
      <div className="flex gap-4 mt-4">
        <div className="input w-full mb-4">
          <div className="flex items-center justify-between"></div>
          <input
            type="range"
            min="0"
            max="150"
            value={textControl?.fontSize}
            step={1}
            onChange={(e) => handleFontSize(e.target.value)}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 
      `}
          />
        </div>
      </div>
    </div>
  );
};

export default FontSizeBar;
