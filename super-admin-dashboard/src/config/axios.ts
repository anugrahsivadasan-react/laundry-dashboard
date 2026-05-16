import axios from "axios"

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// REQUEST INTERCEPTOR
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

// RESPONSE INTERCEPTOR
apiAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    // avoid infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")

        // REFRESH TOKEN API
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/super_admin/auth/refresh-token`,
          {
            refreshToken,
          },
          {
            withCredentials: true,
          },
        )

        const newAccessToken = response.data.token

        // SAVE NEW ACCESS TOKEN
        localStorage.setItem("token", newAccessToken)

        // UPDATE HEADER
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        // RETRY ORIGINAL REQUEST
        return apiAxios(originalRequest)
      } catch (refreshError) {
        // TOKEN EXPIRED / INVALID
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")

        window.location.href = "/login"

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
