
import { useState, useCallback,useMemo, useEffect } from 'react'
import axios from 'axios'

const _axios = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 1000 * 20,
  ignoreLoading: false,
}); // export this and use it in all your components

const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const inc = useCallback(() => setCounter(counter => counter + 1), [setCounter]); // add to counter
  const dec = useCallback(() => setCounter(counter => counter - 1), [setCounter]); // remove from counter

  const interceptors = useMemo(() => ({
    request: (config) => {
      if(!config.ignoreLoading){
        inc()
      }
      config.headers = { ...config.headers }
      return config
    },
    response: (response) => {
      if(!response.config.ignoreLoading){
        dec()
      }
      if(response.status === 401) {
        // your failure logic
      }
      return response
    },
    error: (error) => {
      if(!error.config.ignoreLoading){
        dec()
      }
      if(error.status === 401) {
        // your failure logic
      }
      return Promise.reject(error)
    },
  }), [inc, dec]); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const reqInterceptor = _axios.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const resInterceptor =  _axios.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      _axios.interceptors.request.eject(reqInterceptor);
      _axios.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return [counter > 0];
};
  
export {
  _axios,
  useAxiosLoader
}