import axios from "axios";

const addToCart = async (pizzaId, quantity = 1) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:5000/api/cart",
    {
      pizzaId,
      quantity
    },
    {
      headers: {
        authorization: token
      }
    }
  );

  return res.data;
};

export default addToCart;
export const getCart = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/cart",
    {
      headers: {
        authorization: token
      }
    }
  );

  return res.data;
};
export const removeCartItem = async (cartId) => {

  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `http://localhost:5000/api/cart/${cartId}`,
    {
      headers: {
        authorization: token
      }
    }
  );

  return res.data;
};