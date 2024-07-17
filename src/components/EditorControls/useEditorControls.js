import { toast } from "sonner";
import {
  addText,
  handleInputText,
  handleTextchange,
  resetControls,
  updateFilterValue,
  updateTextPosition,
} from "../../store/slices/editingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

export const useEditorControls = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [filterData, setFilterData] = useState(null);
  const [text, setText] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { editorControls, newImageData, newText } = useSelector(
    (state) => state.editor
  );
  console.log(newText);
  const handleChange = (id, newValue) => {
    dispatch(updateFilterValue({ id, newValue }));
  };
  const handleReset = () => {
    dispatch(resetControls());
    toast.success("All filters have been cleared!");
  };

  useEffect(() => {
    if (canvasRef.current) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = newImageData?.urls?.regular;
      image.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        const filters = editorControls
          .map((control) => `${control.id}(${parseInt(control.value)}%)`)
          .join("\n");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = filters;
        setFilterData(filters);
        console.log(filters);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(newText?.text, newText.position?.x, newText?.position?.y);
      };
    }
  }, [newImageData, editorControls, newText]);

  const getMetadata = () => {
    return JSON.stringify(filterData, null, 2);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "edited-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleInputText = (event) => {
    setText(event.target.value);
  };

  const handleAddText = () => {
    dispatch(addText({ text, position: { x: 50, y: 50 } }));
    setText("");
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    setDragOffset({
      x: offsetX - newText?.position.x,
      y: offsetY - newText?.position.y,
    });
  };
  const handleMouseMove = (event) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const newX = event.clientX - rect.left - dragOffset.x;
      const newY = event.clientY - rect.top - dragOffset.y;
      dispatch(updateTextPosition({ x: newX, y: newY }));
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return {
    editorControls,
    handleChange,
    handleReset,
    canvasRef,
    downloadImage,
    handleInputText,
    text,
    handleAddText,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
