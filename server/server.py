from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Mindcare backend is running!"})

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    return jsonify({"reply": f"You said: {user_message}"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
