import axios from "axios";

const api = axios.create({
   baseURL: 'http://10.10.12.190:8080' //ipBackend
   //baseURL: 'http://127.0.0.1:8080'  //ip Local
})

export default api;