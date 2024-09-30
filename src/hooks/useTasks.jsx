import axios from "axios";

import { useState, useEffect } from "react";

/* Hook personalizado para manipular todas as funções CRUD das tarefas */
export const useTasks = () => {
  // Cria um estado para armazenar as tarefas dentro do array
  const [tasks, setTasks] = useState([]);

  // Chama a API assim que o componente for montado para buscar as tarefas no array "tasks"
  useEffect(() => {
    // Atualiza o array "tasks" pela função "setTasks"
    fetchTasks()
      .then(fetchedTasks => setTasks(fetchedTasks))
      .catch(error => console.error("Erro ao carregar as tarefas:", error));
  }, []);

  ////////////////////////////////
  /* Funções auxiliares do CRUD */
  ////////////////////////////////

  // Função para buscar tarefas (GET)
  async function fetchTasks() {
    // Definir a URL base da API
    const API_URL = "https://jsonplaceholder.typicode.com/todos";

    // Função para buscar tarefas (GET)
    try {
      const response = await axios.get(`${API_URL}?_limit=1`);

      // Retorna o array de tarefas
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
      throw error;
    }
  }
  // Função para adicionar uma nova tarefa (POST)
  const addTask = newTask => {
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
            id: prevTasks.length + 1, // Cria um ID único que neste caso, sobreescreve o ID que vem da API
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

  // Função para editar o título da tarefa (PUT)
  const onEditTask = async (taskId, newTitle) => {
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

  // Função para deletar uma tarefa (DELETE)
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

  // Retorna um objeto com as funções "tasks", "addTask", "onToggleTask", "onEditTask" e "onDeleteTask"
  // Isso permite que as funções sejam passadas como propriedade para os componentes que os chamam
  return {
    tasks,
    addTask,
    onEditTask,
    onDeleteTask,
    onToggleTask,
  };
};
