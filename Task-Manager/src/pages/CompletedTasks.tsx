import TaskList from "../components/TaskList";
import styles from "./AllTasks.module.less"; // Reusing styles from AllTasks

const CompletedTasks = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardsLayout}>
        <TaskList showOnlyCompleted={true} />
      </div>
    </div>
  );
};

export default CompletedTasks;
