import * as request from "./requester";

const baseURL = "http://localhost:3030/data/catalog"


export const getAll = () => request.get(baseURL);


