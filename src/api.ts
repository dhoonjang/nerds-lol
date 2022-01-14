import axios from 'axios';

export const apiAgent = axios.create({
  baseURL: 'https://jerk-lol.herokuapp.com/api',
});
