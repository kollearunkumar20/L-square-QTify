import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";
import FeedbackModal from "../Feedback/FeedbackModal";
import "../../App.css";


function Navbar({ searchData }) {
  const [openFeedback, setOpenFeedback] = useState(false);
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={Logo} alt="Logo" className={styles.logo} />
      </Link>

       <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      /> 
        <button
          className={styles.feedbackBtn}
          onClick={() => setOpenFeedback(true)}
        >
          Give Feedback
        </button>
        <FeedbackModal open={openFeedback} onClose={() => setOpenFeedback(false)} />
    </nav>
  );
}

export default Navbar;
