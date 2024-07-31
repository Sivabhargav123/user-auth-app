import axios from 'axios';

const API_BASE_URL = 'https://syoft.dev/Api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user_registeration/api/user_registeration`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/userlogin/api/userlogin`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
