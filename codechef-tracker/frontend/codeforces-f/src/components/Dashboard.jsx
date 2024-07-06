import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

function Dashboard() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    axios.get('/api/metrics')
      .then(response => setMetrics(response.data))
      .catch(error => console.error('Error fetching metrics:', error));
  }, []);

  const data = {
    labels: ['Average Rating', 'Total Problems Solved', 'Total Submission Count'],
    datasets: [{
      label: 'Metrics',
      data: [metrics.averageRating, metrics.totalProblemsSolved, metrics.totalSubmissionCount],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="dashboard p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <div className="summary grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold">Average Rating</h2>
          <p className="text-2xl">{metrics.averageRating || 'Loading...'}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold">Total Problems Solved</h2>
          <p className="text-2xl">{metrics.totalProblemsSolved || 'Loading...'}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold">Total Submission Count</h2>
          <p className="text-2xl">{metrics.totalSubmissionCount || 'Loading...'}</p>
        </div>
      </div>
      <div className="chart bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Metrics Overview</h2>
        <Bar data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
