import { useState } from "react";
import axios from "axios";

function App() {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newsText) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://fake-news-detector.azurewebsites.net/predict", // Replace with your Azure API URL
        { text: newsText }
      );
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error in prediction.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Fake News Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder="Enter news content here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          required
        ></textarea>
        <button type="submit">{loading ? "Checking..." : "Check News"}</button>
      </form>
      {result && <h2 className={result === "Fake News" ? "fake" : "real"}>{result}</h2>}
    </div>
  );
}

export default App;
