import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout Coming Soon! 🌿");
  };

  const handleContinueShopping = () => {
    window.location.href = "/";
  };

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <p className="section-label">YOUR SHOPPING CART</p>

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
            ← Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div>
          <p className="section-label">YOUR SHOPPING CART</p>

          <h2>My Cart</h2>

          <p>
            Review your plants and adjust quantities before checkout.
          </p>
        </div>

        <div className="cart-total-preview">
          <span>Total</span>

          <strong>${totalAmount.toFixed(2)}</strong>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => {
            const itemTotal = item.price * item.quantity;

            return (
              <article className="cart-item" key={item.id}>
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                {/* DETAILS */}
                <div className="cart-item-details">
                  <span className="cart-item-category">
                    {item.category}
                  </span>

                  <h3>{item.name}</h3>

                  <p className="cart-unit-price">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                {/* QUANTITY */}
                <div className="quantity-section">
                  <span className="quantity-label">
                    Quantity
                  </span>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ITEM TOTAL */}
                <div className="cart-item-total">
                  <span>Item Total</span>

                  <strong>
                    ${itemTotal.toFixed(2)}
                  </strong>
                </div>

                {/* DELETE */}
                <button
                  type="button"
                  className="delete-item-btn"
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                >
                  🗑️
                </button>
              </article>
            );
          })}
        </div>

        {/* SUMMARY */}
        <aside className="cart-summary">
          <p className="section-label">ORDER SUMMARY</p>

          <h3>Shopping Summary</h3>

          <div className="summary-row">
            <span>Plants</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${totalAmount.toFixed(2)}
            </strong>
          </div>

          {/* CHECKOUT */}
          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout →
          </button>

          {/* CONTINUE SHOPPING */}
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