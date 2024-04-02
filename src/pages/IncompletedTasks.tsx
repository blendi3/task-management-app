import TaskList from "../components/TaskList";
import styles from "./AllTasks.module.less"; // Reusing styles from AllTasks

const IncompletedTasks = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardsLayout}>
        <TaskList showOnlyIncompleted={true} />
      </div>
    </div>
  );
};

export default IncompletedTasks;
