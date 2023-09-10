from flask import Flask, request, jsonify
from flask_cors import CORS
from prediction import Predict

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def get_next_day():
    # get posted data
    inputData = request.get_json();

    if inputData :
        # Add input data to predict
        model = Predict(inputData['open'], inputData['close'], inputData['high'], inputData['low'], inputData['name']);

        # Send data as respond
        try:
            nxtOpenPrice = model.predict_next_day_open_price();
            return jsonify({'NextDayOpen' : str(nxtOpenPrice)})

        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
