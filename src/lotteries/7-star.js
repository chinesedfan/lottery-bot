const { randomN } = require('../utils')

module.exports = {
  id: 'qxc',
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
    let max = 1
    actual.forEach((a, i) => {
      expected.forEach((b, j) => {
        if (a === b) {
          let c = 0
          while (i < 7 && j < 7 && actual[i++] === expected[j++]) {
            c++
          }
          max = Math.max(max, c)
        }
      })
    })

    const sheet = [0, 0, 5, 20, 300, 1800, '>3600', '<=500w']
    return max >= 2 ? `${sheet[max]}(${max}x)` : 'nothing'
  },
}
