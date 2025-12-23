export const sendLyrics = async (lyrics) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log("Sending request to:", backendUrl);

  try {
    const res = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lyrics }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error response:", text);
      throw new Error("Backend returned an error");
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    throw err;
  }
};
