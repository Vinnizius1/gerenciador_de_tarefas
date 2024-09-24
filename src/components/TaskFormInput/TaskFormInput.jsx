// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./TaskFormInput.module.css";

/* Formulário com input para adicionar uma nova tarefa */
const TaskFormInput = ({ addTask }) => {
  // Cria um estado para armazenar o texto/valor da tarefa
  const [newTask, setNewTask] = useState("");

  // Função que é chamada ao enviar o formulário (submit)
  const handleSubmit = e => {
    e.preventDefault();
    // Verifica se o campo de texto é vazio e se sim, aborta o envio
    if (newTask === "") return;

    // Chama a função recebida via "props" do componente pai "App.jsx" para criar uma nova tarefa
    addTask(newTask);

    setNewTask(""); // Limpa o campo de texto após o envio
  };

  return (
    <form className={styles.TaskFormInput} onSubmit={handleSubmit}>
      <label htmlFor="newTask">
        <input
          className={styles.input}
          type="text"
          id={styles.newTask}
          placeholder="Adicionar Tarefa"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
      </label>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskFormInput;
