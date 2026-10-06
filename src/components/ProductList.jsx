import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../redux/CartSlice";
import plants from "../data/plants";

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">
            {"\u{1F6D2}"} Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <main className="product-list" id="plants">
        <h1>Our Plants</h1>

        {categories.map((category) => (
          <section className="category" key={category}>
            <h2>{category}</h2>

            <div className="product-grid">
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <article className="product-card" key={plant.id}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      onError={(event) => {
                        event.currentTarget.src = "/plant-background.jpg";
                      }}
                    />

                    <h3>{plant.name}</h3>

                    <p>${plant.price.toFixed(2)}</p>

                    <button
                      onClick={() => dispatch(addItem(plant))}
                      disabled={isInCart(plant.id)}
                    >
                      {isInCart(plant.id)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
