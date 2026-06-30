import { useEffect, useState } from "react";
import axios from "axios";
import addToCart from "../services/cartService";
import Navbar from "../components/Navbar";

function Home() {

  const [pizzas, setPizzas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchPizzas();

  }, []);

  const fetchPizzas = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/pizzas"
      );

      setPizzas(res.data);

    } catch (error) {

      console.log(error);

    }
  };
  const handleAddToCart = async (pizzaId) => {

  try {

    await addToCart(pizzaId);

    alert("Added To Cart");

  } catch (error) {

    alert("Failed To Add Cart");

    console.log(error);

  }
};

  return (
    <div><Navbar />

      <h1>Pizza Menu 🍕</h1>
      <input
  type="text"
  className="form-control mb-3"
  placeholder="Search Pizza..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

     <div className="row">
  {pizzas
  .filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((pizza) => (
    <div className="col-md-4" key={pizza._id}>
      <div className="card m-3 shadow">
       <img
  src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500"
  alt="pizza"
  className="card-img-top"
  style={{ height: "200px", objectFit: "cover" }}
/>
        <div className="card-body">
          <h4>{pizza.name}</h4>
          <p>₹{pizza.price}</p>
          <p>{pizza.category}</p>

          <button
            className="btn btn-success"
            onClick={() => handleAddToCart(pizza._id)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default Home;