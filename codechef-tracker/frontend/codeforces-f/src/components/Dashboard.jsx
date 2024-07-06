import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const { username } = useParams();
  const [metrics, setMetrics] = useState({});
  const [problemNames, setProblemNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(20);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (username) {
      // Fetch user submissions
      axios.get(`https://codeforces.com/api/user.status?handle=${username}`)
        .then(response => {
          const submissions = response.data.result;
          const problemsSolvedSet = new Set();
          const problemNamesList = [];
          let submissionCount = 0;

          // Process each submission
          submissions.forEach(submission => {
            if (submission.verdict === 'OK') {
              const problemId = submission.problem.contestId + submission.problem.index;
              if (!problemsSolvedSet.has(problemId)) {
                problemsSolvedSet.add(problemId);
                problemNamesList.push({
                  contestId: submission.problem.contestId,
                  index: submission.problem.index,
                  name: submission.problem.name,
                  solvedDate: new Date(submission.creationTimeSeconds * 1000).toLocaleDateString() // Include solvedDate
                });
              }
            }
            submissionCount++;
          });

          // Fetch user info for ratings and designation
          axios.get(`https://codeforces.com/api/user.info?handles=${username}`)
            .then(userResponse => {
              const userData = userResponse.data.result[0];
              setMetrics({
                averageRating: userData.rating,
                maxRating: userData.maxRating,
                totalProblemsSolved: problemsSolvedSet.size,
                totalSubmissionCount: submissionCount,
              });
              setProblemNames(problemNamesList);
              setUserInfo({
                username: userData.handle,
                designation: userData.rank
              });
              setLoading(false);
            });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    }
  }, [username]);

  const handleReadMore = () => {
    setItemsToShow(prev => prev + 20);
  };

  // Prepare data for the chart
  const data = {
    labels: ['Average Rating', 'Total Problems Solved', 'Total Submission Count'],
    datasets: [{
      label: 'Metrics',
      data: [
        metrics.averageRating || 0,
        metrics.totalProblemsSolved || 0,
        metrics.totalSubmissionCount || 0
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  // Chart options with a suggested Y-axis scale
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: Math.max(
          metrics.averageRating || 0,
          metrics.totalProblemsSolved || 0,
          metrics.totalSubmissionCount || 0
        ) + 10,
        stepSize: 10,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Dashboard for {userInfo.username}</h1>
      <p className="text-lg mb-4">Designation: {userInfo.designation}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="summary grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-bold">Average Rating</h2>
              <p className="text-2xl">{metrics.averageRating || 'N/A'}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-bold">Total Problems Solved</h2>
              <p className="text-2xl">{metrics.totalProblemsSolved || 'N/A'}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-bold">Total Submission Count</h2>
              <p className="text-2xl">{metrics.totalSubmissionCount || 'N/A'}</p>
            </div>
          </div>
          <div className="chart bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Metrics Overview</h2>
            <div style={{ height: '400px' }}>
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="problem-names mt-6">
            <h2 className="text-2xl font-bold mb-4">Problems Solved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {problemNames.slice(0, itemsToShow).map((problem, index) => (
                <a 
                  key={index}
                  href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 shadow rounded flex flex-col items-center justify-center"
                >
                  <p className="text-lg font-semibold">{problem.name}</p>
                  <p className="text-sm text-gray-500">Solved on: {problem.solvedDate}</p>
                </a>
              ))}
            </div>
            {itemsToShow < problemNames.length && (
              <button 
                onClick={handleReadMore}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
              >
                Read More
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
