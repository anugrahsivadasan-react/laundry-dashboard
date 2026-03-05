import { ENV } from "../utils/env";

export const getOrdersUrl = () => {
  return `${ENV.API_BASE_URL}${API_ENDPOINTS.ORDERS}`;
};
