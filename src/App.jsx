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

  return (
    <>
      <Header />

      <TaskFormInput addTask={addTask} />

      <TaskList tasks={tasks} />
    </>
  );
}

export default App;
