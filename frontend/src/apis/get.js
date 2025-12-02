/**
 * GET request to check backend status
 */
const getMessage = async () => {
  try {
    const res = await fetch("http://localhost:8000/message");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Backend says:", data);
    return data;
  } catch (error) {
    console.error("Error fetching message:", error);
    throw error;
  }
};

export default getMessage;
