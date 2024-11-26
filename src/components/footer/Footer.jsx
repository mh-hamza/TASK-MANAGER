import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Made with <HiOutlineHeart className={styles.heartIcon} /> by 
        <span className={styles.author}> Mohammad Hamza</span>
      </p>
      <div className={styles.links}>
        <a
          href="https://github.com/mh-hamza/TASK-MANAGER" 
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/mh-hamza444" 
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
