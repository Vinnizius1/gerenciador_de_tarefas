// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/* Representa uma tarefa individual.
Cada TaskItem pode ser editado ou deletado. Utiliza useState para gerenciar o estado de edição localmente e faz requisições PUT/DELETE 
*/

function TaskItem({ task, onToggleTask = null, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title); // Armazena o título editado da tarefa

  // Função para habilitar o modo de edição do título da tarefa
  const handleEditTask = () => {
    if (isEditing) {
      onEditTask(task.id, editedTitle); // Se estiver editando, chama a função "onEditTask" passando o ID da tarefa e o novo título da tarefa
    }
    setIsEditing(!isEditing); // Se não estiver editando, habilita o modo de edição
  };

  return (
    <div
      key={task.id}
      className={`${styles.taskItem} ${
        task.completed ? styles.completed : styles.pending
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
        />
      ) : (
        <span className={styles.status} onClick={() => onToggleTask(task.id)}>
          {task.title} {task.completed ? "(Concluída)" : "(Pendente)"}
        </span>
      )}

      <Button type="button" color="#4CAF50" onClick={handleEditTask}>
        {isEditing ? "Salvar" : "Editar"}
      </Button>

      <Button
        type="button"
        color="#E74C3C"
        onClick={() => onDeleteTask(task.id)}
      >
        Deletar
      </Button>
    </div>
  );
}

export default TaskItem;
