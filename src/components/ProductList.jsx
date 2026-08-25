import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import plants from "../data/plants";

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  return (
    <section className="products-section">
      <div className="products-heading">
        <p className="section-label">EXPLORE OUR COLLECTION</p>

        <h2>Find Your Perfect Plant</h2>

        <p>
          Bring a touch of nature into your home with our carefully selected
          collection of beautiful houseplants.
        </p>
      </div>

      {categories.map((category) => {
        const categoryPlants = plants.filter(
          (plant) => plant.category === category
        );

        return (
          <div className="plant-category" key={category}>
            <div className="category-heading">
              <h3>{category}</h3>

              <span>{categoryPlants.length} plants</span>
            </div>

            <div className="plant-grid">
              {categoryPlants.map((plant) => {
                const isInCart = cartItems.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article className="plant-card" key={plant.id}>
                    <div className="plant-image-wrapper">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="plant-image"
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://placehold.co/800x600/eaf5ec/247344?text=Plant";
                        }}
                      />

                      <span className="plant-category-badge">
                        {category}
                      </span>
                    </div>

                    <div className="plant-card-content">
                      <h4>{plant.name}</h4>

                      <p className="plant-description">
                        {plant.description}
                      </p>

                      <div className="plant-card-bottom">
                        <span className="plant-price">
                          ${plant.price.toFixed(2)}
                        </span>

                        <button
                          className={`add-cart-btn ${
                            isInCart ? "added" : ""
                          }`}
                          onClick={() => handleAddToCart(plant)}
                          disabled={isInCart}
                        >
                          {isInCart ? "Added ✓" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ProductList;