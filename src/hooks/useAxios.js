import { useEffect } from 'react';
import { axiosIntercepted } from '../services';
import { useAuthStore } from '../store/authStore';

export const useAxiosPrivate = () => {
  const {auth} = useAuthStore();

  useEffect(() => {
    const requestIntercept = axiosIntercepted.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = axiosIntercepted.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (
          !prevRequest?.sent &&
          error?.response?.data?.message.toLowerCase() === 'forbidden resource'
        ) {
          prevRequest.sent = true;

          //Call Refresh token here

          if (!newAccessToken) {
            return Promise.reject('Login Again');
          }

          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosIntercepted(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosIntercepted.interceptors.request.eject(requestIntercept);
      axiosIntercepted.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosIntercepted;
};
