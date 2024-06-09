import { useState } from 'react'
import './App.css'
import StockList from './StockList';
import AddStockForm from './AddStockForm';

function App() {
  const [stocks, setStocks] = useState([]);

  const handleAddStock = (newStock) => {
    setStocks([...stocks, newStock]);
  };

  return (
    <div className='dashboard-container'>
      <h1>Finance Dashboard</h1>
      <AddStockForm onAddStock={handleAddStock} /> 
      <h2>Stock List</h2>
      <StockList stocks={stocks} />  
    </div>
  );
}

export default App
