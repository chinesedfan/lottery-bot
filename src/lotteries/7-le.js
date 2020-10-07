const { randomN } = require('../utils')

module.exports = {
  name: '七乐彩',
  redeemDays: [1, 3, 5], // Sun-Sat, 0-6
  buy() {
    const balls = Array(30).fill(0).map((x, i) => i + 1)

    const result = Array(7).fill(0)
    result.forEach((x, i) => {
      const pick = randomN(balls.length) - 1
      result[i] = balls.splice(pick, 1)[0]
    })
    result.sort((a, b) => a - b)
    result.push(balls[randomN(balls.length) - 1])
    return result
  },
  redeem(expected, actual) {
    const hit = expected.slice(0, 7).reduce((o, x) => {
      o[x] = 1
      return o
    }, {})
    const redCount = actual.slice(0, 7).filter(x => hit[x]).length
    const blueCount = actual[7] === expected[7] ? 1 : 0

    const sheet = [
      [7, 1, '<=500w'],
      [7, 0, '<=500w'],
      [6, 1, '>800'],
      [6, 0, '>400'],
      [5, 1, 200],
      [5, 0, 50],
      [4, 1, 10],
      [4, 0, 5],
    ]

    let result = `nothing(${redCount}+${blueCount})`
    sheet.some(([r, b, money]) => {
      if (r === redCount && b === blueCount) {
        result = `${money}(${redCount}+${blueCount})`
        return true
      }
    })
    return result
  },
}
