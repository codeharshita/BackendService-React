
import axios  from 'axios';
import {toast} from 'react-toastify';

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && 
    error.response.status >=400 && 
    error.response.status <500;
  
  
    if(!expectedError){
  
      console.log("Logging the error", error);
  
       toast.error("An Unexpected error is occured!");
    
    }
  
  
  
   
    return Promise.reject(error);
  
  });

  export default {
// get post put delete.

    get : axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete

  }
