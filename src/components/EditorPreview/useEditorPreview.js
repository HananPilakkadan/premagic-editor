import { useDispatch, useSelector } from "react-redux";
import {
  fetchImage,
  recentImageHandler,
} from "../../store/slices/editingSlice";

export const useEditorPreview = () => {
  const dispatch = useDispatch();
  const { status, newImageData, recentImages } = useSelector(
    (state) => state.editor
  );
  console.log(recentImages);

  const loadNewImage = () => {
    dispatch(fetchImage());
    if (newImageData) {
      dispatch(recentImageHandler(newImageData));
    }
  };

  return { status, loadNewImage, newImageData };
};
