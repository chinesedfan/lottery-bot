const { randomN } = require('../utils')

module.exports = {
  name: '双色球',
  redeemDay: 4, // Mon-Sun, 1-7
  buy() {
    const result = Array(7).fill(0)
    result.forEach((x, i) => {
      result[i] = randomN(i < 6 ? 33 : 16)
    })
    return result
  },
  redeem(expected, actual) {
    const hit = expected.slice(6).reduce((o, x) => {
      o[x] = 1
      return o
    }, {})
    const redCount = actual.filter(x => hit[x]).length
    const blueCount = actual.indexOf(expected[6]) < 0 ? 0 : 1

    const sheet = [
      [6, 1, '<1000w'],
      [6, 0, '>3000'],
      [5, 1, 3000],
      [5, 0, 200],
      [4, 1, 200],
      [4, 0, 10],
      [3, 1, 10],
      [2, 1, 5],
      [1, 1, 5],
      [0, 1, 5],
    ]

    let result
    sheet.some(([r, b, money]) => {
      if (r === redCount && b === blueCount) {
        result = money
        return true
      }
    })
    return result
  },
}
