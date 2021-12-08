import axios from "axios";

const client = axios.create({baseURL: "http://localhost:8000"});


export const register = async (params) => { await client.post("/users/register", params)};

export const login = async (params) => {
  return await client.post('users/login', params);
};


export const logout = () => {
  window.localStorage.removeItem('auth');

};
