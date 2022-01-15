import axios from 'axios';
import { IPeopleRequest } from 'types';

export const apiAgent = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const requestFunc = async (req: IPeopleRequest) => {
  const res = await apiAgent.post('/people', req);
  return res;
};

export const getPeopleFunc = async (key: string) => {
  return (await apiAgent.get(key)).data.people ?? [];
};
