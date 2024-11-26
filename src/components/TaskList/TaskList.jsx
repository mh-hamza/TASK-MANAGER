import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import styles from './TaskList.module.css';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className={styles.taskList}>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index} className={styles.taskItem}>
            <div className={styles.taskContent}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className={styles.taskActions}>
              <button onClick={() => onEdit(task.id)} className={styles.editButton}>
                <FaEdit size={16} />
              </button>
              <button onClick={() => onDelete(task.id)} className={styles.deleteButton}>
                <FaTrashAlt size={16} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noTasks}>No tasks available. Start adding some!</p>
      )}
    </div>
  );
}

export default TaskList;
