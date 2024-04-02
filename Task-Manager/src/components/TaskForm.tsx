import React, { useEffect, useState } from "react";
import { Input, Switch, Button, message } from "antd";
import { Task } from "../interfaces/Task";
import styles from "./TaskForm.module.less";

interface TaskFormProps {
  addTask: (task: Task) => void;
  editingTask: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, editingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (!editingTask) {
      setTitle("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      setCompleted(false);
      setImportant(false);
    } else {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDate(editingTask.date);
      setCompleted(editingTask.completed);
      setImportant(editingTask.important);
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!title || !description || !date) {
      message.error("Please fill in all fields.");
      return;
    }

    const taskData: Task = {
      id: editingTask
        ? editingTask.id
        : Math.random().toString(36).substr(2, 9),
      title,
      description,
      date,
      completed,
      important,
    };

    addTask(taskData);
    message.success("Task is added successfully");

    if (!editingTask) {
      setTitle("");
      setDescription("");
      setDate("");
      setCompleted(false);
      setImportant(false);
    }
  };
  return (
    <form className={styles.taskForm} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles.taskTitle}>Create a task</h1>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        placeholder="Title"
      />
      <Input.TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textArea}
        placeholder="Description"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.datePicker}
      />
      <div className={styles.switchContainer}>
        <label className={styles.label}>Toggle Completed</label>
        <Switch checked={completed} onChange={setCompleted} />
      </div>
      <div className={styles.switchContainer}>
        <label className={styles.label}>Toggle Important</label>
        <Switch checked={important} onChange={setImportant} />
      </div>
      <Button onClick={handleSubmit} className={styles.createTaskButton}>
        {editingTask ? "Update Task" : "Create Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
