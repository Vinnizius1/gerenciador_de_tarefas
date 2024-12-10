import { useEffect, useState } from "react";
import api from "../../services/api";
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
        const response = await api.get("/tasks", { timeout: 5000 }); //
        setTasks(response.data);
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
      const response = await api.post("/tasks", newTask);
      console.log(response.data);
      setTasks([...tasks, response.data]); // Adiciona a tarefa retornada pela API
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError(
        "Erro ao adicionar tarefa. Por favor, tente novamente mais tarde."
      );
    }
  };

  // ATUALIZA UMA TAREFA
  const onEditTask = updatedTask => {
    console.log(updatedTask);
    console.log(tasks);
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    console.log(tasks);
  };

  const onDeleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
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

      {tasks.length === 0 ? (
        <p className={styles.noTasks}>Nenhuma tarefa adicionada</p>
      ) : (
        <Button onClick={deleteAllTasks}>Apagar todas as tarefas</Button>
      )}
    </>
  );
};

export default TaskList;
