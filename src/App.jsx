import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import TaskFormInput from "./components/TaskFormInput/TaskFormInput";
import TaskList from "./components/TaskList/TaskList";

function App() {
  // Array que armazenará as tarefas criadas no componente "filho" TaskFormInput
  const [tasks, setTasks] = useState([]);

  // Adiciona uma nova tarefa ("newTask") a partir do componente "filho" TaskFormInput e atualiza o array de tarefas "tasks"
  const addTask = newTask => {
    // Adiciona no array de tarefas o novo item ("newTask"), que é um objeto com as propriedades: "id", "title" e "completed"
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        title: newTask,
        completed: false,
      },
    ]);
  };

  // Alterna o estado de uma tarefa ("taskId") a partir do componente "filho" TaskList que, depois, passa a função para o outro componente "filho" TaskItem (efeito de "prop drilling")
  const onToggleTask = taskId => {
    // Atualiza o array de tarefas atual ("prevTasks") com o novo estado da tarefa alterado (true vira false, e vice-versa)
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Função para deletar uma tarefa ("taskId") a partir do componente "filho" TaskList e depois do componente "filho" TaskItem
  const onDeleteTask = taskId => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Função para editar uma tarefa ("taskId")
  // Altera o "title" da tarefa para o novo título ("newTitle") fornecido pelo usuário
  const onEditTask = (taskId, newTitle) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
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
