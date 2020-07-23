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
