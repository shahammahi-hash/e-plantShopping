import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

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
    // Prevent quantity from becoming less than 1.
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>

              {/* image */}
              <img
                src={item.image}
                alt={item.name}
              />

              {/* name and unit price */}
              <div>
                <h2>{item.name}</h2>
                <p>Unit Price: ₹{item.price}</p>
              </div>

              {/* quantity */}
              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => handleIncrease(item)}>
                  +
                </button>
              </div>

              {/* item total */}
              <p>
                Total: ₹{item.price * item.quantity}
              </p>

              {/* delete */}
              <button onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <button onClick={() => alert("Coming Soon")}>
            Checkout
          </button>

          <Link to="/plants">
            <button>Continue Shopping</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default CartItem;