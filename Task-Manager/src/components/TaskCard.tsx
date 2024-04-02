import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./TaskCard.module.less";

interface TaskCardProps {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  removeTask: (id: string) => void;
  id: string;
  toggleCompletion: () => void;
  editTask: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  date,
  completed,
  removeTask,
  toggleCompletion,
  id,
  editTask,
}) => {
  const statusClass = completed
    ? styles.statusComplete
    : styles.statusIncomplete;
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.date}>{date}</p>
      <div className={styles.footer}>
        <span className={statusClass} onClick={toggleCompletion}>
          {completed ? "Complete" : "Incomplete"}
        </span>
        <div className={styles.actions}>
          <EditOutlined onClick={editTask} className={styles.icon} />
          <DeleteOutlined
            className={styles.icon}
            onClick={() => removeTask(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
