import axios from "axios"

let isRedirecting = false

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// REQUEST
apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// RESPONSE
apiAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")

        if (!refreshToken) {
          throw new Error("No refresh token")
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/super_admin/auth/refresh-token`,
          {
            refreshToken,
          },
        )

        const newAccessToken = response.data.token

        localStorage.setItem("token", newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return apiAxios(originalRequest)
      } catch (refreshError) {
        localStorage.clear()

        if (!isRedirecting) {
          isRedirecting = true

          if (window.location.pathname !== "/login") {
            window.location.href = "/login"
          }
        }

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
