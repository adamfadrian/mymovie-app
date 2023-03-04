import axios from  'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
  });
  
  export default {
    getMovie: (id:any) => 
    instance({
     method : "GET",
     url : `/${id}?&api_key=${import.meta.env.VITE_KEY}`,
  }),
  }