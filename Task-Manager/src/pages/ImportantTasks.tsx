import TaskList from "../components/TaskList";
import styles from "./AllTasks.module.less"; // Reusing styles from AllTasks

const ImportantTasks = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardsLayout}>
        <TaskList showOnlyImportant={true} />
      </div>
    </div>
  );
};

export default ImportantTasks;
