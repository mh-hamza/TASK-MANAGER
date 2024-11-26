import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.jsx";
import AddTodo from "../../components/AddTodo/AddTodo.jsx";
import TaskList from "../../components/TaskList/TaskList.jsx";
import UpdateTodoPopup from "../../components/updateTodoPopup/UpdateTodoPopup.jsx";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "./TaskManager.module.css";
import { FaSearch } from "react-icons/fa";

function TaskManager() {
  const navigate = useNavigate();
  const { currentUser, db } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentUser) {
        navigate("/");
      } else {
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentUser, navigate]);
  // fetch todos from firebase
  const fetchTask = async () => {
    try {
      if (!currentUser?.uid) {
        toast.error("User is not logged in or UID is missing");
        return;
      }
      const todosRef = collection(db, `users/${currentUser.uid}/todos`);
      const todosSnapshot = await getDocs(todosRef);
      const todos = todosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(todos);
      setFilteredTasks(todos);
    } catch (error) {
      toast.error("Failed to fetch todos: " + error.message);
    }
  };
 // fetch when component is rendering
  useEffect(() => {
    if (currentUser) {
      fetchTask();
    }
  }, [currentUser]);
  // delete task function
  const deleteTask = async (taskId) => {
    try {
      if (!currentUser?.uid) {
        toast.error("User is not logged in");
        return;
      }

      const taskDocRef = doc(db, `users/${currentUser.uid}/todos/${taskId}`);
      await deleteDoc(taskDocRef);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setFilteredTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      ); 
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task: " + error.message);
    }
  };
 // for Edit Popup Open
  const openEditPopup = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setCurrentTask(task);
    setIsEditing(true);
  };
 // Update function
  const handleUpdate = async (updatedTask) => {
    try {
      const taskDocRef = doc(
        db,
        `users/${currentUser.uid}/todos/${updatedTask.id}`
      );
      await updateDoc(taskDocRef, updatedTask);
      toast.success("Task updated successfully");
      fetchTask();
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update task: " + error.message);
    }
  };

  const handleTaskAdded = () => {
    fetchTask();
  };

  // Update filtered tasks when search query changes
  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.mainContainer}>
      <h1>Start Your Next Task Here</h1>
      <div>
        <AddTodo onTaskAdded={handleTaskAdded} />
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />{" "}
          
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      <div>
        <TaskList
          tasks={filteredTasks}
          onEdit={openEditPopup}
          onDelete={deleteTask}
        />
      </div>
      <UpdateTodoPopup
        isOpen={isEditing}
        task={currentTask}
        onClose={() => setIsEditing(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default TaskManager;
