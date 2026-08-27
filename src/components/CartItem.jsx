import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity of all products
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate the complete cart amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Increase product quantity
  const handleIncrease = (id, quantity) => {
    dispatch(
      updateQuantity({
        id: id,
        quantity: quantity + 1,
      })
    );
  };

  // Decrease product quantity
  const handleDecrease = (id, quantity) => {
    dispatch(
      updateQuantity({
        id: id,
        quantity: quantity - 1,
      })
    );
  };

  // Remove product completely from cart
  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  // Checkout is not implemented yet
  const handleCheckout = () => {
    alert("Checkout Coming Soon!");
  };

  // Continue shopping
  const handleContinueShopping = () => {
    window.location.href = "/";
  };

  /* =========================
     EMPTY CART
  ========================= */

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <p className="section-label">
            YOUR SHOPPING CART
          </p>

          <h2>Your Cart is Empty</h2>

          <p>
            Your favorite plants are waiting for you. Explore our
            collection and bring some greenery home.
          </p>

          <button
            type="button"
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  /* =========================
     SHOPPING CART
  ========================= */

  return (
    <section className="cart-page">
      {/* ================= CART HEADER ================= */}

      <div className="cart-header">
        <div>
          <p className="section-label">
            YOUR SHOPPING CART
          </p>

          <h2>My Cart</h2>

          <p>
            Review your plants and adjust quantities before checkout.
          </p>
        </div>

        {/* Total cart amount */}

        <div className="cart-total-preview">
          <span>Total</span>

          <strong>
            ${totalAmount.toFixed(2)}
          </strong>
        </div>
      </div>

      <div className="cart-layout">
        {/* ================= CART ITEMS ================= */}

        <div className="cart-items">
          {cartItems.map((item) => {
            // Calculate total cost for this individual plant
            const itemTotal = item.price * item.quantity;

            return (
              <article
                className="cart-item"
                key={item.id}
              >
                {/* Plant thumbnail */}

                <img
                  src={item.image}
                  alt={`${item.name} plant`}
                  className="cart-item-image"
                />

                {/* Plant information */}

                <div className="cart-item-details">
                  <span className="cart-item-category">
                    {item.category}
                  </span>

                  <h3>{item.name}</h3>

                  {/* Unit price */}

                  <p className="cart-unit-price">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                {/* ================= QUANTITY ================= */}

                <div className="quantity-section">
                  <span className="quantity-label">
                    Quantity
                  </span>

                  <div className="quantity-control">
                    {/* Decrease quantity */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDecrease(
                          item.id,
                          item.quantity
                        )
                      }
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>

                    {/* Current quantity */}

                    <span>{item.quantity}</span>

                    {/* Increase quantity */}

                    <button
                      type="button"
                      onClick={() =>
                        handleIncrease(
                          item.id,
                          item.quantity
                        )
                      }
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ================= ITEM TOTAL ================= */}

                <div className="cart-item-total">
                  <span>Item Total</span>

                  <strong>
                    ${itemTotal.toFixed(2)}
                  </strong>
                </div>

                {/* ================= DELETE ================= */}

                <button
                  type="button"
                  className="delete-item-btn"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  title={`Remove ${item.name}`}
                >
                  🗑️
                </button>
              </article>
            );
          })}
        </div>

        {/* ================= ORDER SUMMARY ================= */}

        <aside className="cart-summary">
          <p className="section-label">
            ORDER SUMMARY
          </p>

          <h3>Shopping Summary</h3>

          {/* Total number of plants */}

          <div className="summary-row">
            <span>Plants</span>
            <span>{totalItems}</span>
          </div>

          {/* Subtotal */}

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="summary-divider"></div>

          {/* Final total */}

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${totalAmount.toFixed(2)}
            </strong>
          </div>

          {/* ================= CHECKOUT ================= */}

          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout →
          </button>

          {/* ================= CONTINUE SHOPPING ================= */}

          <button
            type="button"
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            ← Continue Shopping
          </button>
        </aside>
      </div>
    </section>
  );
}

export default CartItem;