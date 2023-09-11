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
        const aapldata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            aapldata.push({ x, y });
        }
        return aapldata;
      case "GOOGL":
        const googldata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            googldata.push({ x, y });
        }
        return googldata;
      case "MSFT":
        const msftdata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            msftdata.push({ x, y });
        }
        return msftdata;
      case "TSLA":
        const tsladata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            tsladata.push({ x, y });
        }
        return tsladata;
      case "CSCO":
        const cscodata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            cscodata.push({ x, y });
        }
        return cscodata;
      case "FDX":
        const fdxdata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            fdxdata.push({ x, y });
        }
        return fdxdata;
      case "GD":
        const gddata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            gddata.push({ x, y });
        }
        return gddata;
      case "LIN":
        const lindata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            lindata.push({ x, y });
        }
        return lindata;
      case "NVDA":
        const nvdadata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            nvdadata.push({ x, y });
        }
        return nvdadata;
      case "RTX":
        const rtxdata = [];
        for (let x = 1; x <= 10; x++) {
            // Generate random y values within a certain range
            const y = Math.floor(Math.random() * (400 - 320 + 1)) + 320;
            rtxdata.push({ x, y });
        }
        return rtxdata;
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
