import Axios from "axios";

export const Api = Axios.create({
  // baseURL: `https://server.arconcretecare.com`,
  baseURL: `http://localhost:9000/doctor-profile/api/v1`,
});