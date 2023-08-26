import axios from "axios";

export const postNewUser = (userObj) => {
  return axios.post(`http://localhost:3001/users`, userObj);
};
