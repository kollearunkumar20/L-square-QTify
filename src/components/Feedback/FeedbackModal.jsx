import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./FeedbackModal.css";

const FeedbackModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="feedback-modal">
        <div className="feedback-header">
          <h3>Feedback</h3>
          <CloseIcon className="close-icon" onClick={onClose} />
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
