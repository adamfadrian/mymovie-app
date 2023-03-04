import axios from  'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
  });
  
  export default {
    homeMovies: (titlte:string) => 
    instance({
     method : "GET",
     url :`/search/movie?api_key=${import.meta.env.VITE_KEY}&query=$`,
  }),
  }
