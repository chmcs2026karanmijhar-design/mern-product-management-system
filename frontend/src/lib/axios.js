import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-product-management-system-backend.onrender.com/"
});

export default axiosInstance;