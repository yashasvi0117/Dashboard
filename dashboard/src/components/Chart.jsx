import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularGraph = ({ data, color }) => {
  const chartData = {
    datasets: [
      {
        data: data,
        backgroundColor: color,
        hoverOffset: 3,
      },
    ],
  };

  return (
    <div className="flex items-center">
      <div className="w-24 h-24">
        <Doughnut data={chartData} />
      </div>
      <div className="ml-4">
        <div className="flex items-center mb-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          <span className="text-gray-700 text-xs">Connected ({data[0]})</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-200 rounded-full mr-2"></span>
          <span className="text-gray-700 text-xs">
            Not Connected ({data[1]})
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularGraph;
