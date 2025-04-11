// src/HabitForm.js
import React, { useState } from "react";

function HabitForm({ onAddHabit }) {
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    frequency: "",
  });

  const handleChange = (e) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit.name || !habit.frequency) {
      alert("Please enter a habit name and frequency.");
      return;
    }
    onAddHabit(habit);
    setHabit({ name: "", description: "", frequency: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f0f0f0",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        maxWidth: "500px",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Add New Habit</h2>

      <input
        type="text"
        name="name"
        placeholder="Habit name"
        value={habit.name}
        onChange={handleChange}
        style={{
          padding: "0.5rem",
          marginBottom: "0.5rem",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={habit.description}
        onChange={handleChange}
        style={{
          padding: "0.5rem",
          marginBottom: "0.5rem",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="text"
        name="frequency"
        placeholder="e.g. Daily, Weekly"
        value={habit.frequency}
        onChange={handleChange}
        style={{
          padding: "0.5rem",
          marginBottom: "0.5rem",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ➕ Add Habit
      </button>
    </form>
  );
}

export default HabitForm;
