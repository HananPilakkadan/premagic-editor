import React from "react";
import Loader from "../../Loader";
import { CiImageOn } from "react-icons/ci";

const EditImagePreview = ({ status, newImageData, loadNewImage }) => {
  return (
    <div className="w-full border-2 border-solid border-gray-300 rounded p-2 min-h-72 flex items-center justify-center">
      {status === "loading" ? (
        <Loader />
      ) : newImageData?.urls?.regular ? (
        <figure className="flex items-center justify-center w-full h-full">
          <img
            src={newImageData?.urls?.regular}
            alt=""
            className="w-full h-full max-w-lg max-h-lg object-contain"
            style={{ maxWidth: "400px", maxHeight: "400px" }}
          />
        </figure>
      ) : (
        <div className="text-center">
          <p className="mb-2">Image is not selected!</p>
          <button
            className="flex items-center bg-secondary-color border-2 border-solid border-transparent py-2 px-10 rounded text-white shadow-md hover:shadow-lg hover:opacity-85 transition duration-300 ease-in-out "
            onClick={loadNewImage}
          >
            <CiImageOn /> <span className="ml-2">Add Image</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EditImagePreview;
