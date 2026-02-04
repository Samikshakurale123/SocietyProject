import axios from "axios";

const API_URL = "http://localhost:8080/api/complaints";

export const getComplaints = () => {
  return axios.get(API_URL);
};

export const addComplaint = (data) => {
  return axios.post(API_URL, data);
};
