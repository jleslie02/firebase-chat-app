import axios from 'axios';

const headers = {
  'Accept': 'application/vnd.snacknation.v1+json',
  'Content-Type': 'application/json',
  'x-api-key': process.env.REACT_APP_PRODUCTS_API_KEY
};

const configRoute = process.env.REACT_APP_PRODUCTS_API_URI;

const API = {
  fetchJSON: (route, opts = {}, method, extra = {}) => {

    if (!route && !extra.url)
      throw new Error('The URL fetch method requires a route as its first argument!');

    return axios({
      method: method || "GET",
      url: extra.url ? extra.url : `${configRoute}${route}`,
      responseType: 'JSON',
      headers,
      data: opts
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response;
      });
  }
};

export default API;
