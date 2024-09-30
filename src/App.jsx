import "./App.css";
import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import TaskFormInput from "./components/TaskFormInput/TaskFormInput";
import TaskList from "./components/TaskList/TaskList";

import axios from "axios";
import { fetchTasks } from "./api/api";

function App() {
  // Array que armazenará as tarefas criadas no componente "filho" TaskFormInput
  const [tasks, setTasks] = useState([]);

  // Função para carregar as tarefas da API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks); // Atualiza o estado com as tarefas da API
      } catch (error) {
        console.error("Erro ao carregar as tarefas:", error);
      }
    };

    // Chama a função para carregar as tarefas
    loadTasks();
  }, []);

  // Função para adicionar uma nova tarefa
  const addTask = newTask => {
    // Cria uma nova tarefa
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        userId: tasks.length + 1,
        title: newTask,
        completed: false,
      })
      .then(response => {
        setTasks(prevTasks => [
          ...prevTasks,
          {
            ...response.data,
            id: Date.now(), // Cria um ID único que neste caso, sobreescreve o ID que vem da API
          },
        ]);
      })
      .catch(error => {
        console.error("Erro ao adicionar tarefa:", error);
      });
  };

  // Função para alternar o status da tarefa (PUT)
  const onToggleTask = async taskId => {
    // Encontra a tarefa "taskId" dentro do array "tasks", e armazena na variável "task"
    const task = tasks.find(task => task.id === taskId);

    // Altera o status da tarefa "taskId" para o oposto
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    // Chama a API para alterar o status da tarefa "taskId"
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        ...updatedTask,
      });
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Erro ao alterar o status da tarefa:", error);
    }
  };

  // Função para deletar uma tarefa ("taskId") a partir do componente "filho" TaskList e depois do componente "filho" TaskItem
  const onDeleteTask = async taskId => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`
      );
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  // Função para editar uma tarefa ("taskId")
  // Altera o "title" da tarefa para o novo título ("newTitle") fornecido pelo usuário
  const onEditTask = (taskId, newTitle) => {
    // Encontra a tarefa "taskId" dentro do array "tasks", e armazena na variável "task"
    const task = tasks.find(task => task.id === taskId);

    // Chama a API para editar o "title" da tarefa "taskId"
    try {
      axios.put(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        ...task,
        title: newTitle,
      });
      // Faz o map para encontrar a tarefa "taskId" e alterar o "title"
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, title: newTitle } : task
        )
      );
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  return (
    <>
      <Header />

      <TaskFormInput addTask={addTask} />

      <TaskList
        tasks={tasks}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
    </>
  );
}

export default App;
