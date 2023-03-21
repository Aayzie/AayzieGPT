const inputField = document.getElementById("input-field");
const sendButton = document.getElementById("send-button");
const undoButton = document.getElementById("undo-button");
const messagesContainer = document.getElementById("messages-container");
const loadingIndicator = document.getElementById("loading-indicator");

let messages = [];

sendButton.addEventListener("click", sendMessage);
undoButton.addEventListener("click", undoLastMessage);

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const userText = inputField.value;
  inputField.value = "";

  if (userText.trim() !== "") {
    addMessage("user", userText);
    showLoadingIndicator();

    const responseText = await getResponseFromScaleAI(getMessageHistory());
    hideLoadingIndicator();
    addMessage("response", responseText);
  }
}

function addMessage(sender, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);

  const messageText = document.createElement("div");
  messageText.innerHTML = text.replace(/\n/g, "<br>");
  messageElement.appendChild(messageText);

  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  messages.push({ sender, text });
}

function undoLastMessage() {
  if (messages.length >= 2) {
    messages.pop();
    messages.pop();
    const messageElements = document.querySelectorAll(".message");
    messageElements[messageElements.length - 1].remove();
    messageElements[messageElements.length - 2].remove();
  }
}

function getMessageHistory() {
  return messages.map((message) => message.text).join("\n");
}

async function getResponseFromScaleAI(text) {
  const apiUrl = "http://localhost:3000/api/scaleai";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
    timeout: 5 * 60 * 1000, // 5 minutes
  };

  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (data && data.output) {
      return data.output.trim();
    } else {
      throw new Error("Invalid response from Scale API");
    }
  } catch (error) {
    console.error(error);
    return "Sorry, there was an error processing your request. Please try again later.";
  }
}

function showLoadingIndicator() {
  loadingIndicator.style.visibility = "visible";
}

function hideLoadingIndicator() {
  loadingIndicator.style.visibility = "hidden";
}

hideLoadingIndicator();