import { useState } from "react";
import api from "../../services/api";
import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/* Representa uma tarefa individual.
   Cada TaskItem pode ser editado ou deletado. Utiliza useState para gerenciar o estado de edição localmente e faz requisições PUT/DELETE */
function TaskItem({ task, onEditTask, onDeleteTask }) {
  // Estados locais para gerenciar o modo de edição
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  // Alterna o modo de edição e salva a tarefa se necessário
  const editTask = async () => {
    if (isEditing) {
      // Se estiver editando, salva a tarefa com o novo título na variável "updatedTask"
      const updatedTask = { ...task, title: editedTitle };

      // Verifica se o título da tarefa está vazio
      if (updatedTask.title === "") {
        alert("Por favor, digite um título.");
        return;
      }

      // TRY/CATCH para lidar com erros
      try {
        const response = await api.put(`/tasks/${task.id}`, updatedTask);

        // Chama a função para atualizar o estado no componente pai (TaskList)
        onEditTask(response.data);
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    }

    // Inverte o estado de edição
    setIsEditing(prevState => !prevState);
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
          {/* Input que será exibido se estiver editando */}
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />

          {/* A função "editTask" alterará o título da tarefa com o valor de "editedTitle" (resultado da propriedade "value" do input) */}
          <Button color="#4CAF50" onClick={editTask} className={styles.button}>
            Salvar
          </Button>

          {/* Se clicar no botão Cancelar, o modo de edição será alterado para "false" */}
          <Button color="#E74C3C" onClick={() => setIsEditing(false)}>
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
