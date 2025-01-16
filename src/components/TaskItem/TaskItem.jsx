import { useState } from "react";
import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/* Representa uma tarefa individual.
   Cada TaskItem pode ser editado ou deletado. Utiliza useState para gerenciar o estado de edição localmente e faz requisições PUT/DELETE */
function TaskItem({ task, onEditTask, onDeleteTask, moveTaskUp, moveTaskDown }) {
  // Estados locais para gerenciar o modo de edição
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  // EDITA 1 TAREFA
  const editTask = () => {
    if (isEditing) {
      /* Explicação sobre o Nullish Coalescing (?? ""):
O operador de coalescência nula ?? é usado para fornecer um valor padrão de "" (string vazia) se editedTitle?.trim() resultar em null ou undefined. Isso evita que o título atualizado seja undefined. */

      // Se estiver editando, salva a tarefa com o novo título dentro da variável "updatedTask"
      const updatedTask = { ...task, title: editedTitle?.trim() ?? "" };
      console.log(task);

      // Verifica se o título da tarefa está vazio
      if (updatedTask.title === "") {
        alert("Por favor, digite um título.");
        return;
      }
      /*       else {
        updatedTask.title = updatedTask.title.trim();
      } */
      console.log(updatedTask);

      /* PROP AQUI */
      onEditTask(updatedTask); // Notifica o componente pai
      /* PROP AQUI */
    }

    // Inverte o estado de edição
    setIsEditing(prevState => !prevState);
  };

  // DELETA 1 TAREFA
  const deleteTask = id => {
    console.log(id);
    // Exibe um alerta e apenas prossegue se o usuário confirmar (clicar no botão OK)
    if (
      !window.confirm(
        `Tem certeza que deseja deletar esta tarefa "${task.title}"?`
      )
    ) {
      return;
    }

    /* PROP AQUI */
    onDeleteTask(id);
    /* PROP AQUI */
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
          <Button
            type="button"
            color="#E74C3C"
            onClick={() => deleteTask(task.id)}
          >
            Deletar
          </Button>

          <button className={styles.moveButton} onClick={() => moveTaskUp(task.id)}>☝️</button>
          <button className={styles.moveButton} onClick={() => moveTaskDown(task.id)}>👇</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
