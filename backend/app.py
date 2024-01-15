from flask import Flask, render_template, request, jsonify
from service import process_comment
from gpt import generate_gpt_response

app = Flask(__name__)


@app.route("/")
def init_main():
    return render_template("index.html")


@app.route("/api/predict/", methods=["POST"])
def get_prediction():
    # Receive the comment from the request
    comment = request.json.get("comment", "")

    sentiment = process_comment(comment)

    # Return the sentiment as a JSON response
    return jsonify({"sentiment": sentiment})


@app.route("/gpt/predict/", methods=["POST"])
def gpt_prediction():
    # Receive the comment from the request
    comment = request.json.get("comment", "")
    sentiment = generate_gpt_response(
        "i want to know this text sentimental level as positive or negative text is Quote ("
        + comment
        + ") and the what is the sentimental level"
    )

    # Return the sentiment as a JSON response
    return jsonify({"sentiment": sentiment})


if __name__ == "__main__":
    app.run(debug=True)
