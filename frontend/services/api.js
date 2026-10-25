const url = import.meta.env.VITE_API_URL
import axios from "axios"
const api = axios.create({
    baseURL: url,
    headers: {"Content-Type":"application/json"}
})

export default api;