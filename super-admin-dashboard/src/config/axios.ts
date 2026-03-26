import axios from "axios"

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// apiAxios.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config

//     if (error.response?.status === 403 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh-token") &&
// !originalRequest.url.includes("/super_admin/auth/login")  &&
// !originalRequest.url.includes("/auth/profile") {
//       originalRequest._retry = true

//       try {
//         await apiAxios.post("/auth/refresh-token")

//         return apiAxios(originalRequest)
//       } catch (err) {
//         // window.location.href = "/login"
//       }
//     }

//     return Promise.reject(error)
//   },
// )
