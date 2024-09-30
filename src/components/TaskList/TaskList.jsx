// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

/* Componente que receberá tarefas do array no componente "App.jsx" e renderizará cada uma delas como numa lista */

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  return (
    // Usa o método map() para iterar sobre o array de tarefas, recebido via "props" do pai "App.jsx", renderizando um <li> para cada tarefa
    // E passa as funções "onToggleTask", "onDeleteTask" e "onEditTask" para o componente "TaskItem" (efeito de "prop drilling")

    <>
      <h2>Minhas Tarefas</h2>

      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
