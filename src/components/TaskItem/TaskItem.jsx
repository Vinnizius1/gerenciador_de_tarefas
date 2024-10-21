// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../services/api";
import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/* Representa uma tarefa individual.
   Cada TaskItem pode ser editado ou deletado. Utiliza useState para gerenciar o estado de edição localmente e faz requisições PUT/DELETE */
function TaskItem({ task, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title); // Armazena o título editado da tarefa

  // Alterna o modo de edição e salva a tarefa se necessário
  const editTask = async () => {
    if (isEditing) {
      // Se estiver editando, salva a tarefa com o novo título
      const updatedTask = { ...task, title: editedTitle };

      try {
        // Chama a API para EDITAR o título da tarefa
        const response = await api.put(`/tasks/${task.id}`, updatedTask);
        // Chama a função para atualizar o estado no componente pai (TaskList)
        onEditTask(response.data);
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    }
    // Alterna o modo de edição
    setIsEditing(!isEditing);
  };

  // Função para deletar uma tarefa
  const deleteTask = async () => {
    // Exibe um alerta e apenas prossegue se o usuário confirmar (clicar no botão OK)
    if (!window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
      return;
    }

    try {
      // Chama a API para DELETAR a tarefa
      await api.delete(`/tasks/${task.id}`);
      // Chama a função para atualizar o estado no componente pai (TaskList)
      onDeleteTask(task.id);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <div className={styles.taskItem}>
      {isEditing ? (
        <>
          {/* Modo de Edição */}
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          <Button type="button" color="#4CAF50" onClick={editTask}>
            Salvar
          </Button>
          <Button
            type="button"
            color="#E74C3C"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </Button>
        </>
      ) : (
        <>
          {/* Modo Normal */}
          <span className={styles.status}>{task.title}</span>
          <Button type="button" color="#4CAF50" onClick={editTask}>
            Editar
          </Button>
          <Button type="button" color="#E74C3C" onClick={deleteTask}>
            Deletar
          </Button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
