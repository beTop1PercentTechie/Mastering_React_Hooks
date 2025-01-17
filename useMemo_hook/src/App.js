import React, { useState, useMemo } from "react";
import './App.css';

function App() {
  // Workout data (array of workout sessions)
  const [workoutData, setWorkoutData] = useState([
    { date: "2025-01-15", calories: 300, hours: 1 },
    { date: "2025-01-16", calories: 500, hours: 1.5 },
    { date: "2025-01-17", calories: 400, hours: 1.2 },
  ]);

  // Add new workout session (for demonstration purposes)
  const addWorkout = () => {
    const newWorkout = {
      date: new Date().toISOString().split("T")[0], // Today's date
      calories: Math.floor(Math.random() * 500) + 200, // Random calories
      hours: Math.random() * 2, // Random hours
    };
    setWorkoutData((prevData) => [...prevData, newWorkout]);
  };

  // Memoized aggregated stats
  const aggregatedStats = useMemo(() => {
    console.log("Calculating aggregated stats...");
    const totalCalories = workoutData.reduce((sum, session) => sum + session.calories, 0);
    const totalHours = workoutData.reduce((sum, session) => sum + session.hours, 0);
    const averageCalories = (totalCalories / workoutData.length).toFixed(1);
    const averageHours = (totalHours / workoutData.length).toFixed(1);

    return {
      totalCalories,
      totalHours,
      averageCalories,
      averageHours,
    };
  }, [workoutData]); // Recalculate only when workoutData changes

  return (
    <div className="fitness-container">
      <h2 className="title">Fitness Tracker</h2>
      
      <button onClick={addWorkout} className="add-workout-btn">
        Add Random Workout
      </button>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Stats</h3>
          <p><strong>Total Calories Burned:</strong> {aggregatedStats.totalCalories}</p>
          <p><strong>Total Hours Worked Out:</strong> {aggregatedStats.totalHours}</p>
        </div>
        <div className="stats-card">
          <h3>Average Stats</h3>
          <p><strong>Average Calories:</strong> {aggregatedStats.averageCalories}</p>
          <p><strong>Average Hours:</strong> {aggregatedStats.averageHours}</p>
        </div>
      </div>

      <div className="workout-list-container">
        <h3>Workout Sessions</h3>
        <ul className="workout-list">
          {workoutData.map((session, index) => (
            <li key={index} className="workout-item">
              <span><strong>Date:</strong> {session.date}</span>
              <span><strong>Calories:</strong> {session.calories}</span>
              <span><strong>Hours:</strong> {session.hours.toFixed(1)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
