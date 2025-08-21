import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

// Import images for Product Catalog
import Smartphone from "./Images/Smartphone.jpeg";
import Laptop from "./Images/Laptop.jpeg";
import Headphones from "./Images/Headphones.jpeg";

// Import images for Portfolio
import SJR from "./Images/SJR.jpeg";
import Ram from "./Images/Ram.jpeg";

// ProductCard with animated add-to-cart button
function ProductCard({ name, description, price, image }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!added) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div className="product-card">
      {image && <img src={image} alt={name} className="product-img" />}
      <h2 className="product-title">{name}</h2>
      <p className="product-desc">{description}</p>
      <p className="product-price">₹{price}</p>
      <button
        className={`product-btn ${added ? "added" : ""}`}
        onClick={handleAdd}
        disabled={added}
      >
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}

// Portfolio Card
function Card({ title, content, image, buttonText, buttonLink }) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-img" />}
      <h2 className="card-title">{title}</h2>
      <p className="card-content">{content}</p>
      {buttonText && buttonLink && (
        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="card-btn"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}

// Layout Component
function Layout({ header, children, footer }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <main className="layout-main">{children}</main>
      <footer className="layout-footer">{footer}</footer>
    </div>
  );
}

// Counter with visual press effect
function Counter() {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(null);

  const handleClick = (type) => {
    setPressed(type);
    setTimeout(() => setPressed(null), 150);
    if (type === "increment") setCount((c) => c + 1);
    else if (type === "decrement") setCount((c) => Math.max(0, c - 1));
    else if (type === "reset") setCount(0);
  };

  return (
    <div className="counter-container">
      <h2>React Counter App</h2>
      <div className="counter-value">{count}</div>
      <div className="buttons">
        <button
          onClick={() => handleClick("decrement")}
          disabled={count === 0}
          className={`btn decrement ${pressed === "decrement" ? "pressed" : ""}`}
        >
          Decrement
        </button>
        <button
          onClick={() => handleClick("reset")}
          className={`btn reset ${pressed === "reset" ? "pressed" : ""}`}
        >
          Reset
        </button>
        <button
          onClick={() => handleClick("increment")}
          className={`btn increment ${pressed === "increment" ? "pressed" : ""}`}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

// Calculator with button press effect
function Calculator() {
  const [value, setValue] = useState("");
  const [pressed, setPressed] = useState(null);

  const handleClick = (val) => {
    setPressed(val);
    setTimeout(() => setPressed(null), 150);
    setValue((v) => v + val);
  };

  const handleClear = () => {
    setPressed("C");
    setTimeout(() => setPressed(null), 150);
    setValue("");
  };

  const handleDelete = () => {
    setPressed("DEL");
    setTimeout(() => setPressed(null), 150);
    setValue((v) => v.slice(0, -1));
  };

  const handlePercent = () => {
    try {
      const result = evaluate(value) / 100;
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(value);
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  };

  return (
    <div className="counter-container calculator-container">
      <h2>React Calculator</h2>
      <input type="text" value={value} readOnly className="calc-input" />
      <div className="buttons calculator-buttons">
        <button
          onClick={handleClear}
          className={pressed === "C" ? "pressed" : ""}
          type="button"
        >
          C
        </button>
        <button
          onClick={handleDelete}
          className={pressed === "DEL" ? "pressed" : ""}
          type="button"
        >
          DEL
        </button>
        <button onClick={handlePercent} className="operator" type="button">
          %
        </button>
        <button
          onClick={() => handleClick("/")}
          className={`operator ${pressed === "/" ? "pressed" : ""}`}
          type="button"
        >
          ÷
        </button>
        {["7", "8", "9"].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className={pressed === num ? "pressed" : ""}
            type="button"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleClick("*")}
          className={`operator ${pressed === "*" ? "pressed" : ""}`}
          type="button"
        >
          ×
        </button>
        {["4", "5", "6"].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className={pressed === num ? "pressed" : ""}
            type="button"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleClick("-")}
          className={`operator ${pressed === "-" ? "pressed" : ""}`}
          type="button"
        >
          -
        </button>
        {["1", "2", "3"].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className={pressed === num ? "pressed" : ""}
            type="button"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleClick("+")}
          className={`operator ${pressed === "+" ? "pressed" : ""}`}
          type="button"
        >
          +
        </button>
        <button
          onClick={() => handleClick("0")}
          className={pressed === "0" ? "pressed" : ""}
          type="button"
        >
          0
        </button>
        <button
          onClick={() => handleClick(".")}
          className={pressed === "." ? "pressed" : ""}
          type="button"
        >
          .
        </button>
        <button
          onClick={handleCalculate}
          className={`equal ${pressed === "=" ? "pressed" : ""}`}
          type="button"
        >
          =
        </button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const products = [
    {
      name: "Smartphone",
      description: "Latest Android smartphone with 128GB storage.",
      price: "25,999",
      image: Smartphone,
    },
    {
      name: "Laptop",
      description: "Powerful laptop with 16GB RAM & 512GB SSD.",
      price: "72,499",
      image: Laptop,
    },
    {
      name: "Headphones",
      description: "Noise-cancelling over-ear wireless headphones.",
      price: "4,299",
      image: Headphones,
    },
  ];

  return (
    <Layout
      header={<h1>🌐 My Portfolio</h1>}
      footer={<p>© 2025 Janakiraman | All Rights Reserved</p>}
    >
      {/* Portfolio */}
      <section className="portfolio-section">
        <h2>👩‍💻 Portfolio</h2>
        <div className="app-container">
          <Card
            title="Janaki"
            content="Computer Science student specializing in web development and AI. Enthusiastic about problem-solving and open-source projects."
            image={SJR}
            buttonText="LinkedIn"
            buttonLink="https://www.linkedin.com/in/janaki-raman-s-b83649216"
          />
          <Card
            title="Ram"
            content="Computer Science student specializing in web development and AI. Enthusiastic about problem-solving and open-source projects."
            image={Ram}
            buttonText="GitHub"
            buttonLink="https://github.com"
          />
        </div>
      </section>

      {/* Product Catalog */}
      <section className="catalog-section">
        <h2>🛍️ Product Catalog</h2>
        <div className="catalog-grid">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </section>

      {/* Counter */}
      <section className="counter-section">
        <Counter />
      </section>

      {/* Calculator */}
      <section className="calculator-section">
        <Calculator />
      </section>
    </Layout>
  );
}

export default App;
