import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboards/dashSlice";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

export default store;
