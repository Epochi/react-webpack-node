//This creates new axios instance that is only used by router for server-side api calls.
//If user is authenticated we create an interceptor for all requests made from server to server that were instigated by client
//It's basically only used for initial server side rendering
import axios from 'axios';

let clientConfig = {
  host: "process.env.HOSTNAME" || '0.0.0.0',
  port: process.env.PORT || '8080'
};

export default function ApiServer(req, authenticated) {
  console.log('this is ApiServer before client create');
  const client = axios.create({
    baseURL: `http://${clientConfig.host}:${clientConfig.port}`
  });
  console.log('ApiServer intercept');
  if (authenticated) {
    client.interceptors.request.use(function(config) {
      config.headers['cookie'] = req.headers.cookie;
      console.log('this is ApiServer modifying config');
      return config;
    }, function(error) {
      return Promise.reject(error);
    });

  }
  console.log('this is ApiServer returning client');
  return client;
}
