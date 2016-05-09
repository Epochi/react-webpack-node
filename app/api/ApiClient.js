//create axios instance for client side usage only
import axios from 'axios';


function api(){
  console.log('ApiClient intercept');
  const client = axios.create({
    baseURL:`http://${process.env.HOSTNAME || "localhost"}:${process.env.PORT || "3000"}`
  });
  
  
  return client;
}

const ApiClient = api;

export default ApiClient;