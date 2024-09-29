// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./TaskItem.module.css";

/* Componente que receberá cada tarefa/item, renderizará uma <li> e permitirá que o usuário altere o estado da tarefa clicando na tag <span> por meio da função "onToggleTask", que é recebida do componente pai "App.jsx" */
function TaskItem({ task, onToggleTask, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false); // Cria um estado para controlar o modo de edição da tarefa
  const [newTitle, setNewTitle] = useState(task.title); // Cria um estado para armazenar o novo título da tarefa

  // Habilita o modo de edição
  const handleEdit = () => {
    if (isEditing) {
      onEditTask(task.id, newTitle); // Se estiver editando, chama a função "onEditTask" passando o ID da tarefa e o novo título da tarefa
    }
    setIsEditing(!isEditing); // Se não estiver editando, habilita o modo de edição
  };

  return (
    <li
      key={task.id}
      className={`${styles.taskItem} ${
        task.completed ? styles.completed : styles.pending
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
      ) : (
        <span className={styles.status} onClick={() => onToggleTask(task.id)}>
          {task.title} {task.completed ? "(Concluída)" : "(Pendente)"}
        </span>
      )}

      <button onClick={handleEdit}>{isEditing ? "Salvar" : "Editar"}</button>

      <button onClick={() => onDeleteTask(task.id)}>Excluir</button>
    </li>
  );
}

export default TaskItem;
