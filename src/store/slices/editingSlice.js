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
      value: "0",
    },
    {
      id: "saturation",
      label: "Saturation",
      type: "range",
      defaultValue: "100",
      value: "0",
    },
    {
      id: "contrast",
      label: "Contrast",
      type: "range",
      defaultValue: "100",
      value: "0",
    },
    {
      id: "sepia",
      label: "Sepia",
      type: "range",
      defaultValue: "100",
      value: "0",
    },
    {
      id: "bw",
      label: "Black & White",
      type: "range",
      defaultValue: "100",
      value: "0",
    },
  ],
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
      const updateRecentImage = [...state.recentImages, action.payload]
        ?.reverse()
        ?.slice(-2);
      state.recentImages = updateRecentImage;
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

export const { resetControls, updateFilterValue, recentImageHandler } =
  editingSlice.actions;

export default editingSlice.reducer;
