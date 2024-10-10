import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";
import "./App.css";

/* Ponto de entrada principal - Centraliza a renderização e organiza a estrutura do app */
function App() {
  return (
    <>
      <Header />

      <TaskList />

      <Footer />
    </>
  );
}

export default App;
