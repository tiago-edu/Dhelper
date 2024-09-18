import axios from "axios";

const api = axios.create({
  baseURL: "https://dhelper-api.vercel.app/",
});

export default api;
