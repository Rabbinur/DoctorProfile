import Axios from "axios";

export const Api = Axios.create({
  // baseURL: `http://localhost:9000`,
  baseURL: `https://server.servicesbd.top`,
});