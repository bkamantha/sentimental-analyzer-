// script.js

function resizeInput(input) {
    // Reset the input width to its default before calculating the new width
    input.style.width = "auto";

    // Set the input width based on the content
    input.style.width = input.scrollWidth + "px";
}

function analyzeSentiment() {
    const commentInput = document.getElementById("commentInput").value;

    // Check if the comment is not empty
    if (commentInput.trim() === "") {
        alert("Please enter a comment before submitting.");
        return;
    }

    // Get the submit button
    const submitButton = document.querySelector(".btn-primary");

    // Disable the button during the delay and change text to "Analyzing"
    submitButton.disabled = true;
    submitButton.innerText = "Analyzing..";

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
            // Display result after a delay
            setTimeout(() => {
                displayResult(data.sentiment);

                // Enable the button and change text back to "Submit" after displaying the result
                submitButton.disabled = false;
                submitButton.innerText = "Submit";
            }, 500); // 0.5 seconds delay
        })
        .catch((error) => {
            console.error("Error:", error);
            // Enable the button and change text back to "Submit" in case of an error
            submitButton.disabled = false;
            submitButton.innerText = "Submit";
        });
}

function displayResult(sentiment) {
    const resultContainer = document.getElementById("result");
    const emojisContainer = document.getElementById("emojis");

    // Add emojis based on sentiment
    emojisContainer.innerHTML = "";
    if (sentiment === "positive") {
        emojisContainer.innerHTML = "Positive Sentiment 😃!";
    } else if (sentiment === "negative") {
        emojisContainer.innerHTML = "Negative Sentiment 😞!";
    }

    // Hide the result after 2 seconds
    setTimeout(() => {
        resultContainer.innerHTML = "";
        emojisContainer.innerHTML = "";
    }, 10000); // 2 seconds delay
}
