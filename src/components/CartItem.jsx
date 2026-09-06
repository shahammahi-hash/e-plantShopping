import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";
import Navbar from "./Navbar";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      );
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      <Navbar cartCount={totalCartQuantity} />

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h2>{item.name}</h2>
                  <p>Unit Price: ₹{item.price}</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(item)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => handleIncrease(item)}>
                    +
                  </button>
                </div>

                <p>
                  Total: ₹{item.price * item.quantity}
                </p>

                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            ))}

            <h2>Total: ₹{total}</h2>

            <button
              onClick={() =>
                alert("Checkout feature is coming soon!")
              }
            >
              Checkout
            </button>

            <Link to="/plants">
              <button>Continue Shopping</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;