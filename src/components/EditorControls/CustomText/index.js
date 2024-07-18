import React from "react";
import { MdTextFields, MdDeleteOutline } from "react-icons/md";
import ColorPicker from "./ColorPicker";
import FontSizeBar from "./FontSizeBar";
import FontFamily from "./FontFamily";

const CustomText = ({
  handleChange,
  newImageData,
  newText,
  handleDeleteText,
  handleColorClick,
  colors,
  handleFontSize,
  handleFontStyle,
  textControl,
}) => {
  return (
    <div>
      <h3 className="flex items-center text-lg">
        <MdTextFields /> <span className="ml-2 ">Text</span>
      </h3>

      <div className="input w-full my-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="brightness-range"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
        </div>
        <input
          disabled={newImageData?.length === 0}
          id="custom-text"
          type="text"
          value={textControl?.text}
          placeholder="Add custom text"
          onChange={handleChange}
          className="w-full py-2 p-2 h-[60px] rounded"
        />
        {newText?.text && (
          <div className="flex items-center justify-between border border-solid border-2 border-zinc-200 rounded mt-4 p-2 px-4 text-lg">
            <span>{newText?.text}</span>
            <span onClick={handleDeleteText}>
              <MdDeleteOutline />
            </span>
          </div>
        )}

        {textControl?.text && (
          <>
            <ColorPicker
              textControl={textControl}
              colors={colors}
              handleColorClick={handleColorClick}
            />
            <div className="flex w-full items-center">
              <div className="w-1/2 pr-2">
                <FontSizeBar
                  textControl={textControl}
                  handleFontSize={handleFontSize}
                />
              </div>
              <div className="w-1/2 pl-2">
                <FontFamily handleFontStyle={handleFontStyle} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomText;
