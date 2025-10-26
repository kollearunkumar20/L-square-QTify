import React, { useState } from "react";
import "./FAQ.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is Qtify free to use?",
      answer: "Yes! It is 100% free to use.",
    },
    {
      question: "Can I download and listen to songs offline?",
      answer:
        "Sorry, unfortunately we don’t provide the service to download any songs.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">FAQs</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-card">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <p>{faq.question}</p>
            {openIndex === index ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </div>
          {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
