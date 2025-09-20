import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    image:
      "https://plus.unsplash.com/premium_photo-1679864782395-cc5697bf614f?w=2400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 3,
    name: "4K TV",
    price: 900,
    image:
      "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 5,
    name: "Laptop",
    price: 1300,
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 6,
    name: "Tablet",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 7,
    name: "Gaming Console",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1683823362932-6f7599661d22?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 8,
    name: "Drone Camera",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 9,
    name: "Smartphone",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 10,
    name: "VR Headset",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1702471897393-47ec1ba1192b?q=80&w=740&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

type Page = "home" | "support" | "account" | "rewards" | "stores";

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [page, setPage] = useState<Page>("home");

  const addToCart = (product: Product) => setCart([...cart, product]);
  const removeFromCart = (id: number) =>
    setCart(cart.filter((item) => item.id !== id));

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => setQuery(search);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="container">
      {/* Top Nav */}
      <div className="top-nav">
        <div className="left-nav">
          <button onClick={() => setPage("support")}>Support</button>
          <button onClick={() => setPage("account")}>Account</button>
          <button onClick={() => setPage("rewards")}>My Rewards</button>
          <button onClick={() => setPage("stores")}>Stores</button>
        </div>
        <div className="right-nav">
          <button
            className="icon-btn"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            🛒 {cart.length}
          </button>
        </div>
      </div>

      {/* Dropdown Cart */}
      {isCartOpen && (
        <div className="cart-dropdown">
          <h3>Your Cart</h3>
          {cart.length === 0 && <p>No items yet.</p>}
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                {item.name} - ${item.price}{" "}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          {cart.length > 0 && (
            <>
              <h4>Total: ${total}</h4>
              <button
                className="checkout"
                onClick={() => {
                  setIsCheckoutOpen(true);
                  setIsCartOpen(false);
                }}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}

      {/* Page Switcher */}
      {page === "home" && (
        <>
          <h1>Happy Sisters Electronics</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for gadgets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="products">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div key={p.id} className="card">
                  <img src={p.image} alt={p.name} />
                  <h2>{p.name}</h2>
                  <p>${p.price}</p>
                  <button onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              ))
            ) : (
              <p>No gadgets found. Try another search.</p>
            )}
          </div>
        </>
      )}

      {page === "support" && (
        <div className="page-content">
          <h1>Support</h1>
          <p>
            Welcome to our support page. Here you can find FAQs and contact
            information for assistance.
          </p>
        </div>
      )}

      {page === "account" && (
        <div className="page-content">
          <h1>My Account</h1>
          <p>Manage your profile, update details, and view past purchases.</p>
        </div>
      )}

      {page === "rewards" && (
        <div className="page-content">
          <h1>My Rewards</h1>
          <p>Check your reward points and redeem exclusive discounts.</p>
        </div>
      )}

      {page === "stores" && (
        <div className="page-content">
          <h1>Our Stores</h1>
          <p>
            Find a Happy Sisters Electronics store near you. We have branches
            across major cities.
          </p>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="checkout-modal">
          <div className="modal-content">
            <h2>Checkout Summary</h2>
            <ul>
              {cart.map((item, i) => (
                <li key={i}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <h3>Total: ${total}</h3>

            {/* Payment Form */}
            <h3>Payment Details</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Payment successful! Total paid: $${total}`);
                setCart([]);
                setIsCheckoutOpen(false);
              }}
              className="payment-form"
            >
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" required placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="123"
                  />
                </div>
              </div>
              <button type="submit" className="confirm-btn">
                Pay ${total}
              </button>
            </form>

            <button
              className="cancel-btn"
              onClick={() => setIsCheckoutOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        &copy; {new Date().getFullYear()} Happy Sisters Electronics. All rights
        reserved.
      </footer>
    </div>
  );
}
