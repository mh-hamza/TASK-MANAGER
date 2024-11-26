import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// CSS
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth ,currentUser } = useFirebase();
  const navigate = useNavigate()
  
  useEffect(() => {
    if (currentUser) {
      navigate("/tasks"); // Redirect if already Login
    }
  }, [currentUser, navigate]);

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if(response){
        toast.success("Login Successfully")
        navigate('/tasks')
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Login
        </button>

        <p className={styles.registerPrompt}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
