import axios from "axios";

const BASE_URL = "http://localhost:8080/api/payments";

export const createPayment = (payment) => {
  return axios.post(BASE_URL, payment);
};

export const getPayments = () => {
  return axios.get(BASE_URL);
};
