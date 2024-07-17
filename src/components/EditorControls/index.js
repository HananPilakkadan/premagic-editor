import React from "react";
import { GrMagic } from "react-icons/gr";
import { useEditorControls } from "./useEditorControls";
import ControlPanels from "./ControlPanels";
import CustomText from "./CustomText";
import "./EditorControl.css";

const EditorControls = () => {
  const { editorControls, handleChange, handleReset } = useEditorControls();
  return (
    <div className="fixed top-0 h-screen right-0 bg-slate-100 w-1/2 py-20 px-10">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center text-lg">
          <GrMagic /> <span className="ml-2"> Filters</span>
        </h3>
        <button
          class="border border-solid p-2 px-8 rounded hover:bg-gray-200 hover:text-gray-800 transition duration-300 ease-in-out"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <ControlPanels
        editorControls={editorControls}
        handleChange={handleChange}
      />
      <CustomText />
    </div>
  );
};

export default EditorControls;
