const axios = require('axios')

async function ffstalk(gameId) {
    try {
      const response = await axios.post('https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store', {
        productId: 3,
        itemId: 353,
        product_ref: "REG",
        product_ref_denom: "REG",
        catalogId: 376,
        paymentId: 1252,
        gameId: gameId
      }, {
        headers: {
          'Accept-Language': 'id',
          'x-device': '27004487-d5fb-4206-8c50-cdeac00ef6ed',
          'Ciam-Type': 'FR',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
  
      return response.data.data.gameDetail.userName;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  module.exports = ffstalk