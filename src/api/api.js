import axios from "axios";

// Definir a URL base da API
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Função para buscar tarefas (GET)
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}?_limit=1`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar as tarefas:", error);
    throw error;
  }
};
