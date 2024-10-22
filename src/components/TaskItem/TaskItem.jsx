// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../services/api";
import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/* Representa uma tarefa individual.
   Cada TaskItem pode ser editado ou deletado. Utiliza useState para gerenciar o estado de edição localmente e faz requisições PUT/DELETE */
function TaskItem({ task, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false); // Começa desativado (falso)
  const [editedTitle, setEditedTitle] = useState(task.title); // Armazena o título editado da tarefa

  // Alterna o modo de edição e salva a tarefa se necessário
  const editTask = async () => {
    console.log("Edit mode:", isEditing); // Verifica se estamos no modo de edição
    console.log("Edited title before save:", editedTitle); // Verifica o título editado
    if (isEditing) {
      // Se estiver editando, salva a tarefa com o novo título
      const updatedTask = { ...task, title: editedTitle };
      console.log("Task to update:", updatedTask); // Verifica a tarefa antes da requisição
      try {
        // Chama a API para EDITAR o título da tarefa
        const response = await api.put(`/tasks/${task.id}`, updatedTask);
        console.log("API response:", response.data); // Verifica a resposta da API
        // Chama a função para atualizar o estado no componente pai (TaskList)
        onEditTask(response.data);
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    }
    // TÉRMINO DO "IF" responsável pela edição
    // Alterna o modo de edição
    setIsEditing(!isEditing);
    console.log("New edit mode:", !isEditing); // Verifica o novo estado após alternar o modo de edição
  };

  // Função para deletar uma tarefa
  const deleteTask = async () => {
    console.log("Delete task triggered"); // Verifica se a função foi acionada
    // Exibe um alerta e apenas prossegue se o usuário confirmar (clicar no botão OK)
    if (!window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
      console.log("User canceled delete"); // Caso o usuário cancele
      return;
    }

    try {
      // Chama a API para DELETAR a tarefa
      await api.delete(`/tasks/${task.id}`);
      console.log("Task deleted successfully:", task.id); // Verifica o ID da tarefa deletada
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
          {/* Input que será exibido se estiver editando */}
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          {/* Se estiver editando, o botão "Salvar" terá o onClick referenciando a função "editTask" */}
          <Button type="button" color="#4CAF50" onClick={editTask}>
            Salvar
          </Button>

          {/* Se estiver editando, exibirá um botão para cancelar */}
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
          {/* Modo normal, ou seja, fora de edição, apenas exibirá o título da tarefa */}
          <span className={styles.status}>{task.title}</span>

          {/* Se não estiver editando, o botão "Editar" terá o onClick chamará a função "editTask" e, após clicado, "isEditing" será alterado para true e exibirá o "input" para edição */}
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
