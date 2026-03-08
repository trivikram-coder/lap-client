import axios from "axios";

/* BASE AXIOS INSTANCE */
const apiUrl=import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json"
  }
});


/* ===============================
   AUTH APIs
================================ */

/* REGISTER */

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};


/* LOGIN */

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};


/* GET USER PROFILE */

export const getUserProfile = (id) => {
  return api.get(`/auth/users/profile/${id}`);
};


/* UPDATE USER */

export const updateUserProfile = (id, data) => {
  return api.put(`/auth/users/${id}`, data);
};


/* CHECK EMAIL */

export const checkEmail = (email) => {
  return api.get(`/auth/check-email/${email}`);
};


/* RESET PASSWORD */

export const resetPassword = (data) => {
  return api.post(`/auth/reset-password`, data);
};



/* ===============================
   LOAN APIs
================================ */

/* PREDICT LOAN */

export const predictLoan = (data) => {
  return api.post("/predict", data);
};


/* FETCH USER APPLICATIONS */

export const fetchApplications = (userId) => {
  return api.get(`/predict/applications/${userId}`);
};


/* GET SINGLE APPLICATION */

export const getApplicationById = (id) => {
  return api.get(`/predict/application/${id}`);
};


/* DELETE APPLICATION */

export const deleteApplication = (id) => {
  return api.delete(`/predict/application/${id}`);
};


/* ML TEST */

export const mlTest = () => {
  return api.get("/predict/ml-test");
};


export default api;