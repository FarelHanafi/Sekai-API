const axios = require("axios"),
cheerio = require("cheerio"),
qs = require("qs"),
request = require("request"),
formData = require("form-data")

function soundcloud(url) {
	return new Promise((resolve, reject) => {
	  axios.get('https://soundcloudmp3.org/id').then((data) => {
		let a = cheerio.load(data.data)
		let token = a('form#conversionForm > input[type=hidden]').attr('value')
		const options = {
		  method: 'POST',
		  url: `https://soundcloudmp3.org/converter`,
		  headers: {
			"content-type": "application/x-www-form-urlencoded;",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
			"Cookie": data["headers"]["set-cookie"],
		  },
		  formData: {
			_token: token,
			url: url
		  }
		};
		request(options,
		  async function(error, response, body) {
			if (error) return reject()
			$get = cheerio.load(body)
			const result = {
			  title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:', ''),
			  duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g, ''),
			  quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:', ''),
			  thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
			  download: $get('#download-btn').attr('href')
			}
			resolve(result)
		  });
	  })
	})
  }


  
  module.exports = soundcloud
