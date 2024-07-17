import { toast } from "sonner";
import {
  resetControls,
  updateFilterValue,
} from "../../store/slices/editingSlice";
import { useDispatch, useSelector } from "react-redux";

export const useEditorControls = () => {
  const dispatch = useDispatch();
  const { editorControls } = useSelector((state) => state.editor);
  const handleChange = (id, newValue) => {
    dispatch(updateFilterValue({ id, newValue }));
  };
  const handleReset = () => {
    dispatch(resetControls());
    toast.success("All filters have been cleared!");
  };

  return { editorControls, handleChange, handleReset };
};
