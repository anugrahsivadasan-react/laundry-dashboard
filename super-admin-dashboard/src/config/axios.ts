import axios from "axios"

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

apiAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const loggedOut = localStorage.getItem("loggedOut")
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      if (!loggedOut) {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
            {},
            { withCredentials: true },
          )

          return apiAxios(originalRequest)
        } catch {
          window.location.href = "/login"
        }
      }
    }

    return Promise.reject(error)
  },
)
