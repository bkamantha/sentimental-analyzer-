// script.js

function analyzeSentiment() {
    const commentInput = document.getElementById("commentInput").value;

    // Check if the comment is not empty
    if (commentInput.trim() === "") {
        alert("Please enter a comment before submitting.");
        return;
    }

    // Simulate API request (replace this with your actual API endpoint)
    const apiUrl = "api/predict/";
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: commentInput }),
    })
        .then((response) => response.json())
        .then((data) => {
            displayResult(data.sentiment);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function displayResult(sentiment) {
    const emojisContainer = document.getElementById("emojis");

    // Add emojis based on sentiment
    emojisContainer.innerHTML = "";
    if (sentiment === "positive") {
        emojisContainer.innerHTML = "😃 Positive Comment!";
    } else if (sentiment === "negative") {
        emojisContainer.innerHTML = "😞 Negative Comment!";
    }
}
