import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../Button/Button";
import styles from "./TaskFormInput.module.css";

/* Formulário com input para adicionar a tarefa digitada pelo usuário */
const TaskFormInput = ({ onTaskSubmit }) => {
  const [task, setTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef(null);

  /* ÚNICA FUNÇÃO DESTE COMPONENTE */
  const handleSubmit = e => {
    e.preventDefault();

    // Verifica se o input está vazio
    if (task === "") return;

    // Muda o estado para verdadeiro mostrando assim o texto "Adicionando..."
    setIsSubmitting(true);

    setTimeout(() => {
      // Cria um objeto com o título da tarefa escrito pelo usuário
      const taskCreated = {
        id: uuidv4(),
        title: task.trim(),
      };

      /* PROP AQUI */
      onTaskSubmit(taskCreated); // Notifica o componente pai
      /* PROP AQUI */

      setTask(""); // Limpa o input
      inputRef.current.focus(); // Foca no input
      setIsSubmitting(false); // Volta o estado para falso mostrando o texto "Adicionar"

      console.log(taskCreated);
    }, 1000);
  };

  return (
    <form className={styles.TaskFormInput} onSubmit={handleSubmit}>
      <label htmlFor="task" className={styles.label}>
        Nome da Tarefa:
      </label>
      <input
        className={styles.input}
        type="text"
        id="task"
        ref={inputRef}
        value={task}
        onChange={e => setTask(e.target.value)}
      />

      <Button color="#4CAF50" type="submit" className={styles.button}>
        {isSubmitting ? "Adicionando..." : "Adicionar"}
      </Button>
    </form>
  );
};

export default TaskFormInput;
