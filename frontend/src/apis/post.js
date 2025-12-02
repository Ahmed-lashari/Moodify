/**
 * POST request to predict mood from lyrics
 * @param {string} lyrics - The song lyrics to analyze
 * @returns {Promise<object>} Prediction result
 */
const sendLyrics = async (lyrics) => {
  try {
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lyrics: lyrics }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Prediction:", data);
    return data;
  } catch (error) {
    console.error("Error predicting mood:", error);
    throw error;
  }
};

export default sendLyrics;
