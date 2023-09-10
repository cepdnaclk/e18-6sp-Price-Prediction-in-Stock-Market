import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";

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
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [nextDayOpen, setnextDayOpen] = useState("");
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
      name: selectedStock.value, // Set the name based on selected stock
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
          <Dropdown className="mb-2">
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
              value={selectedStock.label}
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
