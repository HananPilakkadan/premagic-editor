import React from "react";
import { GrMagic } from "react-icons/gr";
import { useEditorControls } from "./useEditorControls";
import ControlPanels from "./ControlPanels";
import CustomText from "./CustomText";
import "./EditorControl.css";
import { useEditorPreview } from "../EditorPreview/useEditorPreview";

const EditorControls = () => {
  const { newImageData } = useEditorPreview();
  const {
    editorControls,
    handleChange,
    handleReset,
    handleInputText,
    handleAddText,
    isRecentImage,
    textControl,
    handleDeleteText,
    handleColorClick,
    colors,
    handleFontSize,
    handleFontStyle,
  } = useEditorControls();
  console.log(editorControls, "editorControls");

  return (
    <div className="fixed top-0 h-screen right-0 bg-slate-100 w-1/2 py-20 px-10 z-10 overflow-scroll">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center text-lg">
          <GrMagic /> <span className="ml-2"> Filters</span>
        </h3>
        <button
          disabled={!newImageData || newImageData.length === 0}
          className={`border border-solid p-2 px-8 rounded transition duration-300 ease-in-out ${
            !newImageData || newImageData.length === 0
              ? "bg-gray-200 text-gray-800 pointer-events-none opacity-5"
              : "hover:bg-gray-200 hover:text-gray-800"
          }`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <ControlPanels
        newImageData={newImageData}
        editorControls={editorControls}
        handleChange={handleChange}
        isRecentImage={isRecentImage}
      />
      <CustomText
        newImageData={newImageData}
        handleChange={handleInputText}
        handleAddText={handleAddText}
        handleDeleteText={handleDeleteText}
        handleColorClick={handleColorClick}
        colors={colors}
        textControl={textControl}
        handleFontSize={handleFontSize}
        handleFontStyle={handleFontStyle}
      />
    </div>
  );
};

export default EditorControls;
