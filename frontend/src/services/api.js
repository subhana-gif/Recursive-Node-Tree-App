import axios from "axios";

const API = axios.create({
  baseURL: "https://recursive-node-tree-app.onrender.com/api/nodes"
});

export const fetchTree = () => API.get("/");
export const createNode = (data) => API.post("/", data);
export const deleteNode = (id) => API.delete(`/${id}`);
