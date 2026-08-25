import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

function App() {
  const [page, setPage] = useState("home");

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigateTo = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div className="brand" onClick={() => navigateTo("home")}>
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

            <span className="cart-badge">
              {cartCount}
            </span>
          </button>
        </nav>
      </header>

      {/* ================= HOME ================= */}

      {page === "home" && (
        <>
          <main className="hero">
            <div className="hero-overlay">
              <div className="hero-content">
                <p className="eyebrow">
                  WELCOME TO YOUR GREEN SPACE
                </p>

                <h2>
                  Grow Happiness,
                  <br />
                  One Plant at a Time.
                </h2>

                <p className="hero-text">
                  Discover beautiful houseplants carefully selected
                  to bring freshness, calm, and natural beauty into
                  your home.
                </p>

                <button
                  className="get-started-btn"
                  onClick={() => navigateTo("plants")}
                >
                  Get Started →
                </button>
              </div>
            </div>
          </main>

          <AboutUs />
        </>
      )}

      {/* ================= PLANTS ================= */}

      {page === "plants" && (
        <main className="page-container">
          <ProductList />
        </main>
      )}

      {/* ================= ABOUT ================= */}

      {page === "about" && (
        <main className="page-container">
          <AboutUs />
        </main>
      )}

      {/* ================= CART ================= */}

      {page === "cart" && (
        <main className="page-container">
          <CartItem />
        </main>
      )}
    </div>
  );
}

export default App;