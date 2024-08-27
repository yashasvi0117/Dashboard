import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, removeWidget } from "../features/dashboards/dashSlice";
import CircularGraph from "../components/Chart";
import Placeholder from "../components/Placeholder";
import WidgetSelectionModal from "../components/WidgetSel";

const Dashboard = () => {
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  // Example data and colors for different widgets
  const graphDataForWidgets = [
    [2, 2], // First widget data
    [6, 0.2, 1, 2], // Second widget data
    [], // Third widget has no data
    [], // Fourth widget has no data
  ];

  const graphColorsForWidgets = [
    ["#0000FF", "#EEEEEE"], // Colors for first widget
    ["#006742", "#EEEEEE", "#FFFF00", "#800000"], // Colors for second widget
    [],
    [],
  ];

  return (
    <div>
      <div className="flex justify-center min-h-screen bg-blue-200 rounded-lg mx-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-screen mt-10 mx-16">
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              {" "}
              {/* Reduced margin-bottom here */}
              <h2 className="text-xl font-bold mb-1">{category.name}</h2>{" "}
              {/* Reduced margin-bottom here */}
              <div className="mt-2 flex flex-wrap">
                {" "}
                {/* Reduced margin-top here */}
                {category.widgets.map((widget, index) => (
                  <div
                    key={widget.id}
                    className="bg-white p-3 border border-gray-300 rounded-xl mb-3 mx-2 w-1/4 flex flex-col items-center shadow-lg"
                  >
                    <h3 className="font-bold self-start mb-2">
                      {widget.title}
                    </h3>
                    {category.name === "CWPP Dashboard" ? (
                      <Placeholder
                        imageSrc="/images/image1.jpg"
                        altText="Placeholder Image"
                        message={widget.name}
                        className="w-16 h-16"
                      />
                    ) : graphDataForWidgets[index % graphDataForWidgets.length]
                        .length > 0 ? (
                      <CircularGraph
                        data={
                          graphDataForWidgets[
                            index % graphDataForWidgets.length
                          ]
                        }
                        color={
                          graphColorsForWidgets[
                            index % graphColorsForWidgets.length
                          ]
                        }
                      />
                    ) : (
                      <Placeholder
                        imageSrc="/images/image1.jpg"
                        altText="No Graph Data Available"
                        message={widget.name}
                      />
                    )}
                    <p className="text-gray-700 mt-2">{widget.text}</p>
                    <button
                      onClick={() => handleRemoveWidget(category.id, widget.id)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="bg-white p-3 border border-gray-300 rounded-xl mx-2 w-1/4 mb-3 flex justify-center items-center shadow-lg">
                  <button
                    onClick={openModal}
                    className="bg-white text-black px-4 py-2 rounded border border-black"
                  >
                    + Add Widget
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WidgetSelectionModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
