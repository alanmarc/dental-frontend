import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api/", // Cambia esto por la URL de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
