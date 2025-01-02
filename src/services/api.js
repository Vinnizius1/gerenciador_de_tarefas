import axios from "axios";

// Cria uma instância da API
export const api = axios.create({
  baseURL: "http://localhost:3001",
  /*   Comando para rodar:
    npx json-server --watch db.json --port 3001 */
});

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const postTasks = async newTask => {
  const { data } = await api.post("/tasks", newTask);
  return data;
};

export const deleteTask = async taskId => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
