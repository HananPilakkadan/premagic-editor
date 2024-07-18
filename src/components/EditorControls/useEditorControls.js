import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  addText,
  handleColorChange,
  handleFamilyChange,
  handleFontSizeChange,
  handleRecentImageFlag,
  resetControls,
  saveEditedImage,
  updateFilterValue,
  updateTextPosition,
} from "../../store/slices/editingSlice";
import { useDispatch, useSelector } from "react-redux";

export const useEditorControls = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [filterData, setFilterData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const {
    editorControls,
    newImageData,
    recentImages,
    isRecentImage,
    textPosition,
    colors,
    editedImage,
    textControl,
  } = useSelector((state) => state.editor);
  const handleChange = (id, newValue) => {
    dispatch(handleRecentImageFlag());
    dispatch(updateFilterValue({ id, newValue }));
  };
  const handleReset = () => {
    dispatch(handleRecentImageFlag());
    setFilterData();
    dispatch(resetControls());
    handleDeleteText();
    toast.success("All filters have been cleared!");
  };

  useEffect(() => {
    if (canvasRef.current) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = newImageData?.urls?.regular;
      image.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;

        if (editorControls) {
          const filters = editorControls
            .map((control) => `${control.id}(${parseInt(control.value)}%)`)
            .join(" ");
          setFilterData(filters);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply filters and draw the image
        ctx.filter = filterData;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Reset the filter before drawing the text
        ctx.filter = "none";
        if (textControl?.text) {
          drawText(ctx, textPosition.x + 350, textPosition.y + 350);
        }

        const dataURL = canvas.toDataURL();
        dispatch(saveEditedImage(dataURL));
      };
    }
  }, [
    newImageData,
    editorControls,
    textControl,
    isRecentImage,
    recentImages,
    textPosition,
    offset,
    filterData,
    isDragging,
  ]);

  const getMetadata = () => {
    return JSON.stringify(filterData, null, 2);
  };
  const handleColorClick = (colorName) => {
    dispatch(handleColorChange(colorName));
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
    dispatch(addText({ text: event.target.value }));
  };

  const handleDeleteText = () => {
    dispatch(addText({ text: "" }));
  };

  const handleFontSize = (size) => {
    dispatch(handleFontSizeChange(size));
  };
  const handleFontStyle = (e) => {
    dispatch(handleFamilyChange(e.target.value));
  };

  const drawText = (ctx, x, y) => {
    ctx.font = `${textControl?.fontSize}px ${textControl?.fontFamily}`;

    ctx.fillStyle = textControl.color;
    ctx.fillText(textControl?.text, x, y);
    if (isDragging) {
      const textWidth = ctx.measureText(textControl?.text).width;
      ctx.strokeStyle = "#ff6550";
      ctx.lineWidth = 10;
      ctx.strokeRect(x, y - 70, textWidth + 100, 70);
    }
  };
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      x >= textPosition.x &&
      x <=
        textPosition.x +
          canvas.getContext("2d").measureText(textControl?.text).width &&
      y >= textPosition.y - 80 &&
      y <= textPosition.y
    ) {
    }
    setIsDragging(true);
    setOffset({ x: x - textPosition.x, y: y - textPosition.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      dispatch(updateTextPosition({ x: x - offset.x, y: y - offset.y }));
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
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isRecentImage,
    isDragging,
    textControl,
    handleDeleteText,
    handleColorClick,
    colors,
    handleFontSize,
    handleFontStyle,
    editedImage,
  };
};
