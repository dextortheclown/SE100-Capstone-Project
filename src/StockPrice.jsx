import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPrice = ({ symbol, calculateProfitLoss }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = 'O6WVZHNEKH2VFWVO';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
        const response = await axios.get(url);
        const data = response.data['Global Quote'];
        setPrice(parseFloat(data['05. price']));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  return (
    <div>
      {loading ? (
        <p>Fetching price...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : price !== null ? (
        <p>
          {symbol}: ${price.toFixed(2)}
        </p>
      ) : (
        <p>No symbol provided</p>
      )}
      {price !== null && calculateProfitLoss && (
        <p>Profit/Loss: ${calculateProfitLoss(price)}</p>
      )}
    </div>
  );
};

export default StockPrice;
