import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`/api/students/${id}`)
      .then(response => setStudent(response.data))
      .catch(error => console.error('Error fetching student:', error));
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="student-detail">
      <h1 className="text-3xl font-bold mb-4">{student.name}</h1>
      <p>Ratings: {student.ratings}</p>
      <p>Questions Solved: {student.questionsSolved}</p>
      <p>Submission Frequency: {student.submissionFrequency}</p>
      <p>Most Solved Problems: {student.mostSolvedProblems.join(', ')}</p>
    </div>
  );
}

export default StudentDetail;
