const axios = require('axios');

async function degreeGuru(message) {
  try {
    const response = await axios.post('https://degreeguru.vercel.app/api/guru', {
      messages: [{ role: 'user', content: message }]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = degreeGuru;