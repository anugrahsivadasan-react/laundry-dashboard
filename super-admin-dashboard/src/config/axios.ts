import axios from "axios"

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let isLoggedOut = false
let failedQueue: any[] = []

apiAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    //  If already logged out → stop everything
    if (isLoggedOut) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      //  Prevent multiple refresh calls
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => apiAxios(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        )

        //  Retry queued requests
        failedQueue.forEach((p) => p.resolve(null))
        failedQueue = []

        return apiAxios(originalRequest)
      } catch (err) {
        //  Refresh failed → logout once
        isLoggedOut = true
        failedQueue.forEach((p) => p.reject(err))
        failedQueue = []

        localStorage.setItem("loggedOut", "true")

        window.location.href = "/login"
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
