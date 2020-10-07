const axios = require('axios')
const cheerio = require('cheerio')

const url = 'http://datachart.500.com/ssq/history/history.shtml'

module.exports = async () => {
  const { data } = await axios(url)
  const $ = cheerio.load(data)

  const tds1 = $('#tdata tr:first-child .t_cfont2')
  const tds2 = $('#tdata tr:last-child .t_cfont2 + .t_cfont4')
  const openDay = $('#tdata tr:first-child td:last-child')

  return {
    expected: extractValues(tds1).concat(extractValues(tds2)),
    openDay: openDay.text(),
  }
}

function extractValues(tds) {
  return [].map.call(tds, node => +node.children[0].nodeValue)
}
