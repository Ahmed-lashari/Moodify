/**
 * GET request to check backend status
 */

const API_BASE = process.env.REACT_APP_API_URL;

const getMessage = async () => {
  try {
    const res = await fetch(`${API_BASE}/message`);
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
