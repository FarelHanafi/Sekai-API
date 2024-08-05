const FormData = require("form-data")
const axios = require("axios")
const cheerio = require("cheerio")


async function igstory(url) {
    try {
      const response = await axios.get(`https://storiesig.info/api/ig/story?url=${encodeURIComponent(url)}`)
      const results = response.data
      let danzy = results.result.map(v => v.image_versions2.candidates.map(candidate => candidate.url))
      let danz = {}
      let count = 1
      for (let i = 0; i < danzy.length; i++) {
        for (let j = 0; j < danzy[i].length; j++) {
          danz[count] = danzy[i][j]
          count++
        }
      }
      return danz
    } catch (error) {
      console.error(error)
    }
  }

module.exports = igstory