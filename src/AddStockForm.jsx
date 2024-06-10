import React, { useState } from "react";
import axios from "axios";
import StockPrice from "./StockPrice";

function AddStockForm({ onAddStock }) {
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [fetchedPrice, setFetchedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const fetchedPrice = await fetchStockPrice(stockSymbol);
      if (fetchedPrice) {
        const totalPurchaseCost = quantity * purchasePrice;

        onAddStock({
          id: new Date().getTime(), // Create a unique ID for each stock
          symbol: stockSymbol,
          quantity,
          purchasePrice,
          totalPurchaseCost,
        });

        setStockSymbol("");
        setQuantity(0);
        setPurchasePrice(0);
        setFetchedPrice(fetchedPrice);
        setError(null);
      }
    } catch (error) {
      setError("Error fetching price. Please check the stock symbol and try again.");
      setFetchedPrice(null);
    }
  };

  const fetchStockPrice = async (symbol) => {
    const apiKey = "O6WVZHNEKH2VFWVO";
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data["Global Quote"];
      
      if (data && data["05. price"]) {
        return parseFloat(data["05. price"]);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching price:", error.message);
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
      {fetchedPrice && (
        <div>
          <StockPrice symbol={stockSymbol} />
          <p>Profit/Loss: ${(fetchedPrice * quantity - (quantity * purchasePrice)).toFixed(2)}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default AddStockForm;
