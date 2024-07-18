import React from "react";
import { MdTextFormat } from "react-icons/md";

const FontFamily = ({ handleFontStyle }) => {
  return (
    <>
      <h3 className="flex items-center text-lg mb-2">
        <MdTextFormat />
        <span className="ml-2 "> Font Style</span>
      </h3>
      <select
        id="fontFamilySelect"
        onChange={handleFontStyle}
        className="w-[100%] p-3 rounded"
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Helvetica">Helvetica</option>
      </select>
    </>
  );
};

export default FontFamily;
