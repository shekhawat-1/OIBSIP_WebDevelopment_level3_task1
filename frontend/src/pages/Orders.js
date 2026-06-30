import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getOrders } from "../services/orderService";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {

      const data = await getOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

    }
  };
  

  return (
    <div>

      <Navbar />

      <h1>My Orders 📦</h1>

      {orders.map((order) => (

        <div
          key={order._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >

          <h3>Order ID: {order._id}</h3>

          <p>Status: {order.status}</p>

          <p>Total Amount: ₹{order.totalAmount}</p>

        </div>

      ))}

    </div>
  );
}

export default Orders;