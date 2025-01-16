import { useEffect, useState } from "react";
import { api, getTasks, postTasks } from "../../services/api";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";
import TaskFormInput from "../TaskFormInput/TaskFormInput";
import Button from "../Button/Button";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // Adicionado para capturar erro de rede e mostrá-lo na tela

  // BUSCA TODAS AS TAREFAS QUANDO O APP CARREGA
  useEffect(() => {
    const fetchData = async () => {
      // Chama a API para BUSCAR as tarefas
      try {
        const response = await getTasks();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(
          "Erro ao buscar tarefas. Verifique sua conexão com o servidor."
        );
      }
    };

    fetchData();
  }, []);

  // FUNÇÃO PRINCIPAL DO APP
  const handleTaskSubmit = async newTask => {
    try {
      // Chama a API para ADICIONAR a tarefa
      const response = await postTasks(newTask);
      setTasks([...tasks, response]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError(
        "Erro ao adicionar tarefa. Por favor, tente novamente mais tarde."
      );
    }
  };

  // ATUALIZA 1 TAREFA
  const onEditTask = async updatedTask => {
    try {
      // Chama a API para ATUALIZAR a tarefa
      await api.put(`/tasks/${updatedTask.id}`, updatedTask);

      // Compara o id da tarefa editado no componente filho TaskItem com o id de cada tarefa no array tasks e então atualiza APENAS a tarefa correspondente
      setTasks(
        tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // DELETA 1 TAREFA
  const onDeleteTask = async taskId => {
    try {
      // Chama a API para DELETAR a tarefa
      await api.delete(`/tasks/${taskId}`);

      // Compara o id da tarefa deletada no componente filho TaskItem com o id de cada tarefa no array tasks e então remove a tarefa correspondente por meio do função FILTER
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // DELETA TODAS AS TAREFAS
  const deleteAllTasks = async () => {
    if (!window.confirm("Tem certeza que deseja deletar todas as tarefas?")) {
      return;
    }

    try {
      // 1. Buscar todas as tarefas
      const response = await api.get("/tasks");
      const tasksToDelete = response.data;

      // 2. Deletar cada tarefa individualmente
      await Promise.all(
        tasksToDelete.map(async task => {
          await api.delete(`tasks/${task.id}`);
        })
      );

      // 3. Limpar o estado das tarefas localmente
      setTasks([]);
    } catch (error) {
      console.error("Error deleting all tasks:", error);
      setError("Erro ao deletar todas as tarefas. Tente novamente mais tarde.");
    }
  };

  /*  */
  function moveTaskUp(taskId) {
    const updatedTasks = [...tasks]; // Cria uma cópia do array
  
    // Encontra o índice da tarefa com o ID correspondente
    const index = updatedTasks.findIndex(task => task.id === taskId);
  
    // Verifica se a tarefa não é a primeira da lista
    if (index > 0) {
      // Troca de posição com a tarefa anterior
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
    }
  
    setTasks(updatedTasks);
  }

  function moveTaskDown(taskId) {
    const updatedTasks = [...tasks]; // Cria uma cópia do array
  
    // Encontra o índice da tarefa com o ID correspondente
    const index = updatedTasks.findIndex(task => task.id === taskId);
  
    // Verifica se a tarefa não é a primeira da lista
    if (index < tasks.length - 1) {
      // Troca de posição com a tarefa anterior
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
    }
  
    setTasks(updatedTasks);
  }
  /*  */

  return (
    <>
      <h2 className={styles.title}>Minhas Tarefas</h2>

      {error && <p className={styles.error}>{error}</p>}

      {/* FORMULARIO DE ADICIONAR NOVA TAREFA */}
      <TaskFormInput handleTaskSubmit={handleTaskSubmit} />

      {tasks.length > 0 ? (
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <li key={task.id}>
              {/* ITEM DA TELA DE LISTAGEM DE TAREFAS */}
              <TaskItem
                task={task}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                moveTaskUp={moveTaskUp}
                moveTaskDown={moveTaskDown}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noTasks}>Nenhuma tarefa adicionada</p>
      )}

      {tasks.length > 1 && (
        <Button onClick={deleteAllTasks} className={styles.deleteAllTasks}>Apagar todas as tarefas</Button>
      )}
    </>
  );
};

export default TaskList;
