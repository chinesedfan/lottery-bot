describe('7-le redeem', () => {
  const { redeem } = require('../src/lotteries/7-le')
  const tests = [
    [[1, 2, 3, 4, 5, 6, 7, 8], [0, 0, 0, 4, 3, 2, 1, 8], '10(4+1)'],
    [[1, 2, 3, 4, 5, 6, 7, 0], [1, 2, 3, 4, 0, 0, 0, 8], '5(4+0)'],
  ]

  tests.forEach(([expected, actual, result]) => {
    it(result, () => {
      expect(redeem(expected, actual)).toBe(result)
    })
  })
})
describe('7-star redeem', () => {
  const { redeem } = require('../src/lotteries/7-star')
  const tests = [
    [[1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 0, 0], '300(4x)'],
    [[1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 3, 4, 0, 0], '5(2x)'],
  ]

  tests.forEach(([expected, actual, result]) => {
    it(result, () => {
      expect(redeem(expected, actual)).toBe(result)
    })
  })
})
describe('double-color redeem', () => {
  const { redeem } = require('../src/lotteries/double-color')
  const tests = [
    [[1, 2, 3, 4, 5, 6, 7], [0, 0, 4, 3, 2, 1, 7], '200(4+1)'],
    [[1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 7], '5(0+1)'],
  ]

  tests.forEach(([expected, actual, result]) => {
    it(result, () => {
      expect(redeem(expected, actual)).toBe(result)
    })
  })
})

