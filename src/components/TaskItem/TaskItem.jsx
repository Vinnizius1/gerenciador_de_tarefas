// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/* Componente que receberá cada tarefa do "array de tarefas" do componente pai TaskList. 
Depois permitirá que o usuário altere o estado da tarefa clicando na tag <span> por meio da função "onToggleTask". 
Observações: 
- O componente TaskList passa as funções "onToggleTask", "onDeleteTask" e "onEditTask" do componente principal "App.jsx" (efeito de "prop drilling")
- O componente TaskList passa uma "task", objeto com as propriedades "id", "title" e "completed", que é o resultado do "map" no array de tarefas recebido do componente principal "App.jsx"
*/

function TaskItem({ task, onToggleTask, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false); // Cria um estado para controlar o modo de edição da tarefa
  const [newTitle, setNewTitle] = useState(task.title); // Armazena o novo título da tarefa

  // Função para habilitar o modo de edição do título da tarefa
  const handleEditTask = () => {
    if (isEditing) {
      onEditTask(task.id, newTitle); // Se estiver editando, chama a função "onEditTask" passando o ID da tarefa e o novo título da tarefa
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
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
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
