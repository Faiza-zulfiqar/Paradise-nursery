import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

function App() {
  // Controls which page is currently displayed
  const [page, setPage] = useState("home");

  // Required state for the Get Started functionality
  const [showProductList, setShowProductList] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total number of items in the cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Navigate between application pages
  const navigateTo = (targetPage) => {
    setPage(targetPage);

    if (targetPage === "plants") {
      setShowProductList(true);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Required Get Started handler
  const handleGetStartedClick = () => {
    setShowProductList(true);
    setPage("plants");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div
          className="brand"
          onClick={() => navigateTo("home")}
          role="button"
          tabIndex={0}
        >
          <span className="brand-icon">🌿</span>

          <div>
            <h1>Paradise Nursery</h1>
            <span>Bring Nature Home</span>
          </div>
        </div>

        <nav className="nav-links">
          <button onClick={() => navigateTo("home")}>
            Home
          </button>

          <button onClick={() => navigateTo("plants")}>
            Plants
          </button>

          <button onClick={() => navigateTo("about")}>
            About Us
          </button>

          <button
            className="cart-nav-button"
            onClick={() => navigateTo("cart")}
          >
            🛒 Cart
            <span className="cart-badge">{cartCount}</span>
          </button>
        </nav>
      </header>

      {/* ================= HOME / LANDING PAGE ================= */}

      {page === "home" && (
        <>
          <main className="background-image hero">
            <div className="hero-overlay">
              <div className="hero-content">
                <p className="eyebrow">
                  WELCOME TO YOUR GREEN SPACE
                </p>

                <h2>
                  Paradise Nursery
                  <br />
                  Grow Happiness,
                  <br />
                  One Plant at a Time.
                </h2>

                <p className="hero-text">
                  Discover beautiful houseplants carefully selected
                  to bring freshness, calm, and natural beauty into
                  your home.
                </p>

                {/* Required Get Started button */}
                <button
                  className="get-started-btn"
                  onClick={handleGetStartedClick}
                >
                  Get Started →
                </button>
              </div>
            </div>
          </main>

          <section className="about-section">
            <AboutUs />
          </section>
        </>
      )}

      {/* ================= PRODUCT LISTING PAGE ================= */}

      {page === "plants" && showProductList && (
        <main className="page-container">
          <ProductList />
        </main>
      )}

      {/* ================= ABOUT US PAGE ================= */}

      {page === "about" && (
        <main className="page-container">
          <AboutUs />
        </main>
      )}

      {/* ================= SHOPPING CART PAGE ================= */}

      {page === "cart" && (
        <main className="page-container">
          <CartItem />
        </main>
      )}
    </div>
  );
}

export default App;