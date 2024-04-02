import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import AddTaskCard from "./AddTaskCard";
import { Task } from "../interfaces/Task";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/localStorageUtils";
import { message } from "antd";
import styles from "./TaskList.module.less";

interface TaskListProps {
  showOnlyImportant?: boolean;
  showOnlyCompleted?: boolean;
  showOnlyIncompleted?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  showOnlyImportant = false,
  showOnlyCompleted = false,
  showOnlyIncompleted = false,
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(getTasksFromLocalStorage());
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addOrUpdateTask = (taskData: Task) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) => (task.id === taskData.id ? taskData : task))
      );
    } else {
      setTasks([...tasks, taskData]);
    }
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const editTask = (task: any) => {
    setEditingTask(task);
    showModal();
  };

  const toggleCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    message.success("Task Updated");
  };

  const removeTask = (id: string) => {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
    message.success("Task deleted");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.cardContainer}>
      {tasks
        .filter(
          (task) =>
            (!showOnlyImportant || task.important) &&
            (!showOnlyCompleted || task.completed) &&
            (!showOnlyIncompleted || !task.completed)
        )
        .map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            editTask={() => editTask(task)}
            toggleCompletion={() => toggleCompletion(task.id)}
            removeTask={() => removeTask(task.id)}
          />
        ))}
      <AddTaskCard onClick={showModal} />
      <Modal
        title={editingTask ? "Edit Task" : "Create a New Task"}
        wrapClassName="customModal"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <TaskForm addTask={addOrUpdateTask} editingTask={editingTask} />
      </Modal>
    </div>
  );
};

export default TaskList;
