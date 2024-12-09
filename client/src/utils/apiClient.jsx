import Axios from "axios";

export const Api = Axios.create({
  baseURL: `https://server.servicesbd.top/doctor-profile/api/v1`,
  // baseURL: `http://localhost:9000/doctor-profile/api/v1`,
});
