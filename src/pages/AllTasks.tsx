import TaskList from "../components/TaskList"; // Make sure the path is correct
import styles from "./AllTasks.module.less";

const AllTasks = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardsLayout}>
        <TaskList />
      </div>
    </div>
  );
};

export default AllTasks;
