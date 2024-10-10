// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import api from "../../services/api";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";
import TaskFormInput from "../TaskFormInput/TaskFormInput";

/* Componente que receberá tarefas do array no componente "App.jsx" e renderizará cada uma delas como numa lista */

const TaskList = () => {
  //
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Optionally display an error message to the user
      }
    };
    fetchData();
  }, []);

  //
  const handleTaskAdded = newTask => {
    setTasks([...tasks, newTask]);
  };

  //
  const handleTaskUpdated = updatedTask => {
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  //
  const handleTaskDeleted = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <>
      <h2>Minhas Tarefas</h2>

      <TaskFormInput onTaskAdded={handleTaskAdded} />

      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id}>
            <TaskItem
              task={task}
              // onToggleTask={onToggleTask}
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
