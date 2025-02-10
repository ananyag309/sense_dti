import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US"); // Default language is English

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = language; // Set selected language
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <select className="dropdown" onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="bn-IN">Bengali</option>
          <option value="gu-IN">Gujarati</option>
          <option value="kn-IN">Kannada</option>
          <option value="ta-IN">Tamil</option>
          <option value="te-IN">Telugu</option>
        </select>

        <textarea
          className="text-box"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Speech output here"
        />

        <div className="button-container">
          <button className="blue-button" onClick={startListening}>Start Listening</button>
          <button className="blue-button" onClick={() => setText("")}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
