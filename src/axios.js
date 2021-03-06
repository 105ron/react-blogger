import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

instance.defaults.headers.common['house'] = 'New_Instance'

instance.interceptors.request.use(request => {
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default instance;