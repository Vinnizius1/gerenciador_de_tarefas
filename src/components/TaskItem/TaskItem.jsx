// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import styles from "./TaskItem.module.css";

/* Componente que receberá cada tarefa/item, renderizará uma <li> e permitirá que o usuário altere o estado da tarefa clicando na <li> por meio da função "onToggleTask", que é recebida do componente pai "App.jsx" */
function TaskItem({ task, onToggleTask }) {
  return (
    <li
      key={task.id}
      className={`${styles.taskItem} ${
        task.completed ? styles.completed : styles.pending
      }`}
      onClick={() => onToggleTask(task.id)}
    >
      {task.title}
      <span className={styles.status}>
        {task.completed ? "(Concluída)" : "(Pendente)"}
      </span>
    </li>
  );
}

export default TaskItem;
