import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },
  content: {
    maxWidth: "500px",
    margin: "auto",
    padding: "2rem",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    border: "none",
  },
};

export default function HabitHistoryModal({ isOpen, onClose, habit }) {
  if (!habit) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 style={{
	      fontSize: "1.8rem",
		      marginBottom: "1rem",
		      borderBottom: "2px solid #1976d2",
		      paddingBottom: "0.5rem",
		      color: "#1976d2"
      }}>
	  📊 {habit.name} — Habit History</h2>
      <p><strong>Description:</strong> {habit.description}</p>
      <p><strong>Frequency:</strong> {habit.frequency}</p>
      <p><strong>Streak:</strong> {habit.streak} days</p>
      <p><strong>Last Completed:</strong> {habit.lastCompleted || "Not yet"}</p>
      <h3>Completion History:</h3>
      <ul>
        {habit.history.length === 0 ? (
          <li>No completions yet</li>
        ) : (
          habit.history.map((date, index) => (
            <li key={index}>{new Date(date).toLocaleDateString()}</li> // Format dates properly
          ))
        )}
      </ul>
      <h4>Completion History:</h4>
      <ul>
        {habit.history.length > 0 ? (
          habit.history.map((date, i) => <li key={i}>{date}</li>)
        ) : (
          <li>No history yet.</li>
        )}
      </ul>
      <button
        onClick={onClose}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#1976d2",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </Modal>
  );
}

