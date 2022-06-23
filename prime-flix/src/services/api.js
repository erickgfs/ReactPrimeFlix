// BASE URL: https://api.themoviedb.org/3/
// URL DA API: movie/550?api_key=3613f89a2dbf54d2664db420de5dc0a1

import axios from 'axios';

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;