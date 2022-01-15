import axios from 'axios';
import { IPeopleRequest } from 'types';

export const apiAgent = axios.create({
  baseURL: 'https://jerk-lol.herokuapp.com/api',
});

export const requestFunc = async (req: IPeopleRequest) => {
  const res = await apiAgent.post('/people', req);
  return res;
};

export const getPeopleFunc = async (key: string) => {
  return (await apiAgent.get(key)).data.people ?? [];
};
