import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../../api/api";

const initialState = {
  status: "idle",
  newImageData: "",
  recentImages: [],
  textPosition: { x: 100, y: 100 },
  editorControls: [
    {
      id: "brightness",
      label: "Brightness",
      type: "range",
      defaultValue: "100",
      value: "100",
    },
    {
      id: "saturate",
      label: "Saturation",
      type: "range",
      defaultValue: "100",
      value: "100",
    },
    {
      id: "contrast",
      label: "Contrast",
      type: "range",
      defaultValue: "100",
      value: "100",
    },
    {
      id: "sepia",
      label: "Sepia",
      type: "range",
      defaultValue: "100",
      value: "0",
    },
    {
      id: "grayscale",
      label: "Black & White",
      type: "range",
      defaultValue: "100",
      value: "0",
    },
  ],
  editedImage: "",
  isRecentImage: false,
  newText: { text: "" },
  colors: [
    { name: "red", colorClass: "bg-red-500", textColor: "text-white" },
    { name: "green", colorClass: "bg-green-500", textColor: "text-white" },
    { name: "blue", colorClass: "bg-blue-500", textColor: "text-white" },
    { name: "yellow", colorClass: "bg-yellow-500", textColor: "text-black" },
    { name: "white", colorClass: "bg-white", textColor: "text-black" },
  ],
  textControl: {
    text: "",
    color: "black",
    fontSize: 80,
    fontFamily: "Arial",
  },
};

export const fetchImage = createAsyncThunk(
  "editingSlice/fetchImage",
  async (_, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get(`/random`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const editingSlice = createSlice({
  name: "editingSlice",
  initialState,
  reducers: {
    updateFilterValue: (state, action) => {
      const { id, newValue } = action.payload;
      state.editorControls = state.editorControls.map((control) =>
        control.id === id ? { ...control, value: newValue } : control
      );
      const control = state.editorControls.find((ctrl) => ctrl.id === id);
      if (control) {
        control.value = newValue;
      }
    },
    resetControls: (state) => {
      state.editorControls = initialState.editorControls;
    },
    recentImageHandler: (state, action) => {
      if (action.payload?.urls) {
        const updateRecentImage = [...state.recentImages, action.payload]
          ?.slice(-2)
          ?.reverse();
        state.recentImages = updateRecentImage;
        state.editorControls = initialState.editorControls;
        state.textControl = initialState.textControl;
      }
    },

    addText: (state, action) => {
      const { text } = action.payload;
      state.textControl.text = text;
    },
    updateTextPosition: (state, action) => {
      state.textPosition = action.payload;
    },
    takeFromRecent: (state, action) => {
      state.isRecentImage = true;
      const { image, updatedImageData } = action.payload;
      const updateRecentImage = [...state.recentImages, updatedImageData]
        ?.reverse()
        ?.slice(-2);
      state.recentImages = updateRecentImage;
      state.newImageData = image;
      state.editorControls =
        image.editorControls ?? initialState.editorControls;
      state.textControl = image.textControl ?? initialState.textControl;
      state.recentImages = state.recentImages.filter(
        (rcImage) => rcImage.id !== image?.id
      );
    },
    handleRecentImageFlag: (state) => {
      state.isRecentImage = false;
    },
    handleColorChange: (state, action) => {
      state.textControl.color = action.payload;
    },
    handleFontSizeChange: (state, action) => {
      state.textControl.fontSize = action.payload;
    },
    handleFamilyChange: (state, action) => {
      state.textControl.fontFamily = action.payload;
    },
    saveEditedImage: (state, action) => {
      state.editedImage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.status = "success";
        state.isRecentImage = false;

        state.newImageData = action.payload;
      })
      .addCase(fetchImage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  resetControls,
  updateFilterValue,
  recentImageHandler,
  addText,
  updateTextPosition,
  takeFromRecent,
  handleRecentImageFlag,
  handleColorChange,
  handleFontSizeChange,
  handleFamilyChange,
  saveEditedImage,
} = editingSlice.actions;

export default editingSlice.reducer;
