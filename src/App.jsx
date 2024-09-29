import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import TaskFormInput from "./components/TaskFormInput/TaskFormInput";
import TaskList from "./components/TaskList/TaskList";

function App() {
  // Array que armazenará todas as tarefas que forem criadas no componente "filho" TaskFormInput
  const [tasks, setTasks] = useState([]);

  // Adiciona uma nova tarefa ("newTask") a partir do componente "filho" TaskFormInput e atualiza o array de tarefas
  const addTask = newTask => {
    // Adiciona na lista de tarefas "tasks" o novo item ("newTask"), que é um objeto com as propriedades "id", "title" e "completed"
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        title: newTask,
        completed: false,
      },
    ]);
    console.log(
      `tasks: ${JSON.stringify(tasks)}, newTask: ${JSON.stringify(newTask)}`
    );
  };

  // Alterna o estado de uma tarefa ("taskId") a partir do componente "filho" TaskList
  const onToggleTask = taskId => {
    // Atualiza a lista de tarefas ("prevTasks") com o estado da tarefa ("task") alterado
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Função para deletar uma tarefa ("taskId") a partir do componente "filho" TaskList e depois do componente TaskItem
  const onDeleteTask = taskId => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Função para editar uma tarefa ("taskId") a partir do componente "filho" TaskList e depois do componente TaskItem
  // Altera o "title" da tarefa para o novo título ("newTitle") fornecido pelo usuário
  const onEditTask = (taskId, newTitle) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
    console.log(tasks);
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
