import pickle
import pandas as pd
from tensorflow.keras.models import load_model

# Prediction class
class Predict:

  def __init__ (self, open, close, high, low, name):
    self._open = float(open)
    self._close = float(close)
    self._high = float(high)
    self._low = float(low)
    self._name = name

  def getOpen(self):
    return self._open

  def getClose(self):
    return self._close

  def getHigh(self):
    return self._high

  def getLow(self):
    return self._low
  
  # Function for do predictions
  def predict_next_day_open_price(self):

      # Load the model 
      try:
          # get the model name
          model_name =  f"./backend/model/{self._name}.h5"

          # Open the model
          # model = pickle.load(open(model_name, 'rb'))
          model = load_model(model_name)

          # Prediting
          x = pd.DataFrame([(self._open, self._high, self._low, self._close)], 
                          columns= ['open', 'high', 'low', 'close'])
          prediction = model.predict(x)

          return prediction[0][0]

      except Exception as e:
          print(f"An error occurred: {str(e)}")


# if __name__ == "__main__":

#     obj = Predict(148.3, 148.8, 146.31, 146.86, "AAPL")
#     print(obj.predict_next_day_open_price())