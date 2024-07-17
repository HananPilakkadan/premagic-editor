import { combineReducers } from "@reduxjs/toolkit";
import editingSlice from "./slices/editingSlice";

export const appReducer = combineReducers({
  editor: editingSlice,
});
