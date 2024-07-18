import React from "react";

const RecentImagePreview = ({ image, handleGoToRecent }) => {
  return (
    <div
      className="cursor-pointer border-2 border-solid border-gray-300 rounded p-2 w-64 h-[350px]"
      onClick={() => handleGoToRecent(image)}
    >
      <figure className="flex justify-center overflow-hidden rounded">
        <img
          src={image?.editedImage ?? image.urls.regular}
          alt="Recent edit"
          className="w-full h-[250px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
      <span className="block mt-2 text-center">{image?.slug}</span>
    </div>
  );
};

export default RecentImagePreview;
