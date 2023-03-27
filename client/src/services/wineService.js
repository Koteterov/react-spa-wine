import * as request from "./requester";

const baseURL = "http://localhost:3030/data/catalog";

export const getAll = () => request.get(baseURL);

export const getOne = (wineId) => request.get(`${baseURL}/${wineId}`);

export const getMy = (userId) => request.get(`${baseURL}/my?userId=${userId}`);

export const getMyLikes = (userId) =>
  request.get(`${baseURL}/my/likes?userId=${userId}`);

export const likeWine = (wineId) => request.get(`${baseURL}/like/${wineId}`);

export const unlikeWine = (wineId) =>
  request.get(`${baseURL}/unlike/${wineId}`);

export const deleteWine = (wineId) => request.del(`${baseURL}/${wineId}`);

export const createWine = (data) => request.post(baseURL, data);

export const editWine = (wineId, data) =>
  request.put(`${baseURL}/${wineId}`, data);
