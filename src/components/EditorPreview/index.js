import React from "react";
import EditImagePreview from "./EditImagePreview";
import RecentImagePreview from "./RecentImagePreview";
import { CiExport, CiImageOn } from "react-icons/ci";
import {} from "react-icons/ci";
import Header from "../Header";
import "./EditorPreview.css";
import { useEditorPreview } from "./useEditorPreview";
import { useEditorControls } from "../EditorControls/useEditorControls";

const EditorPreview = () => {
  const { status, loadNewImage, newImageData, recentImages, handleGoToRecent } =
    useEditorPreview();
  console.log(recentImages);
  const {
    canvasRef,
    downloadImage,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useEditorControls();
  return (
    <>
      <Header />
      <div className="w-2/4 p-10 h-screen scrollbar-thin overflow-y-scroll">
        <div className="w-full flex items-center  justify-between py-10">
          {newImageData && (
            <>
              <div className="border border-solid border-gray-300 py-2 px-10 rounded truncate overflow-hidden whitespace-nowrap text-ellipsis w-[300px]">
                <span>{newImageData?.slug ?? "untitled image"}</span>
              </div>
              <div className="flex items-center">
                <button
                  className="flex items-center border-1 border-solid border-secondary-color py-2 px-10 rounded text-secondary-color  hover:shadow-lg hover:opacity-85 transition duration-300 ease-in-out mr-2"
                  onClick={downloadImage}
                >
                  <CiExport /> <span className="ml-2">Save </span>
                </button>
                <button
                  className="flex items-center bg-secondary-color border-2 border-solid border-transparent py-2 px-10 rounded text-white shadow-md hover:shadow-lg hover:opacity-85 transition duration-300 ease-in-out "
                  onClick={loadNewImage}
                >
                  <CiImageOn /> <span className="ml-2">New</span>
                </button>
              </div>
            </>
          )}
        </div>
        <EditImagePreview
          canvasRef={canvasRef}
          status={status}
          newImageData={newImageData}
          loadNewImage={loadNewImage}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
        />
        {recentImages?.length > 0 && (
          <div className="py-10">
            <h5 className="mb-4">Recent Images</h5>
            <div className="flex items-center justify-start gap-2">
              {recentImages?.map((image) => (
                <RecentImagePreview
                  image={image}
                  handleGoToRecent={handleGoToRecent}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditorPreview;
