import axios from "axios";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export const placeOrder = async (order) => {
  try {
    const result = await axios.post(`${API_URL}/order/`, order);
    return result.data;
  } catch (err) {
    if (err.response) console.log(err.response.data.message);
    else console.log(err.message);
  }
};

export const getOrder = async (id) => {
  try {
    const result = await axios.get(`${API_URL}/order/${id}`);
    if (result && result.data) return result.data;
  } catch (err) {
    if (err.response) console.log(err.response.data.message);
    else console.log(err.message);
  }
};

export const makePriority = async (id) => {
  try {
    await axios.patch(`${API_URL}/order/${id}`, {
      priority: true,
    });
  } catch (err) {
    if (err.response) console.log(err.response.data.message);
    else console.log(err.message);
  }
};
