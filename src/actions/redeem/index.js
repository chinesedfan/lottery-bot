const core = require('@actions/core')
const lotteries = require('../../lotteries')

try {
  const today = (new Date()).getDay()

  lotteries.forEach(({ name, redeemDay, redeem }) => {
    if (today === redeemDay) {
      const expected = [1, 2, 3, 4, 5, 6, 7] // TOOD:
      const actual = [1, 2, 3, 4, 5, 8, 7] // TOOD:
      const money = redeem(expected, actual)
      core.info(`Got ${money} in ${name}: expected=${expected} actual=${actual}`)
    } else {
      core.info(`No ${name} toady`)
    }
  })  
} catch (error) {
  core.setFailed(error.message)
}
