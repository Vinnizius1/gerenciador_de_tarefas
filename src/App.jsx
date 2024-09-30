import "./App.css";

// Importando o hook "useTasks"
import { useTasks } from "./hooks/useTasks";

// Importando os componentes
import Header from "./components/Header/Header";
import TaskFormInput from "./components/TaskFormInput/TaskFormInput";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";

function App() {
  // Destructuring do hook "useTasks" para recuperar as funções de manipulação das tarefas
  // O benefício de um hook personalizado é que o mesmo pode ser usado em outros locais
  const { addTask, tasks, onToggleTask, onDeleteTask, onEditTask } = useTasks();

  // Retorna os componentes principais da aplicação e passa as funções de manipulação das tarefas como propriedades
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

      <Footer />
    </>
  );
}

export default App;
