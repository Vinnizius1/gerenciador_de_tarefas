// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import styles from "./TaskList.module.css";

/* Componente que receberá tarefas (via props) e renderizará cada uma delas como numa lista */

function TaskList({ tasks }) {
  return (
    // Usa o método map() para iterar sobre a lista e renderizar um <li> para cada tarefa.
    // A tag span com a classe "status" possibilitará a estilização dos textos

    <div>
      <h2>Minhas Tarefas</h2>

      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li
            key={task.id}
            className={`${styles.taskItem} ${
              task.completed ? styles.completed : styles.pending
            }`}
          >
            {task.title}
            <span className={styles.status}>
              {task.completed ? "(Concluída)" : "(Pendente)"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
