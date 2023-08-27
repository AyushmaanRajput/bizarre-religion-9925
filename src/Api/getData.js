import axios from "axios";

export const getUsers = () => {
  return axios.get(`https://mock-api-finpay.onrender.com/users`);
};

export const getSubscriptions = () => {
  return axios.get(`https://mock-api-finpay.onrender.com/subscriptions`);
};
