import axios from 'axios'
import { envApiBase } from '../config/environment';

const api = {
  getSsh: async function (token) {
    const response = await axios.get(`${envApiBase}/ssh`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  },
  newSsh: async function (token, data) {
    const response = await axios.post(`${envApiBase}/ssh`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  },
  deleteSsh: async function (token, id) {
    const response = await axios.delete(`${envApiBase}/ssh/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  },
}

export default api
