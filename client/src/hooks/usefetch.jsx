import { Api } from "../utils/apiClient";
import { buildQueryParams } from "./buildQueryParams";

export const fetchAllBanner = async () => {
  try {
    const res = await Api.get(`/api/v1/banners/AllBanner`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch Banner data`);
  }
};

//admin

export const getDashboardData = async () => {
  const response = await Api.get("/review/dash");
  console.log(response.data.payload);
  return response.data.payload;
};

export const getAppointmentData = async ({ mobile, page = 1, limit = 10 }) => {
  try {
    const queryParams = {
      ...(mobile && { mobile }),
      page,
      limit,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await Api.get(`/appointment/all?${queryString}`);

    return response.data.payload;
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch appointment data");
  }
};


export const deleteAppointmentData = async (id) => {
  const response = await Api.delete(`/appointment/${id}`);

  return response.data.payload;
};

export const UpdateAppointmentStatus = async ({ id, status }) => {
  try {
    // Send the status in the request body as an object
    const response = await Api.patch(`/appointment/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
};

//get chambar data

export const getChamberData = async () => {
  const response = await Api.get("/chamber/all");
  // console.log(response.data.payload.chamber);
  return response.data.payload.chamber;
};

// review

export const createReview = async (formData) => {
  const response = await Api.post(`/review/create`, formData);
  return response.data;
};
export const getReviewData = async ({ status }) => {
  const queryParams = {
    ...(status && { status }),
  };
  const queryString = buildQueryParams(queryParams);
  const response = await Api.get(`/review/all?${queryString}`);

console.log(response.data); 
 return response.data.payload.data;
};
export const deleteReviewData = async (id) => {
  const response = await Api.delete(`/review/${id}`);

  return response.data.payload;
};

export const UpdateReviewStatus = async ({ id, status }) => {
  try {
    // Send the status in the request body as an object
    const response = await Api.patch(`/review/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
};



//### blog part 

//create blog 

export const getAllBlogs = async ({ type, page = 1, limit = 10 })=>{
  const queryParams = {
    ...(type && { type }),
    page,
    limit,
  };
  const queryString = buildQueryParams(queryParams);
  const response = await Api.get(`/blog/all?${queryString}`);
  console.log(response);
  return response.data.payload;
}
export const CreateBlog = async (formData)=>{
  const response = await Api.post(`/blog/create`, formData);
  console.log(response);
  return response.data.payload.savedBlog;
}

export const deleteBlog = async (id) => {
  const response = await Api.delete(`/blog/del/${id}`);

  return response.data.payload;
};
export const updateBlog = async (id, formData) => {
  const response = await Api.patch(`/blog/update/${id}`, formData);
  return response.data.payload;
};


//###################  About 
//get data

export const fetchAboutData = async () => {
  try {
    const res = await Api.get(`/profile/all`);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch profile data`);
  }
};
export const fetchAboutDataId = async (id) => {
  console.log(id);
  try {
    const res = await Api.get(`/profile/${id}`);
    console.log(res);
    return res.data.payload.profile;
  } catch (error) {
    console.error(`Failed to fetch profile data`);
  }
};

//update
export const updateAbout = async (id, formData) => {
  console.log(id,formData);
  const response = await Api.patch(`/profile/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.payload;
};