import React from "react";
import { MdTextFields } from "react-icons/md";

const CustomText = ({ text, handleChange, handleAddText, newImageData }) => {
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
          value={text}
          placeholder="Add custom text"
          onChange={handleChange}
          className="w-full py-2 p-2 h-[60px] rounded"
        />
        <div className="mt-2 flex justify-end">
          <button
            disabled={!newImageData || newImageData.length === 0}
            className={`border border-solid p-2 px-8 rounded transition duration-300 ease-in-out ${
              !newImageData || newImageData.length === 0
                ? "bg-gray-200 text-gray-800 pointer-events-none opacity-5"
                : "hover:bg-gray-200 hover:text-gray-800"
            }`}
            onClick={handleAddText}
          >
            Add Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomText;
