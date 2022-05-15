import axios, { AxiosInstance, AxiosResponse, HeadersDefaults } from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 120
});

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const setApiHeaderToken = (token: string): void => {
  service.defaults.headers = {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  } as CommonHeaderProperties;
};

const token = sessionStorage.getItem('token');
if (token) setApiHeaderToken(token);

// type ResData
export type HttpRes<D> = AxiosResponse<D, D>;
export type HttpResData<D> = {
  data: AxiosResponse<D, D>;
};

const http = {
  get: <Param, Data>(url: string, params?: Param): Promise<Data> => {
    return service.get(url, { params: params });
  },
  post: <Param, Data>(url: string, params?: Param): Promise<Data> => {
    return service.post(url, params);
  },
  delete: <Param, Data>(url: string, params?: Param): Promise<Data> => {
    return service.delete(url, { data: params });
  },
  put: <Param, Data>(url: string, params: Param): Promise<Data> => {
    return service.put(url, params);
  },
  patch: <Param, Data>(url: string, params: Param): Promise<Data> => {
    return service.patch(url, params, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    });
  }
};

export default http;
