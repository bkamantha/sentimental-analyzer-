from flask import Flask, render_template, request, jsonify
from service import process_comment

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/api/predict/", methods=["POST"])
def get_prediction():
    # Receive the comment from the request
    comment = request.json.get("comment", "")

    sentiment = process_comment(comment)

    # Return the sentiment as a JSON response
    return jsonify({"sentiment": sentiment})


if __name__ == "__main__":
    app.run(debug=True)
