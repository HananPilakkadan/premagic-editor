import React from "react";
import { IoIosColorPalette } from "react-icons/io";

const ColorPicker = ({ colors, handleColorClick, textControl }) => {
  return (
    <div className="my-10">
      <h3 className="flex items-center text-lg">
        <IoIosColorPalette /> <span className="ml-2 ">Text Colors</span>
      </h3>
      <div className="flex gap-4 mt-4">
        {colors.map((color, index) => (
          <span
            key={index}
            className={`inline-block w-12 h-12 text-center leading-12 border-4 border-transparent cursor-pointer 
                      ${color.colorClass} ${color.textColor} ${
              textControl?.color === color.name ? "border-black " : ""
            }`}
            onClick={() => handleColorClick(color.name)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
