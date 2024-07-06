import React, { useEffect, useState, useRef } from 'react';
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
      backgroundColor: ['rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="dashboard">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Bar data={data} />
    </div>
  );
}

export default Dashboard;
