import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: 1,
          name: "Widget 1",
          text: "This is widget 1",
          title: "Cloud Accounts",
        },
        {
          id: 2,
          name: "Widget 2",
          text: "This is widget 2",
          title: "Cloud Account Risk Assesment",
        },
      ],
    },
    {
      id: 2,
      name: "CWPP Dashboard",
      widgets: [
        {
          id: 3,
          name: "Widget 3",
          text: "This is widget 3",
          title: "Top 5 Namespace Specific Alerts",
        },
        {
          id: 4,
          name: "Widget 4",
          text: "This is widget 4",
          title: "Workload Alerts",
        },
      ],
    },
  ],
};

const dashSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (state, action) => {

      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
      }
    },
  },
});

export const { addWidget, removeWidget } = dashSlice.actions;

export default dashSlice.reducer;
