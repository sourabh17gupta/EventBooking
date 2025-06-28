// src/api/Services/Paymentapi/CreateOrderAPI.js
import { apiConnector } from "../../apiconnector";
import { paymentendpoints } from "../../apis";

const { CreateOrder: CREATE_ORDER_API } = paymentendpoints;

export async function createOrderAPI(id) {
  try {
    const res = await apiConnector("POST", CREATE_ORDER_API, { eventid:id });

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "Order creation failed");
    }
    return res.data.order;
  } catch (error) {
    console.error("ORDER API ERROR:", error);
    throw error;
  }
}
