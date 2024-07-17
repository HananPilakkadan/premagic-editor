import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../../api/api";

const initialState = {
  status: "idle",
  newImageData: "",
  recentImages: [],
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
  customText: "",
  newText: { text: "", x: 50, y: 50 },
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
    },
    resetControls: () => {
      return initialState;
    },
    recentImageHandler: (state, action) => {
      if (action.payload?.image.urls) {
        const updateRecentImage = [...state.recentImages, action.payload]
          ?.reverse()
          ?.slice(-2);
        state.recentImages = updateRecentImage;
        console.log(updateRecentImage, "helloooooooooo");
      }
    },

    addText: (state, action) => {
      console.log(action.payload);
      const { text, position } = action.payload;
      state.newText = { text: text, x: position.x, y: position.y };
    },
    updateTextPosition: (state, action) => {
      const { name, value } = action.payload;
      state.textPosition = {
        ...state.textPosition,
        [name]: parseInt(value, 10),
      };
    },
    takeFromRecent: (state, action) => {
      state.newImageData = action.payload;
      state.recentImages = state.recentImages.filter(
        (image) => image.image.id !== action.payload?.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.status = "success";
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
} = editingSlice.actions;

export default editingSlice.reducer;
