import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";
import Navbar from "./Navbar";


// Calculate the total number of items in the cart
const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce(
    (totalQuantity, item) => totalQuantity + item.quantity,
    0
  );
};


// Calculate the total price of all items in the cart
const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce(
    (totalAmount, item) => totalAmount + item.price * item.quantity,
    0
  );
};


// Component for quantity controls
function CartControls({ item, onIncrement, onDecrement }) {
  return (
    <div className="quantity-controls">
      <button onClick={() => onDecrement(item)}>
        -
      </button>

      <span>{item.quantity}</span>

      <button onClick={() => onIncrement(item)}>
        +
      </button>
    </div>
  );
}


// Component for displaying individual cart items
function CartItemDisplay({
  item,
  onIncrement,
  onDecrement,
  onDelete
}) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item" key={item.id}>
      <img
        src={item.image}
        alt={item.name}
      />

      <div>
        <h2>{item.name}</h2>
        <p>Unit Price: ₹{item.price}</p>
      </div>

      <CartControls
        item={item}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />

      <p>
        Total: ₹{itemTotal}
      </p>

      <button onClick={() => onDelete(item.id)}>
        Delete
      </button>
    </div>
  );
}


// Main Cart component
function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalCartQuantity = calculateTotalQuantity(cartItems);
  const totalCartAmount = calculateTotalAmount(cartItems);


  // Increase item quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };


  // Decrease item quantity or remove it if quantity is 1
  const handleDecrement = (item) => {
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


  // Delete item from cart
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
              <CartItemDisplay
                key={item.id}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onDelete={handleDelete}
              />
            ))}

            <h2>
              Total: ₹{totalCartAmount}
            </h2>

            <button
              onClick={() =>
                alert("Checkout feature is coming soon!")
              }
            >
              Checkout
            </button>

            <Link to="/plants">
              <button>
                Continue Shopping
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;
