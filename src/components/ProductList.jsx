import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import plants from "../data/plants";

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <section className="products-section">
      <div className="products-heading">
        <p className="section-label">OUR PLANTS</p>

        <h2>Explore Our Plant Collection</h2>

        <p>
          Discover beautiful and healthy plants for your home. Choose from
          our carefully selected collection of indoor plants, flowering
          plants, and succulents.
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
                          type="button"
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