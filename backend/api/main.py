# Importing libraries
import uvicorn      # to create a server having a host and port of your preference for communicating with our API via HTTP requests and responses
import pickle       # to load up trained model
from pydantic import BaseModel  # for defining our API request parameters. This is important for ensuring that we are sending the right data types to our trained machine learning model.
from fastapi import FastAPI     # to define the routes and the functions a route will run when accessed by a client.
from fastapi.middleware.cors import CORSMiddleware  # to define the domains that will get resources from our API

# initialize the fast API server
app = FastAPI()

# Origins that can access our moedl
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# Loading the trained model
model = pickle.load(open('backend/model/winequality.pkl', 'rb'))

# Defining the model input types
# to ensure only accepted data is added to the model
class Candidate(BaseModel):
    fixed_acidity: float
    volatile_acidity: float
    citric_acid: float
    residual_sugar: float
    chlorides: float 
    free_sulfur_dioxide: float
    total_sulfur_dioxide: float
    density: float
    ph: float
    sulphates: float
    alcohol: float

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to the price prediction model"}

# Setting up prediction route
@app.post("/prediction")
async def get_predict(data: Candidate):
    sample = [[
        data.fixed_acidity,
        data.volatile_acidity,
        data.citric_acid,
        data.residual_sugar,
        data.chlorides,
        data.free_sulfur_dioxide,
        data.total_sulfur_dioxide,
        data.density,
        data.ph,
        data.sulphates,
        data.alcohol
    ]]

    quality = model.predict(sample).tolist()[0]

    return {
        "data": {
            'prediction' : quality
        }
    }

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')
