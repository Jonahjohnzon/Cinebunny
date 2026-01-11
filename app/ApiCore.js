import axios from "axios";


const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_MOVIELINK
})

api.defaults.headers.common['Authorization'] = process.env.NEXT_PUBLIC_BEARER
api.defaults.headers.common['accept'] = 'application/json'
api.interceptors.response.use(
    (response) => {
      
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      let message;
      if (error && error.response && error.response.status === 404) {
        window.location.href = '/not-found';
      } else if (error && error.response && error.response.status === 403) {
        window.location.href = "/access-denied";
      } else {
        switch (error.response.status) {
          case 401:
            message = "Invalid credentials";
            break;
          case 403:
            message = "Access Forbidden";
            break;
          case 404:
            message = "Sorry! the data you are looking for could not be found";
            break;
          default: {
            message =
              error.response && error.response.data
                ? error.response.data["message"]
                : error.message || error;
          }
        }
        return Promise.reject(message);
      }
    }
  );


export default class Apicore{
    constructor(){

    }

    async get(endpoint, queryParams = {}){
        try{
            const response = await api.get(endpoint,{
                params:queryParams
            })
            return response.data
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

