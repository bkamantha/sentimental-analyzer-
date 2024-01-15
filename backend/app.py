from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/api/predict/", methods=["POST"])
def get_prediction():
    # Receive the comment from the request
    comment = request.json.get("comment", "")

    # Simple logic: if the comment contains the word "positive", return "positive"; otherwise, return "negative"
    if "positive" in comment.lower():
        sentiment = "positive"
    else:
        sentiment = "negative"

    # Return the sentiment as a JSON response
    return jsonify({"sentiment": sentiment})


if __name__ == "__main__":
    app.run(debug=True)
