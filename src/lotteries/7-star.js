const { randomN } = require('../utils')

module.exports = {
  name: '七星彩',
  redeemDays: [0, 2, 5], // Sun-Sat, 0-6
  buy() {
    const result = Array(7).fill(0)
    result.forEach((x, i) => {
      result[i] = randomN(9)
    })
    return result
  },
  redeem(expected, actual) {
    const hits = actual.map(x => expected.indexOf(x) >= 0)

    let max = 1
    let c = 0
    hits.forEach((x, i) => {
      if (hits[i]) {
        c++
        max = Math.max(max, c)
      } else {
        c = 0
      }
    })

    const sheet = [0, 0, 5, 20, 300, 1800, '>3600', '<=500w']
    return max >= 2 ? `${sheet[max]}(${max}x)` : 'nothing'
  },
}
