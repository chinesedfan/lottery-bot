const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async id => {
  switch (id) {
    case 'qlc':
      return qlc()
    case 'qxc':
      return qxc()
    case 'ssq':
      return ssq()
    default:
      throw new Error(`unknown id: ${id}`)
  }
}

async function qlc() {
  const url = 'http://datachart.500.com/qlc/history/history.shtml'
  const { data } = await axios(url)
  const $ = cheerio.load(data)

  const tds = $('#tablelist .t_tr1:nth-child(2) .cfont2')
  const openDay = $('#tablelist .t_tr1:nth-child(2) .t_tr1:last-child')

  return {
    expected: extractTexts(tds)[0].split(' ').map(x => +x),
    openDay: openDay.text(),
  }
}

async function qxc() {
  const url = 'http://datachart.500.com/qxc/history/inc/history.php'
  const { data } = await axios(url)
  const $ = cheerio.load(data)

  const tds = $('#tablelist .t_tr1:nth-child(2) .cfont2')
  const openDay = $('#tablelist .t_tr1:nth-child(2) .t_tr1:last-child')

  return {
    expected: extractTexts(tds)[0].split(' ').map(x => +x),
    openDay: openDay.text(),
  }
}

async function ssq() {
  const url = 'http://datachart.500.com/ssq/history/history.shtml'
  const { data } = await axios(url)
  const $ = cheerio.load(data)

  const tds1 = $('#tdata tr:first-child .t_cfont2')
  const tds2 = $('#tdata tr:last-child .t_cfont2 + .t_cfont4')
  const openDay = $('#tdata tr:first-child td:last-child')

  return {
    expected: extractNums(tds1).concat(extractNums(tds2)),
    openDay: openDay.text()
  }
}

function extractNums(tds) {
  return [].map.call(tds, node => +node.children[0].nodeValue)
}
function extractTexts(tds) {
  return [].map.call(tds, node => node.children[0].nodeValue)
}
