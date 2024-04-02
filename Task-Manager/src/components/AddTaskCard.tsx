import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./AddTaskCard.module.less";

interface AddTaskCardProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const AddTaskCard: React.FC<AddTaskCardProps> = ({ onClick }) => {
  return (
    <div className={styles.addCard} onClick={onClick}>
      <PlusOutlined className={styles.addIcon} />
      <span>Add New Task</span>
    </div>
  );
};

export default AddTaskCard;
