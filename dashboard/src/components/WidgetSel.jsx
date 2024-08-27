import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget } from "../features/dashboards/dashSlice";

const WidgetSelectionModal = ({ isOpen, onClose }) => {
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [activeTab, setActiveTab] = useState(
    categories[0]?.name || "CSPM Executive Dashboard"
  );
  const [widgetNames, setWidgetNames] = useState({});

  const handleCheckboxChange = (widgetId) => {
    setSelectedWidgets((prevSelectedWidgets) => ({
      ...prevSelectedWidgets,
      [widgetId]: !prevSelectedWidgets[widgetId],
    }));
  };

  const handleInputChange = (widgetId, value) => {
    setWidgetNames((prevNames) => ({
      ...prevNames,
      [widgetId]: value,
    }));
  };

  const handleAddWidgets = () => {
    const category = categories.find((cat) => cat.name === activeTab);
    if (category) {
      Object.keys(selectedWidgets).forEach((widgetId) => {
        if (selectedWidgets[widgetId]) {
          const newWidget = {
            id: Date.now(), // Ensure a unique ID is generated
            name: widgetNames[widgetId] || "", // Only use the input value
            text: widgetNames[widgetId] || "", // Text content is the same as name
            title: "", // You can also add a title if needed or set it as an empty string
          };
          dispatch(addWidget({ categoryId: category.id, widget: newWidget }));
        }
      });
      onClose(); // Close the modal after adding widgets
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const activeCategory = categories.find((cat) => cat.name === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 h-full">
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={handleClose}
      ></div>
      <div
        className="bg-white w-full max-w-md h-3/4 p-6 rounded-lg shadow-lg relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Add Widget</h2>
        <p className="text-sm mb-4">
          Personalize your dashboard by adding the following widget
        </p>
        <div className="flex border-b mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`p-2 ${
                activeTab === category.name
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(category.name)}
            >
              {category.name}
            </button>
          ))}
          <button
            className={`p-2 ${
              activeTab === "Image"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Image")}
          >
            Image
          </button>
          <button
            className={`p-2 ${
              activeTab === "Ticket"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Ticket")}
          >
            Ticket
          </button>
        </div>
        <div className="space-y-2 overflow-y-auto h-3/5">
          {activeCategory && activeCategory.widgets.length > 0 ? (
            activeCategory.widgets.map((widget) => (
              <div key={widget.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={widget.id}
                  checked={!!selectedWidgets[widget.id]}
                  onChange={() => handleCheckboxChange(widget.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={widgetNames[widget.id] || ""}
                  onChange={(e) => handleInputChange(widget.id, e.target.value)}
                  placeholder="Enter widget name"
                  className="ml-2 p-1 border border-gray-300 rounded"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No widgets available for this tab.</p>
          )}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={handleAddWidgets}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetSelectionModal;
