const core = require('@actions/core')
const lotteries = require('../../lotteries')

try {
  const today = (new Date()).getDay()

  lotteries.forEach(({ name, redeemDay, buy }) => {
    if (today === redeemDay - 1) {
      const actual = buy()
      core.info(`Bought ${name}: ${actual}`)
    } else {
      core.info(`No ${name} toady`)
    }
  })  
} catch (error) {
  core.setFailed(error.message)
}
