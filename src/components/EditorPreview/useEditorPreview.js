import { useDispatch, useSelector } from "react-redux";
import {
  fetchImage,
  goToRecent,
  recentImageHandler,
  takeFromRecent,
} from "../../store/slices/editingSlice";
import { useEffect } from "react";

export const useEditorPreview = () => {
  const dispatch = useDispatch();
  const { status, newImageData, recentImages, editorControls } = useSelector(
    (state) => state.editor
  );

  useEffect(() => {
    dispatch(fetchImage());
  }, []);
  const loadNewImage = () => {
    dispatch(fetchImage());
    if (newImageData) {
      const updatedImageData = { ...newImageData };
      for (const [value] of Object.entries(editorControls)) {
        console.log(value);
        updatedImageData[value?.id] = value;
      }
      console.log(updatedImageData, "updatedImageData");
      dispatch(recentImageHandler(updatedImageData));
    }
  };
  const handleGoToRecent = (image) => {
    dispatch(takeFromRecent(image));
    dispatch(recentImageHandler());
  };
  console.log(recentImages, "helloo");

  return { status, loadNewImage, newImageData, recentImages, handleGoToRecent };
};
