import React, { useState, useEffect } from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StockPricesPage = () => {
  const navigate = useNavigate();

  const stocks = [
    { value: "AAPL", label: "Apple" },
    { value: "GOOGL", label: "Google" },
    { value: "MSFT", label: "Microsoft" },
    // Add more stocks as needed
  ];

  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [stockPrices, setStockPrices] = useState([]);
  const [openPrice, setOpenPrice] = useState("");
  const [predictedPrice, setPredictedPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [isPredictButtonDisabled, setIsPredictButtonDisabled] = useState(true);

  const handleOpenPriceChange = (e) => {
    setOpenPrice(e.target.value);
    checkInputValues();
  };

  const handleHighPriceChange = (e) => {
    setHighPrice(e.target.value);
    checkInputValues();
  };

  const handleLowPriceChange = (e) => {
    setLowPrice(e.target.value);
    checkInputValues();
  };

  const handleClosePriceChange = (e) => {
    setClosePrice(e.target.value);
    checkInputValues();
  };

  const checkInputValues = () => {
    // Enable the "Predict" button only if all four input fields have values
    if (openPrice && highPrice && lowPrice && closePrice) {
      setIsPredictButtonDisabled(false);
    } else {
      setIsPredictButtonDisabled(true);
    }
  };

  const handlePredict = () => {
    // Prepare the data to send in the POST request
    const requestData = {
      openPrice: parseFloat(openPrice),
      highPrice: parseFloat(highPrice),
      lowPrice: parseFloat(lowPrice),
      closePrice: parseFloat(closePrice),
    };

    // Make a POST request to your server using Axios
    axios
      .post("/api/predict", requestData)
      .then((response) => {
        // Set the predicted price based on the server's response
        setPredictedPrice(response.data.predictedPrice.toFixed(2));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Simulating fetching stock prices
    const dummyStockPrices = [
      { symbol: "AAPL", high: 150.23, low: 148.45, close: 149.75 },
      { symbol: "GOOGLE", high: 2765.34, low: 2748.12, close: 2758.56 },
      { symbol: "MSFT", high: 305.67, low: 302.89, close: 304.91 },
    ];
    setStockPrices(dummyStockPrices);
  }, []);

  const handleNavigate = () => {
    // Navigate to another page
    navigate("/view");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark-blue text-white p-3">
          <h3 className="text-center mb-4">Stocks</h3>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {selectedStock.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {stocks.map((stock) => (
                <Dropdown.Item
                  key={stock.value}
                  active={selectedStock.value === stock.value}
                  onClick={() => setSelectedStock(stock)}
                >
                  {stock.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Group className="mb-2">
            <Form.Label>Open Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter open day price"
              value={openPrice}
              onChange={handleOpenPriceChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>High Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter high day price"
              value={highPrice}
              onChange={handleHighPriceChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Low Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter low day price"
              value={lowPrice}
              onChange={handleLowPriceChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Close Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter close day price"
              value={closePrice}
              onChange={handleClosePriceChange}
            />
          </Form.Group>
          <Button
            variant="light"
            onClick={handlePredict}
            className="w-100"
            disabled={isPredictButtonDisabled}
          >
            Predict
          </Button>
          {predictedPrice && (
            <Form.Group className="mt-3">
              <Form.Label>Predicted Next Day Price</Form.Label>
              <Form.Control type="text" readOnly value={predictedPrice} />
            </Form.Group>
          )}
          <Button
            variant="light"
            onClick={handleNavigate}
            className="w-100 mt-3"
          >
            Back
          </Button>
        </Col>
        <Col md={10}>
          <div className="p-3">
            <h1 className="text-center">Stock Prices</h1>
            {stockPrices.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                  </tr>
                </thead>
                <tbody>
                  {stockPrices.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.high}</td>
                      <td>{stock.low}</td>
                      <td>{stock.close}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Loading stock prices...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StockPricesPage;
