// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../services/api";
import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/* Representa uma tarefa individual.
Cada TaskItem pode ser editado ou deletado. Utiliza useState para gerenciar o estado de edição localmente e faz requisições PUT/DELETE 
*/

function TaskItem({ task, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title); // Armazena o título editado da tarefa

  const handleToggleEdit = async () => {
    setIsEditing(!isEditing);

    if (!isEditing) {
      const updatedTask = { ...task, title: editedTitle };
      try {
        const response = await api.put(`/tasks/${task.id}`, updatedTask);
        onEditTask(response.data);
      } catch (error) {
        // Lidar com erros da requisição
        console.error("Erro ao atualizar tarefa:", error);
      }
    }
  };

  // Requisição DELETE para deletar a tarefa
  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onDeleteTask(task.id);
    } catch (error) {
      // Lidar com erros da requisição
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <div key={task.id} className={styles.taskItem}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          <Button type="button" color="#4CAF50" onClick={handleToggleEdit}>
            Salvar
          </Button>
          <Button type="button" color="#E74C3C" onClick={handleToggleEdit}>
            Cancelar
          </Button>
        </>
      ) : (
        <span className={styles.status}>{task.title}</span>
      )}
      <Button type="button" color="#4CAF50" onClick={handleToggleEdit}>
        Editar
      </Button>
      <Button type="button" color="#E74C3C" onClick={deleteTask}>
        Deletar
      </Button>
    </div>
  );
}

export default TaskItem;
