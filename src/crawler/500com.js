const axios = require('axios')
const cheerio = require('cheerio')

const url = 'http://datachart.500.com/ssq/'

module.exports = async () => {
  const { data } = await axios(url)
  const $ = cheerio.load(data)

  const tds1 = $('#tdata tr:last-child td.chartBall01')
  const tds2 = $('#tdata tr:last-child td.chartBall02')
  return extractValues(tds1).concat(extractValues(tds2))
}

function extractValues(tds) {
  return [].map.call(tds, node => +node.children[0].nodeValue)
}
