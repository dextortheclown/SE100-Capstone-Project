import React, { useState, useEffect } from "react";
import axios from "axios";
import StockPrice from "./StockPrice"; // Import StockPrice component

function AddStockForm({ onAddStock }) {
    const [stockSymbol, setStockSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [fetchedPrice, setFetchedPrice] = useState(null);
    const [error, setError] = useState(null);
    const [totalPurchaseCost, setTotalPurchaseCost] = useState(0);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const totalPurchaseCost = quantity * purchasePrice;
      setTotalPurchaseCost(totalPurchaseCost);
  
      try {
        await fetchStockPrice(stockSymbol);
  
        onAddStock({
          stockSymbol,
          quantity: parseFloat(quantity),
          purchasePrice: parseFloat(purchasePrice),
          totalPurchaseCost,
        });
  
        setStockSymbol("");
        setQuantity("");
        setPurchasePrice("");
        setError(null);
      } catch (error) {
        setError("Failed to fetch stock price. Please try again.");
      }
    };
  
    const fetchStockPrice = async (symbol) => {
      const apiKey = 'O6WVZHNEKH2VFWVO'; 
      try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
        const response = await axios.get(url);
        const data = response.data['Global Quote'];
        if (data && data['05. price']) {
          setFetchedPrice(parseFloat(data['05. price']));
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        console.error('Error fetching price:', error);
        setFetchedPrice(null);
        throw error;
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Stock Symbol:
          <input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Purchase Price:
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </label>
        <button type="submit">Add Stock</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {fetchedPrice ? (
          <div>
            <StockPrice symbol={stockSymbol} price={fetchedPrice} />
            <p>Profit/Loss: ${(fetchedPrice * quantity - totalPurchaseCost).toFixed(2)}</p>
          </div>
        ) : (
            <p></p>
        )}
      </form>
    );
  }
  
  export default AddStockForm;