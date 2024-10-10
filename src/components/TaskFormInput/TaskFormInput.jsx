// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import { useState, useRef } from "react";
import Button from "../Button/Button";
import styles from "./TaskFormInput.module.css";

/* Formulário com input para adicionar nova tarefa. 
Recebe o input do usuário, envia uma requisição POST para adicionar uma tarefa e chama a função "onTaskAdded" para atualizar a lista de tarefas no estado do componente pai TaskList.
*/
const TaskFormInput = ({ addTask }) => {
  const [newTask, setNewTask] = useState(""); // Armazena o texto da tarefa criada

  // Cria uma referência para o campo de título
  const inputRef = useRef(null);

  // Função que é chamada ao enviar o formulário (submit)
  const handleSubmit = e => {
    e.preventDefault();

    if (newTask === "") return; // Verifica se o campo de texto é vazio, e caso positivo aborta o envio

    addTask(newTask); // Função recebida do componente pai "App.jsx" que passa o "título" da tarefa criada

    setNewTask(""); // Função local que Limpa o campo de texto após o envio

    inputRef.current.focus(); // Função que faz o foco no campo de texto
  };

  return (
    <form className={styles.TaskFormInput} onSubmit={handleSubmit}>
      <label htmlFor="newTask">
        <input
          className={styles.input}
          type="text"
          id={styles.newTask}
          placeholder="Adicionar Tarefa"
          // Associa a "referência" ao campo de título
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
