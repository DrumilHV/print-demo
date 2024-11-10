import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [showPrintButton, setShowPrintButton] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Assume orderId is the ID of the order
  const orderId = "Order-12345";

  // Update the date and time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle after print to show the print button again and reset document title
  useEffect(() => {
    const handleAfterPrint = () => {
      setShowPrintButton(true);
      document.title = "Company Name"; // Reset document title
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const orderItems = [
    { id: 1, name: "Product A", cost: 25 },
    { id: 2, name: "Product B", cost: 15 },
    { id: 3, name: "Product C", cost: 30 },
  ];

  const totalCost = orderItems.reduce((total, item) => total + item.cost, 0);

  const handlePrint = () => {
    setShowPrintButton(false);
    document.title = orderId; // Set document title to order ID
    window.print();
    // The print button will reappear after printing due to the afterprint event
  };

  return (
    <div className="container">
      <div className="header">
        {/* Replace 'logo.png' with the path to your company logo */}
        <img src="instrumus.png" alt="Instrumus" className="logo" />
        <div className="company-info">
          <h1>Instrumus</h1>
          <p>Date and Time: {currentDateTime.toLocaleString()}</p>
        </div>
      </div>
      <div className="order-details">
        <h2>Order Items</h2>
        <p>Order ID: {orderId}</p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.cost.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalCost.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {showPrintButton && (
        <button onClick={handlePrint} className="print-button no-print">
          Print
        </button>
      )}
    </div>
  );
}

export default App;
