# SE100 Capstone Project

This project is a simple stock tracking application built using React. It allows users to add stocks, specify quantities and purchase prices, and fetch the current stock prices to calculate profit/loss.

## Features

- Add new stocks with their symbol, quantity, and purchase price.
- Fetch the latest stock price using the Alpha Vantage API.
- Display the profit/loss for each stock based on the current price.

## Components

### AddStockForm

A form component that allows users to add new stocks. It also fetches the latest stock price and calculates the profit/loss.

### StockList

A component that displays a list of added stocks with their details and the current stock price.

### StockPrice

A component that fetches and displays the current stock price from the Alpha Vantage API.
