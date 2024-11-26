import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "./AddTodo.module.css";
import { useFirebase } from "../../context/Firebase";

function AddTodo({ onTaskAdded }) {
  const [title, setTitle] = useState(""); // Title field state
  const [description, setDescription] = useState(""); // Description field state
  const { currentUser, db } = useFirebase();

  const handleAddTask = async (e) => {
   e.preventDefault()
    if (!title.trim() || !description.trim()) {
      toast.error("Both title and description are required!");
      return;
    }

    try {
      const todosRef = collection(db, `users/${currentUser.uid}/todos`);

      // Add the todo on firebase
      await addDoc(todosRef, {
        title,
        description,
        completed: false,
        createdAt: new Date(),
      });

      toast.success("Task added successfully!");

     
      setTitle("");
      setDescription("");

      if (onTaskAdded) onTaskAdded();
    } catch (error) {
      toast.error("Failed to add task: " + error.message);
    }
  };

  return (
    <div className={styles.todoContainer}>
     <form onSubmit={handleAddTask}>
     <div className={styles.addTodo}>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          ></textarea>
        </div>

        <button type="submit">Add Task</button>
      </div>
     </form>
    </div>
  );
}

export default AddTodo;
