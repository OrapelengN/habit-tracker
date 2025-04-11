// src/App.js
import React, { useState, useEffect } from "react";
import HabitForm from "./HabitForm";
import HabitHistoryModal from "./HabitHistoryModal";

function App() {
  const [habits, setHabits] = useState(() => {

    const saved = localStorage.getItem("habits");
	return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
	  // Save to LocalStorage whenever habits change
	  localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (habit) => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHabit(null);
    setIsModalOpen(false);
  };

  const addHabit = (habit) => {
    const newHabit = {
      ...habit,
      streak: 0,
      lastCompleted: null,
      history: [],
    };
    setHabits([...habits, newHabit]);
  };

  const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({
      name: "",
      description: "",
      frequency: "",
  });

  const deleteHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  const markCompleted = (index) => {
  const updated = habits.map((habit, i) => {
    if (i === index) {
      const today = new Date().toISOString().split("T")[0];
      let newStreak = habit.streak;

      if (habit.lastCompleted !== today) {
        const lastDate = new Date(habit.lastCompleted);
        const diffInDays = (new Date(today) - lastDate) / (1000 * 3600 * 24);

        if (diffInDays === 1) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      const updatedHistory = habit.history.includes(today)
        ? habit.history
        : [...habit.history, today];

      return {
        ...habit,
        streak: habit.lastCompleted === today ? habit.streak : newStreak,
        lastCompleted: today,
        history: updatedHistory,
      };
    }
    return habit;
  });

  setHabits(updated);
};

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Habit Tracker</h1>
      <HabitForm onAddHabit={addHabit} />
      <ul style={{ listStyle: "none", padding: 0 }}>
      {habits.map((habit, index) => (
        <li
          key={index}
          style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        <strong style={{ fontSize: "1.2rem" }}>{habit.name}</strong> <em>({habit.frequency})</em><br />
        <p style={{ marginTop: "0.5rem" }}>{habit.description}</p>
        <p>🔥 Streak: <strong>{habit.streak}</strong> days</p>
        <p>✅ Last Completed: {habit.lastCompleted || "Not yet"}</p>

	<small>
          Last completed: {habit.history.length > 0 ? new Date(habit.history[habit.history.length - 1]).toLocaleDateString() : "No completions yet"}
        </small><br />

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <button onClick={() => markCompleted(index)}>✔ Mark Completed</button>
          <button onClick={() => deleteHabit(index)} style={{ backgroundColor: "#ff6961", color: "white" }}>🗑 Delete</button>
          <button onClick={() => {
            setEditingIndex(index);
            setEditData({
              name: habit.name,
              description: habit.description,
              frequency: habit.frequency
            });
           }}>✏️ Edit</button>
	   <button onClick={() => openModal(habit)}>View History</button>
         </div>

         {editingIndex === index && (
           <form
             onSubmit={(e) => {
              e.preventDefault();
              const updatedHabits = [...habits];
              updatedHabits[index] = {
                ...updatedHabits[index],
                ...editData
              };
              setHabits(updatedHabits);
              setEditingIndex(null);
            }}
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="Habit Name"
            />
            <input
              type="text"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              placeholder="Description"
            />
            <input
              type="text"
              value={editData.frequency}
              onChange={(e) => setEditData({ ...editData, frequency: e.target.value })}
              placeholder="Frequency"
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white" }}>💾 Save</button>
              <button type="button" onClick={() => setEditingIndex(null)}>❌ Cancel</button>
            </div>
          </form>
         )}
       </li>
      ))}
    </ul>
      <HabitHistoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        habit={selectedHabit}
      />
    </div>
  );
}

export default App;
