import React, { useState, useEffect } from "react";
import styles from "./UpdateTodoPopup.module.css";

const UpdateTodoPopup = ({ isOpen, task, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Edit Task</h2>
        <label>
          Title:
          <input
            type="text"
            value={editedTask?.title || ""}
            onChange={(e) =>
              setEditedTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </label>
        <label>
          Description:
          <textarea
            value={editedTask?.description || ""}
            onChange={(e) =>
              setEditedTask((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </label>
        <div className={styles.actions}>
          <button onClick={() => onUpdate(editedTask)}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodoPopup;
