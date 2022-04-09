import axios from 'axios';
import { sha256 } from 'js-sha256';
import qs from 'query-string';
import { getSession } from './auth';

export const getHeaders = (url, redirectUri) => {
  const currentTenant = getSession();
  const params = {};
  params.token = currentTenant.token;
  params.timestamp = Date.now();
  params.redirect_uri = redirectUri || process.env.REACT_APP_URL;

  // Join the service path and the ordered sequence of characters, excluding the quotes,
  // corresponding to the JSON of the parameters that will be sent.
  const msg = url
    + JSON.stringify(params)
      .replace(/["']/g, '')
      .split('')
      .sort()
      .join('');

  // Generate the corresponding hmac using the js-sha256 or similar library.
  params.hmac = sha256.hmac.update(currentTenant.secret, msg).hex();

  const queryString = Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&');

  return queryString;
};

const API = axios.create({
  baseURL: process.env.REACT_APP_ECAPI_URL
});

API.interceptors.request.use((config) => {

  const currentTenant = getSession();
  
  // Add token and timestamp to URL parameters.
  config.headers.common['X-OMNA-Token'] = currentTenant?.token //get(currentTenant, 'token', '');
  config.params = Object.assign({}, config.params, { timestamp: Date.now() });
  
  const queryString = qs.stringify(config.params);
  const body = config.data ? JSON.stringify(config.data) : '';
  
  // Join the service path, queryString and body
  const msg = config.url + queryString + body;

  // Generate the corresponding hmac header using the js-sha256 or similar library.
  config.headers.common['X-OMNA-HMac'] = sha256.hmac.update(currentTenant?.secret || '', msg).hex();

  return config;
});

export default API;
