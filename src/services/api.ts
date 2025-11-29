// src/services/api.ts
import axios from "axios";

const api = axios.create({
  // Como configuramos o REWRITE no Render, podemos chamar direto /api
  // O Render vai redirecionar /api/... para o seu backend automaticamente.
  baseURL: "/api",
});

export default api;
