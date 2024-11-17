import axios from "axios";

// Cria uma instância da API
const api = axios.create({
  baseURL: "http://localhost:3001",
  /*   Comando para rodar:
    npx json-server --watch db.json --port 3001 */
});

export default api;
