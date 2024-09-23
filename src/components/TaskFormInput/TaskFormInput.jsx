// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./TaskFormInput.module.css";

/* Formulário com input para adicionar uma nova tarefa */
const TaskFormInput = ({ addTask }) => {
  // Cria um estado para armazenar o texto da tarefa
  const [task, setTask] = useState("");

  // Função que é chamada ao enviar o formulário (submit)
  const handleSubmit = e => {
    e.preventDefault();

    if (task.trim()) {
      console.log(task);
      // Chama a função recebida via "props" para adicionar uma nova tarefa
      addTask({ title: task, completed: false });

      setTask(""); // Limpa o campo de texto após o envio
    }
  };

  return (
    <form className={styles.TaskFormInput} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Adicionar Tarefa"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskFormInput;
