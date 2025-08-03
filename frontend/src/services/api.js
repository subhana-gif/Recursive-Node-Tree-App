import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/nodes" });

export const fetchTree = () => API.get("/");
export const createNode = (data) => API.post("/", data);
export const deleteNode = (id) => API.delete(`/${id}`);
