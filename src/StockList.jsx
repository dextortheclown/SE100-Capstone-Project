import React from 'react';
import StockPrice from './StockPrice';

function StockList({ stocks }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Profit/Loss</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}> {/* Assuming each stock has a unique id */}
            <td>{stock.symbol}</td>
            <td>{stock.quantity}</td>
            <td>
              <StockPrice symbol={stock.symbol} />
            </td>
            <td>
              <StockPrice
                symbol={stock.symbol}
                calculateProfitLoss={(price) =>
                  ((price - stock.purchasePrice) * stock.quantity).toFixed(2)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockList;
