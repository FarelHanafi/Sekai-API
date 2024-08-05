/*
Tools All In One Video Downloader
*/

const axios = require("axios"),
cheerio = require("cheerio"),
qs = require("qs"),
request = require("request"),
formData = require("form-data")

async function aio(url) {
  try {
    const response = await axios.post("https://aiovd.com/wp-json/aio-dl/video-data",
      {
        url: url
      },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

    const res = response.data;
    const result = {
      data: res.medias
    };

    return result;
  } catch (e) {
    throw e
  }
}
module.exports = aio
