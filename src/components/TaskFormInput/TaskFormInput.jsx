import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../../services/api";
import Button from "../Button/Button";
import styles from "./TaskFormInput.module.css";

/* Formulário com input para adicionar nova tarefa. 
Recebe o input do usuário, envia uma requisição POST para adicionar uma tarefa e chama a função "onTaskAdded" para atualizar a lista de tarefas no estado do componente pai TaskList.
*/
const TaskFormInput = ({ onTaskSubmit }) => {
  const [task, setTask] = useState("");
  const inputRef = useRef(null);

  /* ÚNICA FUNÇÃO DESTE COMPONENTE */
  const handleSubmit = async e => {
    e.preventDefault();
    if (task === "") return;

    // Cria um objeto com o título da tarefa
    const taskCreated = {
      id: uuidv4(),
      title: task,
    };

    onTaskSubmit(taskCreated); // Notifica o componente pai

    /*     try {
      // Envia uma requisição POST para adicionar uma nova tarefa a API
      const postResponse = await api.post("/tasks", taskCreated);
      console.log(postResponse.data);
      // Envia o objeto da resposta do servidor para atualizar a lista "tasks" no estado do componente pai TaskList
      onTaskAdded(postResponse.data);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    } */
    // Limpa o input e depois foca nele
    setTask("");
    inputRef.current.focus();
    console.log(taskCreated);
  };

  return (
    <form className={styles.TaskFormInput} onSubmit={handleSubmit}>
      <label htmlFor="task" className={styles.label}>
        Nome da Tarefa:
      </label>
      {/* <label htmlFor="task"> */}
      <input
        className={styles.input}
        type="text"
        id="task"
        ref={inputRef}
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      {/* </label> */}

      <Button color="#4CAF50" type="submit" className={styles.button}>
        Adicionar
      </Button>
    </form>
  );
};

export default TaskFormInput;
