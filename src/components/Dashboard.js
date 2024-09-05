import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [ytdReturns, setYtdReturns] = useState(0);
  const [assetDistribution, setAssetDistribution] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    setPortfolioValue(100000);
    setYtdReturns(12.5);
    setAssetDistribution([
      { name: 'Stocks', value: 60000 },
      { name: 'Bonds', value: 25000 },
      { name: 'Real Estate', value: 15000 },
    ]);
    setPerformanceData([
      { month: 'Jan', value: 5000 },
      { month: 'Feb', value: 7000 },
      { month: 'Mar', value: 8000 },
    ]);
  }, []);

  const data = {
    labels: performanceData.map(d => d.month),
    datasets: [
      {
        label: 'Performance Over Time',
        data: performanceData.map(d => d.value),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="py-8 px-4 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 text-gray-900 max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Portfolio Value</h3>
            <p className="text-3xl font-bold text-blue-600">${portfolioValue.toLocaleString()}</p>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">YTD Returns</h3>
            <p className="text-3xl font-bold text-green-600">{ytdReturns}%</p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Asset Distribution</h3>
          <div className="flex flex-col space-y-4">
            {assetDistribution.map((asset) => (
              <div key={asset.name} className="flex justify-between">
                <span className="font-medium">{asset.name}</span>
                <span className="font-bold">${asset.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Over Time</h3>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
