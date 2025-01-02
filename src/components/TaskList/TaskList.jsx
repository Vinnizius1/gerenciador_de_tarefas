import { useEffect, useState } from "react";
import { api, getTasks, postTasks } from "../../services/api";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";
import TaskFormInput from "../TaskFormInput/TaskFormInput";
import Button from "../Button/Button";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // Adicionado para capturar erro de rede

  // BUSCA TODAS AS TAREFAS QUANDO O APP CARREGA
  useEffect(() => {
    const fetchData = async () => {
      try {
        /*         const response = await api.get("/tasks", { timeout: 6000 }); // Define o timeout de 5 segundos, se a requisição demorar mais, mostra o erro de rede
        setTasks(response.data); */

        const response = await getTasks();
        setTasks(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(
          "Erro ao buscar tarefas. Verifique sua conexão com o servidor."
        );
      }
    };

    fetchData();
  }, []);

  // FUNÇÃO PRINCIPAL DO APP
  const handleTaskSubmit = async newTask => {
    try {
      /*       const response = await api.post("/tasks", newTask);
      console.log(response.data);
      setTasks([...tasks, response.data]); // Adiciona a tarefa () retornada pela API */
      const response = await postTasks(newTask);
      setTasks([...tasks, response]);
      console.log(tasks, response);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError(
        "Erro ao adicionar tarefa. Por favor, tente novamente mais tarde."
      );
    }
  };

  // ATUALIZA 1 TAREFA
  const onEditTask = async updatedTask => {
    console.log(updatedTask);
    console.log(tasks);
    try {
      // Chama a API para ATUALIZAR a tarefa
      await api.put(`/tasks/${updatedTask.id}`, updatedTask);

      // Compara o id da tarefa editado no componente filho TaskItem com o id de cada tarefa no array tasks e então atualiza APENAS a tarefa correspondente
      setTasks(
        tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // DELETA 1 TAREFA
  const onDeleteTask = async taskId => {
    try {
      // Chama a API para DELETAR a tarefa
      await api.delete(`/tasks/${taskId}`);

      // Compara o id da tarefa deletada no componente filho TaskItem com o id de cada tarefa no array tasks e então remove a tarefa correspondente por meio do função FILTER
      setTasks(tasks.filter((_, index) => index !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // DELETA TODAS AS TAREFAS
  const deleteAllTasks = async () => {
    if (!window.confirm("Tem certeza que deseja deletar todas as tarefas?")) {
      return;
    }

    try {
      // 1. Buscar todas as tarefas
      const response = await api.get("/tasks");
      const tasksToDelete = response.data;

      // 2. Deletar cada tarefa individualmente
      await Promise.all(
        tasksToDelete.map(async task => {
          await api.delete(`tasks/${task.id}`);
        })
      );

      // 3. Limpar o estado das tarefas localmente
      setTasks([]);
    } catch (error) {
      console.error("Error deleting all tasks:", error);
      setError("Erro ao deletar todas as tarefas. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <h2 className={styles.title}>Minhas Tarefas</h2>

      {error && <p className={styles.error}>{error}</p>}

      {/* FORMULARIO DE ADICIONAR NOVA TAREFA */}
      <TaskFormInput onTaskSubmit={handleTaskSubmit} />

      {tasks.length > 0 ? (
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <li key={task.id}>
              {/* ITEM DA TELA DE LISTAGEM DE TAREFAS */}
              <TaskItem
                task={task}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noTasks}>Nenhuma tarefa adicionada</p>
      )}

      {tasks.length > 1 && (
        <Button onClick={deleteAllTasks}>Apagar todas as tarefas</Button>
      )}
    </>
  );
};

export default TaskList;
