import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQuantity = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">?? Cart ({totalItems})</Link>
        </div>
      </nav>

      <main className="cart-page">
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <Link to="/plants">Continue Shopping</Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(event) => {
                    event.currentTarget.src = "/plant-background.jpg";
                  }}
                />

                <div>
                  <h2>{item.name}</h2>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>
                    Total: $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="cart-actions">
                    <button
                      onClick={() => decreaseQuantity(item)}
                    >
                      -
                    </button>

                    <span>Quantity: {item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>

                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <div className="cart-total">
              <p>Total Items: {totalItems}</p>
              <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            </div>

            <div>
              <button
                onClick={() => alert("Coming Soon")}
              >
                Checkout
              </button>

              <Link to="/plants">
                <button>Continue Shopping</button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default CartItem;
