import React, { useState, useEffect } from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const handleOpenPriceChange = (e) => {
    setOpenPrice(e.target.value);
  };
  const handleStockChange = (selectedOption) => {
    setSelectedStock(selectedOption);
  };

  const handlePredict = () => {
    // Perform prediction logic here
    // Replace this with your own prediction implementation
    // Example: multiplying the open price by a fixed factor
    const prediction = parseFloat(openPrice) * 1.2; // Just a sample prediction
    const high = parseFloat(openPrice) + 2; // Just a sample prediction
    setHighPrice(high.toFixed(2));

    const low = parseFloat(openPrice) - 2; // Just a sample prediction
    setLowPrice(low.toFixed(2));

    const close = parseFloat(openPrice) * 1.2; // Just a sample prediction
    setClosePrice(close.toFixed(2));
    setPredictedPrice(prediction.toFixed(2));
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
        {/* <Col md={2} className="bg-dark-blue text-white p-3">
          <h3>Stocks</h3>
          <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">AAPL</Nav.Link>
          <Nav.Link href="/home">GOOGL</Nav.Link>
          <Nav.Link href="/home">MSFT</Nav.Link>
        </Nav>
        </Col> */}
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
                  onClick={() => handleStockChange(stock)}
                >
                  {stock.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Group className="mb-3">
            <Form.Label>Open Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter open day price"
              value={openPrice}
              onChange={handleOpenPriceChange}
            />
          </Form.Group>
          <Button variant="light" onClick={handlePredict} className="w-100">
            Predict
          </Button>
          {predictedPrice && (
            <Form.Group className="mt-4">
              <Form.Label>High</Form.Label>
              <Form.Control type="text" readOnly value={highPrice} />
              <Form.Label>Low</Form.Label>
              <Form.Control type="text" readOnly value={lowPrice} />
              <Form.Label>Close Price</Form.Label>
              <Form.Control type="text" readOnly value={closePrice} />
            </Form.Group>
          )}
          <Button
            variant="light"
            onClick={handleNavigate}
            className="w-100 mt-5"
          >
            Back
          </Button>
        </Col>
        <Col md={9}>
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
