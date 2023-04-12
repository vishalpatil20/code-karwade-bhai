import "./gptbox.css";
import send from "../assets/send.png";
import React, { useState } from "react";
import bot from "../assets/bot.png";
import user from "../assets/user.png";

function Box() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let index = 0;

  function generateUniqueId() {
    const uniqueId = new Date().getTime().toString();
    return uniqueId;
  }

  async function chatStripe(isAi, value, uniqueId) {
    if (isAi) {
      let responses = value.split("\n\n");
      for (let i = 0; i < responses.length; i++) {
        setTimeout(() => {
          setMessages((messages) =>
            messages.map((message) =>
              message.id === uniqueId
                ? { ...message, text: responses[i] }
                : message
            )
          );
        }, i * 1000);
      }
    } else {
      setMessages((messages) => [
        ...messages,
        { isAi, text: value, id: uniqueId },
      ]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const prompt = formData.get("prompt");

    // Add user's message to the chat history
    const uniqueId = generateUniqueId();
    setMessages((messages) => [
      ...messages,
      { isAi: false, text: prompt, id: uniqueId },
    ]);

    // Clear the form
    form.reset();

    // Add a placeholder for the bot's message
    setMessages((messages) => [
      ...messages,
      { isAi: true, text: "", id: uniqueId + "_bot" },
    ]);

    // Make a request to the server
    setIsLoading(true);
    let response;
    try {
      response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
    } catch (error) {
      alert("Failed to connect to the server.");
      setMessages((messages) =>
        messages.map((message) =>
          message.id === uniqueId + "_bot"
            ? { ...message, text: "Failed to connect to the server." }
            : message
        )
      );
      setIsLoading(false);
      return;
    }

    if (response.status === 429) {
      alert("Too many requests. Please try again later.");
      setMessages((messages) =>
        messages.map((message) =>
          message.id === uniqueId + "_bot"
            ? { ...message, text: "Too many requests. Please try again later." }
            : message
        )
      );
    } else if (response.ok) {
      // Update the bot's message with the response from the server
      const data = await response.json();
      const botMessage = data.bot.trim();
      chatStripe(true, botMessage, uniqueId + "_bot");
    } else {
      // Handle errors
      const error = await response.text();
      alert(error);
      setMessages((messages) =>
        messages.map((message) =>
          message.id === uniqueId + "_bot"
            ? { ...message, text: "Something went wrong" }
            : message
        )
      );
    }

    setIsLoading(false);
  }
  return (
    <div className='box'>
      <div id="chat_container"></div>

      <div className='app'>
        <div className={`wrapper`} key={index}>
          <div className="chat">
            {messages.map((message, index) => (
              <div className="op">
                <div
                key={index}
                className={`message ${message.isAi ? "bot" : "user"}`}
              >
                <img
                  src={message.isAi ? bot : user}
                  alt={message.isAi ? "bot" : "user"}
                  className="profile"
                />
                <div className="message" id={message.id}>
                  {message.text}
                </div>
              </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              name="prompt"
              type="text"
              placeholder="Type your message here..."
            />
            <button type="submit">{isLoading ? 'Loading...' : 'Send'}<img src={send} alt="logo" className="send" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Box;