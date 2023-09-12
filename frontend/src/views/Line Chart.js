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
    { value: "NVDA", label: "Nvidia" },
    { value: "CSCO", label: "Cisco Systems" },
    { value: "FDX", label: "FedEx" },
    { value: "LIN", label: "Linde PLC" },
    { value: "RTX", label: "Rtx Corp" },
    { value: "TSLA", label: "Tesla Inc" },
    { value: "GD", label: "General Dynamics" },
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
          { x: 1, y: 230 },
          { x: 2, y: 240 },
          { x: 3, y: 220 },
          { x: 4, y: 235 },
          { x: 5, y: 215 },
          { x: 6, y: 225 },
          { x: 7, y: 245 },
          { x: 8, y: 210 },
          { x: 9, y: 200 },
          { x: 10, y: 235 },
        ];
      case "GOOGL":
        return [
          { x: 1, y: 210 },
          { x: 2, y: 225 },
          { x: 3, y: 215 },
          { x: 4, y: 220 },
          { x: 5, y: 230 },
          { x: 6, y: 205 },
          { x: 7, y: 190 },
          { x: 8, y: 200 },
          { x: 9, y: 195 },
          { x: 10, y: 215 },
        ];
      case "MSFT":
        return [
          { x: 1, y: 180 },
          { x: 2, y: 200 },
          { x: 3, y: 210 },
          { x: 4, y: 195 },
          { x: 5, y: 185 },
          { x: 6, y: 175 },
          { x: 7, y: 190 },
          { x: 8, y: 215 },
          { x: 9, y: 170 },
          { x: 10, y: 195 },
        ];
      case "TSLA":
        return [
          { x: 1, y: 215 },
          { x: 2, y: 250 },
          { x: 3, y: 235 },
          { x: 4, y: 260 },
          { x: 5, y: 230 },
          { x: 6, y: 245 },
          { x: 7, y: 255 },
          { x: 8, y: 225 },
          { x: 9, y: 220 },
          { x: 10, y: 210 },
        ];
      case "CSCO":
        return [
          { x: 1, y: 220 },
          { x: 2, y: 235 },
          { x: 3, y: 215 },
          { x: 4, y: 245 },
          { x: 5, y: 230 },
          { x: 6, y: 250 },
          { x: 7, y: 210 },
          { x: 8, y: 255 },
          { x: 9, y: 225 },
          { x: 10, y: 260 },
        ];
      case "FDX":
        return [
          { x: 1, y: 250 },
          { x: 2, y: 260 },
          { x: 3, y: 245 },
          { x: 4, y: 255 },
          { x: 5, y: 240 },
          { x: 6, y: 265 },
          { x: 7, y: 230 },
          { x: 8, y: 270 },
          { x: 9, y: 235 },
          { x: 10, y: 280 },
        ];
      case "GD":
        return [
          { x: 1, y: 180 },
          { x: 2, y: 220 },
          { x: 3, y: 190 },
          { x: 4, y: 210 },
          { x: 5, y: 200 },
          { x: 6, y: 215 },
          { x: 7, y: 185 },
          { x: 8, y: 225 },
          { x: 9, y: 205 },
          { x: 10, y: 195 },
        ];
      case "LIN":
        return [
          { x: 1, y: 180 },
          { x: 2, y: 195 },
          { x: 3, y: 230 },
          { x: 4, y: 215 },
          { x: 5, y: 230 },
          { x: 6, y: 245 },
          { x: 7, y: 250 },
          { x: 8, y: 230 },
          { x: 9, y: 280 },
          { x: 10, y: 290 },
        ];
      case "NVDA":
        return [
          { x: 1, y: 240 },
          { x: 2, y: 235 },
          { x: 3, y: 358 },
          { x: 4, y: 252 },
          { x: 5, y: 345 },
          { x: 6, y: 360 },
          { x: 7, y: 265 },
          { x: 8, y: 220 },
          { x: 9, y: 272 },
          { x: 10, y: 275 },
        ];
      case "RTX":
        return [
          { x: 1, y: 340 },
          { x: 2, y: 335 },
          { x: 3, y: 348 },
          { x: 4, y: 352 },
          { x: 5, y: 345 },
          { x: 6, y: 360 },
          { x: 7, y: 365 },
          { x: 8, y: 320 },
          { x: 9, y: 372 },
          { x: 10, y: 375 },
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
    <Container fluid >
      <Row>
        <Col md={2} className="bar">
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
        <Col md={10} mx={15}>
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
