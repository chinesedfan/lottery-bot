const core = require('@actions/core')
const github = require('@actions/github')
const lotteries = require('../../lotteries')

try {
  const ghToken = core.getInput('ghToken')
  const octokit = github.getOctokit(ghToken)
  const today = (new Date()).getDay()

  lotteries.forEach(({ name, redeemDays, buy }) => {
    if (1) {
      const actual = buy()
      saveLotteryResult(octokit, name, actual)
        .catch(error => {
          core.setFailed(error.message)
        })
    } else {
      core.info(`No ${name} toady`)
    }
  })
} catch (error) {
  core.setFailed(error.message)
}

async function saveLotteryResult(octokit, name, actual) {
  const newIssue = await octokit.issues.create({
    owner: 'chinesedfan',
    repo: 'lottery-bot',
    title: `[${name}] ${actual}`,
    labels: [] // TODO:
  })

  if (newIssue) {
    core.info(`Bought ${name}: ${actual}`)
  } else {
    core.info('Failed to save lottery result as issue')
  }
}
