import React, { useState, useEffect } from "react";
import "./App.css";

// Sample products data
const PRODUCTS = [
  { id: 1, name: "Smartphone", price: 25999 },
  { id: 2, name: "Laptop", price: 72499 },
  { id: 3, name: "Headphones", price: 4299 },
];
// Above we have product name and 
// Shopping Cart Component
function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [animatingId, setAnimatingId] = useState(null);

  const addToCart = (product) => {
    setAnimatingId(product.id);
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
    setTimeout(() => setAnimatingId(null), 400);
  };

  const removeFromCart = (productId) => {
    setAnimatingId(productId);
    setCartItems((items) => {
      const existing = items.find((item) => item.id === productId);
      if (!existing) return items;
      if (existing.quantity === 1) {
        return items.filter((item) => item.id !== productId);
      }
      return items.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
    setTimeout(() => setAnimatingId(null), 400);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-cart">
      <h2>Products</h2>
      <div className="products-list">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product">
            <span>{product.name} - ₹{product.price.toLocaleString()}</span>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="add-btn"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map(({ id, name, price, quantity }) => (
            <li
              key={id}
              className={`cart-item ${animatingId === id ? "animate" : ""}`}
            >
              <span>
                {name} (₹{price.toLocaleString()}) x{" "}
                <AnimatedCounter value={quantity} />
              </span>
              <div className="cart-actions">
                <button
                  type="button"
                  onClick={() => addToCart({ id, name, price })}
                  aria-label={`Increase quantity of ${name}`}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeFromCart(id)}
                  aria-label={`Decrease quantity of ${name}`}
                >
                  −
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="cart-total">Total: ₹{total.toLocaleString()}</div>
      )}
    </div>
  );
}

// Animated counter component for smooth quantity changes
function AnimatedCounter({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDisplayValue(value), 150);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <span className={`counter-value ${value !== displayValue ? "changing" : ""}`}>
      {displayValue}
    </span>
  );
}

// Contact Form with real-time validation
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    )
      errs.email = "Invalid email address";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
  }, [form]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      alert("Thank you for contacting us!");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? "error" : form.name ? "valid" : ""}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
        {errors.name && <div id="name-error" className="error-msg">{errors.name}</div>}
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "error" : form.email ? "valid" : ""}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && <div id="email-error" className="error-msg">{errors.email}</div>}
      </label>
      

      <label>
        Message:
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className={errors.message ? "error" : form.message ? "valid" : ""}
          aria-invalid={!!errors.message}
          aria-describedby="msg-error"
        />
        {errors.message && <div id="msg-error" className="error-msg">{errors.message}</div>}
      </label>

      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Send
      </button>
      {submitted && (
        <div className="success-msg" role="alert" tabIndex={0}>
          Thank you for contacting us!
        </div>
      )}
    </form>
  );
}

// Main App component wrapped for overall border
export default function App() {
  return (
    <div className="page-wrapper">
      <div className="app-container">
        <ShoppingCart />
        <ContactForm />
      </div>
    </div>
  );
}
