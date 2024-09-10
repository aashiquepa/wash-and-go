import axios from 'axios';

export const axiosIntercepted = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

//Use to call non authenticated APIs
export const axiosBase = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },    
});
