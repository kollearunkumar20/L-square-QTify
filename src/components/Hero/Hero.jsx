import React from "react";
import styles from "./Hero.module.css";
import headphone from "../../assets/hero.png";

function Hero() {
  return (
    <div className={styles.hero}>
      <div>
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands podcast episodes</h1>
      </div>
      <div>
        <img src={headphone} alt="headphone" width = "212" className={styles.logo} />
      </div>
    </div>
  );
}

export default Hero;
