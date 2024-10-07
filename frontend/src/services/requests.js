import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crotec-api.herokuapp.com',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (body) => {
  const { data } = await api.post('login', body);
  return data;
};

export const requestCreateUser = async (body) => {
  const { data } = await api.post('/user/create', body);
  return data;
};

export default api;