import { useDispatch, useSelector } from "react-redux";
import {
  addText,
  fetchImage,
  handleRecentImageFlag,
  recentImageHandler,
  resetControls,
  takeFromRecent,
} from "../../store/slices/editingSlice";
import { toast } from "sonner";

export const useEditorPreview = () => {
  const dispatch = useDispatch();
  const {
    status,
    newImageData,
    recentImages,
    editorControls,
    editedImage,
    textControl,
  } = useSelector((state) => state.editor);

  const loadNewImage = () => {
    dispatch(resetControls());
    dispatch(handleRecentImageFlag());

    dispatch(fetchImage())
      .then((result) => {
        if (result?.error && result?.payload) {
          toast.error("The API limit has been reached!");
        }
      })
      .catch((error) => {});
    if (newImageData) {
      const updatedImageData = {
        ...newImageData,
        editorControls: editorControls,
        editedImage: editedImage,
        textControl: textControl,
      };
      dispatch(addText({ text: "" }));
      dispatch(recentImageHandler(updatedImageData));
    }
  };
  const handleGoToRecent = (image) => {
    const updatedImageData = {
      ...newImageData,
      editorControls: editorControls,
      editedImage: editedImage,
      textControl: textControl,
    };

    dispatch(takeFromRecent({ image, updatedImageData }));
  };

  return { status, loadNewImage, newImageData, recentImages, handleGoToRecent };
};
