import apiClient from "../utils/api-client";

export function checkoutAPI() {
  apiClient.post("/order/checkout");
}
