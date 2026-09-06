import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import plants from "../data";
import Navbar from "./Navbar";

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const categories = [
    ...new Set(plants.map((plant) => plant.category))
  ];

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <>
      <Navbar />

      <div className="product-page">
        <h1>Our Plants</h1>

        {categories.map((category) => (
          <section key={category} className="category-section">
            <h2>{category}</h2>

            <div className="product-grid">
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <div className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />

                    <h3>{plant.name}</h3>

                    <p>₹{plant.price}</p>

                    <button
                      onClick={() => dispatch(addItem(plant))}
                      disabled={isInCart(plant.id)}
                    >
                      {isInCart(plant.id)
                        ? "Added"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default ProductList;