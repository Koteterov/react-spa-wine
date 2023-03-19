import * as request from "./requester";

const baseURL = "http://localhost:3030/users";

export const login = (email, password) => {
  return request.post(`${baseURL}/login`, { email, password });
};

export const logout = async () => {
  try {
    const response = fetch(`${baseURL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const register = (firstName, lastName, email, password) => {
  return request.post(`${baseURL}/register`, {
    firstName,
    lastName,
    email,
    password,
  });
};

export const getProfile = () => {
    return request.get(`${baseURL}/profile`)
}