import axios from "axios";

export const placeOrder = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:5000/api/orders",
    {},
    {
      headers: {
        authorization: token
      }
    }
  );

  return res.data;
};

export const getOrders = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/orders",
    {
      headers: {
        authorization: token
      }
    }
  );

  return res.data;
};