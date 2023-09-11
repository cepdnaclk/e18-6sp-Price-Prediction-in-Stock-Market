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
    { value: "NVDA", label: "Nvidia" },
    { value: "CSCO", label: "Cisco Systems" },
    { value: "FDX", label: "FedEx" },
    { value: "LIN", label: "Linde PLC" },
    { value: "RTX", label: "Rtx Corp" },
    { value: "TSLA", label: "Tesla Inc" },
    // Add more stocks as needed
  ];

  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [stockPrices, setStockPrices] = useState([]);
  const [openPrice, setOpenPrice] = useState("");
  const [nextDayOpen, setnextDayOpen] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [name, setName] = useState(selectedStock.value); // Initialize the "Name" field with the selected stock label
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
    // Enable the "Predict" button only if all input fields have values
    if (openPrice && highPrice && lowPrice && closePrice) {
      setIsPredictButtonDisabled(false);
    } else {
      setIsPredictButtonDisabled(true);
    }
  };

  const handlePredict = () => {
    // Prepare the data to send in the POST request
    const requestData = {
      open: parseFloat(openPrice),
      high: parseFloat(highPrice),
      low: parseFloat(lowPrice),
      close: parseFloat(closePrice),
      name,
    };

    // Make a POST request to your server using Axios
    axios
      .post("http://127.0.0.1:5000/predict", requestData)
      .then((response) => {
        console.log(requestData);
        // Set the predicted price based on the server's response
        setnextDayOpen(response.data.NextDayOpen);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function high(){
    return (Math.random() * (320 - 300) + 320).toFixed(2);
  }

  function low(){
    return (Math.random() * (295 - 280) + 280).toFixed(2);
  }

  function close(){
    return (Math.random() * (310 - 290) + 290).toFixed(2);
  }

  useEffect(() => {
    // Simulating fetching stock prices
    const dummyStockPrices = [
      // const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
      { symbol: "AAPL", high: high(), low: low(), close: close() },
      { symbol: "GOOGL", high: high(), low: low(), close: close() },
      { symbol: "MSFT", high: high(), low: low(), close: close() },
      { symbol: "CSCO", high: high(), low: low(), close: close() },
      { symbol: "FDX", high: high(), low: low(), close: close() },
      { symbol: "GD", high: high(), low: low(), close: close() },
      { symbol: "LIN", high: high(), low: low(), close: close() },
      { symbol: "NVDA", high: high(), low: low(), close: close() },
      { symbol: "RTX", high: high(), low: low(), close: close() },
      { symbol: "TSLA", high: high(), low: low(), close: close() },
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
                  onClick={() => {
                    setSelectedStock(stock);
                    setName(stock.label); // Automatically set the "Name" field
                  }}
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
          <Form.Group className="mb-2" style={{ display: "none" }}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              readOnly
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
          {nextDayOpen && (
            <Form.Group className="mt-3">
              <Form.Label>Predicted Next Day Price</Form.Label>
              <Form.Control type="text" readOnly value={nextDayOpen} />
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
