import React, { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">Invoice Generator</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <InvoiceForm />
      </div>
    </div>
  );
}

export default App;
