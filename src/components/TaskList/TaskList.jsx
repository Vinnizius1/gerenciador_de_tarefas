// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import api from "../../services/api";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";
import TaskFormInput from "../TaskFormInput/TaskFormInput";
import Button from "../Button/Button";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // Adicionado para capturar erro de rede

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/tasks", { timeout: 5000 }); //
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Erro ao buscar tarefas. Verifique sua conexão com o servidor.");
    }
  };

  const onTaskAdded = newTask => {
    setTasks(() => [...tasks, newTask]);
  };

  const onEditTask = updatedTask => {
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const onDeleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Função para deletar todas as tarefas
  const deleteAllTasks = async () => {
    if (!window.confirm("Tem certeza que deseja deletar todas as tarefas?")) {
      return;
    }
    console.log(tasks);
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
  console.log(tasks);

  return (
    <>
      <h2 className={styles.title}>Minhas Tarefas</h2>

      {/* Exibe erro caso ocorra */}
      {error && <p className={styles.error}>{error}</p>}

      {/* TELA DE CADASTRO DE TAREFA */}
      <TaskFormInput onTaskAdded={onTaskAdded} />

      {/* TELA DE LISTAGEM DE TAREFAS */}
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id}>
            {/* TELA DE LISTAGEM DE TAREFAS - ITEM DA TELA DE LISTAGEM DE TAREFAS */}
            <TaskItem
              task={task}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          </li>
        ))}
      </ul>

      {/* Se a lista de tarefas estiver vazia, exibe mensagem. Se existir, exibe... */}
      {tasks.length === 0 ? (
        <p className={styles.noTasks}>Nenhuma tarefa adicionada</p>
      ) : (
        <Button onClick={deleteAllTasks}>Apagar todas as tarefas</Button>
      )}
    </>
  );
};

export default TaskList;
