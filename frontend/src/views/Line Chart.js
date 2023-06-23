import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = () => {
  const navigate = useNavigate();

  const stocks = [
    { value: "AAPL", label: "Apple" },
    { value: "GOOGL", label: "Google" },
    { value: "MSFT", label: "Microsoft" },
    // Add more stocks as needed
  ];

  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [openPrice, setOpenPrice] = useState("");
  const [predictedPrice, setPredictedPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");

  const handleOpenPriceChange = (e) => {
    setOpenPrice(e.target.value);
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

  const fetchDataPoints = (stock) => {
    // Replace with your logic to fetch the data points for the selected stock
    // This is just a sample implementation
    switch (stock.value) {
      case "AAPL":
        return [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 64 },
          { x: 4, y: 62 },
          { x: 5, y: 64 },
          { x: 6, y: 60 },
          { x: 7, y: 58 },
          { x: 8, y: 59 },
          { x: 9, y: 53 },
          { x: 10, y: 54 },
          // Add more data points for Apple
        ];
      case "GOOGL":
        return [
          { x: 1, y: 75 },
          { x: 2, y: 70 },
          { x: 3, y: 72 },
          { x: 4, y: 68 },
          { x: 5, y: 73 },
          { x: 6, y: 70 },
          { x: 7, y: 72 },
          { x: 8, y: 75 },
          { x: 9, y: 78 },
          { x: 10, y: 80 },
          // Add more data points for Google
        ];
      case "MSFT":
        return [
          { x: 1, y: 80 },
          { x: 2, y: 82 },
          { x: 3, y: 78 },
          { x: 4, y: 85 },
          { x: 5, y: 83 },
          { x: 6, y: 86 },
          { x: 7, y: 88 },
          { x: 8, y: 90 },
          { x: 9, y: 87 },
          { x: 10, y: 84 },
          // Add more data points for Microsoft
        ];
      default:
        return [];
    }
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "",
      horizontalAlign: "center", // Center align the title
    },
    axisY: {
      title: "Price",
      includeZero: false,
      suffix: "$",
    },
    axisX: {
      title: "Date",
      prefix: "",
      interval: 1,
    },
    data: [
      {
        type: "line",
        toolTipContent: "Date {x}: ${y}",
        dataPoints: fetchDataPoints(selectedStock),
      },
    ],
  };

  const handleStockChange = (selectedOption) => {
    setSelectedStock(selectedOption);
  };

  const handleNavigate = () => {
    // Navigate to another page
    navigate("/all");
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
            View All Stocks
          </Button>
        </Col>
        <Col md={10}>
          <div className="p-3">
            <h1 className="text-center">Stock Market Price Prediction</h1>
            <CanvasJSChart options={options} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LineChart;
