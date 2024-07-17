import React from "react";
import { MdTextFields } from "react-icons/md";

const CustomText = () => {
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
          id="custom-text"
          type="text"
          //   value={input?.value}
          placeholder="Add custom text"
          //   onChange={(e) => handleChange(input.id, e.target.value)}
          className="w-full py-2 p-2 h-[60px] rounded"
        />
      </div>
    </div>
  );
};

export default CustomText;
