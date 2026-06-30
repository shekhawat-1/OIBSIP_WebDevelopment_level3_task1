import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Admin() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [orders, setOrders] = useState([]);

  const [pizzas, setPizzas] = useState([]);
  const loadOrders = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/orders/all",
    {
      headers: {
        authorization: token
      }
    }
  );

  setOrders(res.data);
};

  const loadPizzas = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/pizzas"
      );

      setPizzas(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
  loadPizzas();
  loadOrders();
}, []);

  const handleAddPizza = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/pizzas",
        {
          name,
          price,
          category,
          image
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      alert("Pizza Added Successfully");

      loadPizzas();

    } catch (error) {

  console.log("Full Error:", error);

  console.log("Response:", error.response?.data);

  alert(error.response?.data?.message || "Failed To Add Pizza");

}
  };
  const handleDeletePizza = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/pizzas/${id}`,
      {
        headers: {
          authorization: token
        }
      }
    );

    alert("Pizza Deleted");

    loadPizzas();

  } catch (error) {

    console.log(error);

    alert("Delete Failed");

  }
};
const updatePizza = async (id, price) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/pizzas/${id}`,
      {
        price
      },
      {
        headers: {
          authorization: token
        }
      }
    );

    alert("Pizza Updated");

    loadPizzas();

  } catch (error) {

    console.log(error);

    alert("Update Failed");

  }
};
const cancelOrder = async (orderId) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/orders/cancel/${orderId}`,
      {},
      {
        headers: {
          authorization: token
        }
      }
    );

    alert("Order Cancelled");

    loadOrders();

  } catch (error) {

    console.log(error);

    alert("Failed To Cancel Order");

  }
};
const updateOrderStatus = async (orderId, status) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/orders/status/${orderId}`,
      { status },
      {
        headers: {
          authorization: token
        }
      }
    );

    alert("Status Updated");

    loadOrders();

  } catch (error) {

    console.log(error);

    alert("Update Failed");

  }
};

  return (
    <div>
      <Navbar />

      <div className="container mt-4">

        <h1>Admin Dashboard 👨‍💼</h1>

        <input
          className="form-control mb-2"
          placeholder="Pizza Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={handleAddPizza}
        >
          Add Pizza
        </button>

        <hr />

        <h2>Manage Pizzas 🍕</h2>

        {pizzas.map((pizza) => (
          <div key={pizza._id} className="card p-3 mb-2">

  <h4>{pizza.name}</h4>

  <p>₹{pizza.price}</p>

  <p>{pizza.category}</p>

  <button
    className="btn btn-danger"
    onClick={() => handleDeletePizza(pizza._id)}
  >
    Delete Pizza
  </button>

  <button
    className="btn btn-warning ms-2"
    onClick={() => {
      const newPrice = prompt("Enter New Price");

      if (newPrice) {
        updatePizza(pizza._id, newPrice);
      }
    }}
  >
    Edit Price
  </button>

</div>
        ))}
        <hr />

<h2>All Orders 📦</h2>

{orders.map((order) => (
  <div key={order._id} className="card p-3 mb-2">

    <p>
      <strong>User:</strong> {order.userId?.email}
    </p>

    <p>
      <strong>Total:</strong> ₹{order.totalAmount}
    </p>

    <p>
      <strong>Status:</strong> {order.status}
    </p>
    <button
  className="btn btn-danger"
  onClick={() => cancelOrder(order._id)}
>
  Cancel Order
</button>
<button
  className="btn btn-warning ms-2"
  onClick={() => updateOrderStatus(order._id, "Preparing")}
>
  Preparing
</button>

<button
  className="btn btn-primary ms-2"
  onClick={() => updateOrderStatus(order._id, "Out For Delivery")}
>
  Out For Delivery
</button>

<button
  className="btn btn-success ms-2"
  onClick={() => updateOrderStatus(order._id, "Delivered")}
>
  Delivered
</button>

  </div>
))}

      </div>
    </div>
  );
}


export default Admin;