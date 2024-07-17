import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: appReducer,
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster richColors position="top-center" />
  </React.StrictMode>
);

reportWebVitals();
