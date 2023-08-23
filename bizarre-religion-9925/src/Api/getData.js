import axios from "axios";

export const getUsers = () => {
  return axios.get(`http://localhost:3001/users` );
};
