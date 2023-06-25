# Function for preprocessing

def preprocess(name):

  # Load the 
  # create the file name
  filename = name + '.csv'
  # loading and reading the dataset
  data = pd.read_csv(filename)

  # Then data pre-processing
  # Drop the missing values
  data.dropna(axis=0, inplace=True)
  # Drop duplicates
  data.drop_duplicates(keep='first')

  # Shifting the data for next day open. close, high, low values
  data['next-open'] = data['open'].shift(-1)
  data['next-close'] = data['close'].shift(-1)
  data['next-high'] = data['high'].shift(-1)
  data['next-low'] = data['low'].shift(-1)

  # then again drop the rows with Null values of NaN
  data.dropna(axis=0, inplace=True)

  # Return the dataframe
  return data
