import { apiConnector } from "../../apiconnector";
import { paymentendpoints } from "../../apis";

const { Verify_Payment } = paymentendpoints;

export async function verifyPaymentAPI({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  eventid,
}) {
  try {
    console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature,eventid);
    const response = await apiConnector("POST", Verify_Payment, {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      eventid,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Payment verification failed");
    }

    return response.data;
  } catch (error) {
    console.error("VERIFY PAYMENT API ERROR:", error);
    throw error;
  }
}
