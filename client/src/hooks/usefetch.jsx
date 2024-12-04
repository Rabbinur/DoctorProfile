

import { Api } from "../utils/apiClient"

  
export const fetchAllBanner = async () => {
    try {
      const res = await Api.get(`/api/v1/banners/AllBanner`);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch Banner data`);
    }
  };


export const getDashboardData = async () => {
  const response = await Api.get("/review/dash");
  console.log(response.data.payload);
  return response.data.payload;
};
  