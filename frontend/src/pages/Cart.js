import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { placeOrder } from "../services/orderService";
import {
  getCart,
  removeCartItem
} from "../services/cartService";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
  try {

    const response = await placeOrder();

    console.log("Order Response:", response);

    alert("Order Placed Successfully");

  } catch (error) {

    console.log("Full Error:", error);

    console.log("Error Data:", error.response?.data);

    alert(
      error.response?.data?.message || "Order Failed"
    );

  }
};
const handleRemove = async (cartId) => {

  try {

    await removeCartItem(cartId);

    loadCart();

  } catch (error) {

    console.log(error);

  }
};
 const total = cart.reduce((sum, item) => {
  if (!item.pizzaId) return sum;
  return sum + item.pizzaId.price * item.quantity;
}, 0);

  return (
    <div>
      <Navbar />

      <h1>My Cart 🛒</h1>

     {cart.map((item) => {

  if (!item.pizzaId) return null;

  return (
    <div key={item._id}>

      <h3>{item.pizzaId?.name || "Pizza Removed"}</h3>

      <p>Quantity: {item.quantity}</p>

      <button
        className="btn btn-danger"
        onClick={() => handleRemove(item._id)}
      >
        Remove
      </button>

      <hr />

    </div>
  );

})}
      <h2>Total: ₹{total}</h2>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>

    </div>
    
  );
}

export default Cart;