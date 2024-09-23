import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import TaskFormInput from "./components/TaskFormInput/TaskFormInput";
import TaskList from "./components/TaskList/TaskList";

function App() {
  // Estado para gerenciar as tarefas
  const [tasks, setTasks] = useState([]);

  // Adiciona uma nova tarefa
  const addTask = newTask => {
    setTasks(prevTasks => [...prevTasks, { id: Date.now(), ...newTask }]);
  };

  //Alterna o estado de uma tarefa
  const onToggleTask = taskId => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <Header />

      <TaskFormInput addTask={addTask} />

      <TaskList tasks={tasks} onToggleTask={onToggleTask} />
    </>
  );
}

export default App;
