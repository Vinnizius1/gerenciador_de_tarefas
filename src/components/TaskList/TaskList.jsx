// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

/* Componente que receberá tarefas do array no componente "App.jsx" e renderizará cada uma delas como numa lista */

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  return (
    // Usa o método map() para iterar sobre o array de tarefas e renderiza um <li> para cada tarefa
    // A tag span com a classe "status" possibilitará a estilização dos textos

    <>
      <h2>Minhas Tarefas</h2>

      <ul className={styles.taskList}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
