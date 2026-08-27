import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import plants from "../data/plants";

function ProductList() {
  const dispatch = useDispatch();

  // Get current cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);

  // Get all available plant categories
  const categories = [...new Set(plants.map((plant) => plant.category))];

  // Add selected plant to Redux cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <section className="products-section">
      {/* ================= PRODUCT HEADER ================= */}

      <div className="products-heading">
        <p className="section-label">EXPLORE OUR COLLECTION</p>

        <h2>Find Your Perfect Plant</h2>

        <p>
          Discover beautiful and healthy houseplants from our carefully
          selected collection. Choose your favorite plant and add it to
          your shopping cart.
        </p>
      </div>

      {/* ================= PLANT CATEGORIES ================= */}

      {categories.map((category) => {
        // Get all plants belonging to the current category
        const categoryPlants = plants.filter(
          (plant) => plant.category === category
        );

        return (
          <section className="plant-category" key={category}>
            {/* Category heading */}

            <div className="category-heading">
              <h3>{category}</h3>

              <span>
                {categoryPlants.length} plants
              </span>
            </div>

            {/* Plant cards */}

            <div className="plant-grid">
              {categoryPlants.map((plant) => {
                // Check whether this plant is already in the cart
                const isInCart = cartItems.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article
                    className="plant-card"
                    key={plant.id}
                  >
                    {/* ================= PLANT IMAGE ================= */}

                    <div className="plant-image-wrapper">
                      <img
                        src={plant.image}
                        alt={`${plant.name} plant`}
                        className="plant-image"
                      />

                      <span className="plant-category-badge">
                        {category}
                      </span>
                    </div>

                    {/* ================= PLANT DETAILS ================= */}

                    <div className="plant-card-content">
                      <h4>{plant.name}</h4>

                      <p className="plant-description">
                        {plant.description}
                      </p>

                      <div className="plant-card-bottom">
                        {/* Plant price */}

                        <span className="plant-price">
                          ${Number(plant.price).toFixed(2)}
                        </span>

                        {/* Add to Cart button */}

                        <button
                          type="button"
                          className={`add-cart-btn ${
                            isInCart ? "added" : ""
                          }`}
                          onClick={() => handleAddToCart(plant)}
                          disabled={isInCart}
                          aria-label={
                            isInCart
                              ? `${plant.name} already added to cart`
                              : `Add ${plant.name} to cart`
                          }
                        >
                          {isInCart
                            ? "Added ✓"
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default ProductList;