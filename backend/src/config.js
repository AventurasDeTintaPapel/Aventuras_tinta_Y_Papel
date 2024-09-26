import dotenv from "dotenv";

dotenv.config();

export const PAYPAL_API_KEY = process.env.PAYPAL_API_KEY;
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";

console.log("PAYPAL_SECRET_CLIENT:", PAYPAL_API_CLIENT);
console.log("PAYPAL_API", PAYPAL_API);
console.log("PAYPAL_SECRET_KEY:", PAYPAL_API_KEY);
