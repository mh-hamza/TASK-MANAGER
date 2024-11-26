import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 
import { PiUserCircleDuotone } from "react-icons/pi";

import { useFirebase } from "../../context/Firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// CSS
import styles from "./Navbar.module.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, auth } = useFirebase();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfully");
      handleMenuClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <h1>Task Manager</h1>
        </div>
        
        {/* Mobile Menu */}
        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <div className={styles.authButtons}>
            {!currentUser ? (
              <>
                <Link to="/" className={styles.loginBtn} onClick={handleMenuClose}>
                  <span>Login</span>
                </Link>
                <Link to="/register" className={styles.registerBtn} onClick={handleMenuClose}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className={styles.userInfo}>
                  <PiUserCircleDuotone size={50} className={styles.userIcon} /> 
                  <div className={styles.userInfoInner}>
                    <span className={styles.userName}>{currentUser.displayName || "User"}</span>
                    <span className={styles.userEmail}>{currentUser.email}</span>
                  </div>
                </div>
                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
              </>
            )}
          </div>
        </div>

        {/* Bar Icon */}
        <div className={styles.hamburger} onClick={handleMenuToggle}>
          {isMobileMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
