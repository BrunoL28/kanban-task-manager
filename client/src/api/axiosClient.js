import axios from "axios";
import queryString from "query-string";

const baseUrl = "kanban-task-manager-api.vercel.app/api/v1";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: baseUrl,
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return {
        ...config,
        headers: {
            "Content-Type": "application/json"
        }
    };
});

axiosClient.interceptors.response.use(response => {
    if (response && response.data) return response.data;
    return response;
}, err => {
    if (!err.response) {
        console.log("Erro de conexão:", err);
    } else {
        console.log("Erro na resposta:", err.response);
    }
    throw err.response;
});

export default axiosClient;