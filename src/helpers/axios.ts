import axios, { AxiosInstance } from "axios";

const BACKEND_URL = "http://localhost:4000";

const instance: AxiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
