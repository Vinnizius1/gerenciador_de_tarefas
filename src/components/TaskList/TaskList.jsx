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

  const handleTaskAdded = newTask => {
    setTasks(() => [...tasks, newTask]);
  };

  const handleTaskUpdated = updatedTask => {
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <>
      <h2>Minhas Tarefas</h2>
      {error && <p>{error}</p>} {/* Exibe erro caso ocorra */}
      <TaskFormInput onTaskAdded={handleTaskAdded} />
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onDeleteTask={handleTaskDeleted}
              onEditTask={handleTaskUpdated}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
