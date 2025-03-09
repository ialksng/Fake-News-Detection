from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the saved model & vectorizer
model = joblib.load("fake_news_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['text']
    transformed_text = vectorizer.transform([data])
    prediction = model.predict(transformed_text)
    result = "Fake News" if prediction[0] == 1 else "Real News"
    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(debug=True)
