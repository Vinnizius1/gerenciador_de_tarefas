// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import { useState, useRef } from "react";
import api from "../../services/api";
import Button from "../Button/Button";
import styles from "./TaskFormInput.module.css";

/* Formulário com input para adicionar nova tarefa. 
Recebe o input do usuário, envia uma requisição POST para adicionar uma tarefa e chama a função "onTaskAdded" para atualizar a lista de tarefas no estado do componente pai TaskList.
*/
const TaskFormInput = ({ onTaskAdded }) => {
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();

    if (newTask === "") return;

    const task = { title: newTask };

    try {
      const response = await api.post("/tasks", task);
      onTaskAdded(response.data); // Usa o objeto retornado da API para atualizar a lista de tarefas "tasks" no estado do componente pai TaskList
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }

    setNewTask("");
    inputRef.current.focus();
  };

  return (
    <form className={styles.TaskFormInput} onSubmit={handleSubmit}>
      <label htmlFor="newTask">
        <input
          className={styles.input}
          type="text"
          id={styles.newTask}
          placeholder="Adicionar Tarefa"
          ref={inputRef}
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
      </label>

      <Button color="#4CAF50" type="submit">
        Adicionar Tarefa
      </Button>
    </form>
  );
};

export default TaskFormInput;
