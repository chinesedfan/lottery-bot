const axios = require('axios')
const cheerio = require('cheerio')

const url = 'http://datachart.500.com/ssq/'

module.exports = async () => {
  const { data } = await axios(url)
  const $ = cheerio.load(data)

  const tds = $('#tdata tr:last-child td.chartBall01')
  return [].map.call(tds, node => node.children[0].nodeValue)
}
