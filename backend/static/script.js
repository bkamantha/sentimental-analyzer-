// script.js

function resizeInput(input) {
    // Reset the input width to its default before calculating the new width
    input.style.width = "auto";

    // Set the input width based on the content
    input.style.width = input.scrollWidth + "px";
}

function analyzeSentiment() {
    const commentInput = document.getElementById("commentInput").value;
    const sentimentModel = document.querySelector('input[name="sentimentModel"]:checked').value;

    // Check if the comment is not empty
    if (commentInput.trim() === "") {
        alert("Please enter a comment before submitting.");
        return;
    }

    // Get the submit button
    const submitButton = document.querySelector(".btn-primary");

    // Disable the button during the delay and change text to "Analyzing"
    submitButton.disabled = true;
    submitButton.innerText = "Analyzing...";

    // Set the appropriate API endpoint based on the selected sentiment model
    const apiUrl = sentimentModel === "model" ? "api/predict/" : "/gpt/predict/";

    // Simulate API request (replace this with your actual API endpoint)
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

// script.js

function displayResult(sentiment) {
    const resultContainer = document.getElementById("result");
    const emojisContainer = document.getElementById("emojis");

    // Clear previous content
    emojisContainer.innerHTML = "";

    // Check the selected model (based on the radio button)
    const sentimentModel = document.querySelector('input[name="sentimentModel"]:checked').value;

    if (sentimentModel === "model") {
        // Display emojis based on sentiment for the model
        if (sentiment === "positive") {
            emojisContainer.innerHTML = "Model Response: Positive Sentiment 😃!";
        } else if (sentiment === "negative") {
            emojisContainer.innerHTML = "Model Response: Negative Sentiment 😞!";
        }
    } else if (sentimentModel === "gpt") {
        // Display GPT response
        emojisContainer.innerHTML = `GPT Response: ${sentiment}`;
    }

    setTimeout(() => {
        resultContainer.innerHTML = "";
        emojisContainer.innerHTML = "";
    }, 15000);
}
