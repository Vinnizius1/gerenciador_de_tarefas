// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import api from "../../services/api";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";
import TaskFormInput from "../TaskFormInput/TaskFormInput";

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

  return (
    <>
      <h2 className={styles.title}>Minhas Tarefas</h2>
      {error && <p className={styles.error}>{error}</p>}{" "}
      {/* Exibe erro caso ocorra */}
      <TaskFormInput onTaskAdded={onTaskAdded} />
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
