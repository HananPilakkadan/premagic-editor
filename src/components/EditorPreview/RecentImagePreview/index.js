import React from "react";

const RecentImagePreview = () => {
  return (
    <div className="border-2 border-solid border-gray-300 rounded p-2 w-64">
      <figure className="flex justify-center">
        <img
          src="https://picsum.photos/seed/picsum/250/250"
          alt="Recent edit"
          className="w-250 h-250 object-cover"
        />
      </figure>
      <span className="block mt-2 text-center">nature.jpg</span>
    </div>
  );
};

export default RecentImagePreview;
