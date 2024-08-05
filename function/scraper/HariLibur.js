
const FormData = require("form-data")
const axios = require("axios")
const cheerio = require("cheerio")

async function HariLibur() {
    const {
      data
    } = await axios.get("https://www.liburnasional.com/")
    let libnas_content = []
    let $ = cheerio.load(data)
    let result = {
      nextLibur:
      "Hari libur" +
      $("div.row.row-alert > div").text().split("Hari libur")[1].trim(),
      libnas_content,
    }
    $("tbody > tr > td > span > div").each(function (a, b) {
      summary = $(b).find("span > strong > a").text()
      days = $(b).find("div.libnas-calendar-holiday-weekday").text()
      dateMonth = $(b).find("time.libnas-calendar-holiday-datemonth").text()
      libnas_content.push({
        summary, days, dateMonth
      })
    })
    return result
  }
  module.exports = HariLibur
