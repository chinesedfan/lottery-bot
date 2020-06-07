const core = require('@actions/core')
const lotteries = require('./lotteries')

try {
  lotteries.forEach()  
} catch (error) {
  core.setFailed(error.message)
}
