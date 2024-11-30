import Axios from "axios";

export const Api = Axios.create({
  // baseURL: `https://server.arconcretecare.com`,
  baseURL: `http://localhost:8000`,
});