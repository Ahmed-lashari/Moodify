export const sendLyrics = async (lyrics) => {
  const res = await fetch(`${process.env.BACKEND_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lyrics }),
  });
  return await res.json();
};
