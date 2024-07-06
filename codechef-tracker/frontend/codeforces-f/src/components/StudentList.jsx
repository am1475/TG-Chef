import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/api/students')
      .then(response => {
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  if (students.length === 0) return <div>Loading...</div>;

  return (
    <div className="student-list">
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      <ul>
        {students.map(student => (
          <li key={student._id} className="mb-2">
            <Link to={`/student/${student._id}`} className="text-blue-500">
              {student.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
