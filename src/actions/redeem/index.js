const core = require('@actions/core')
const github = require('@actions/github')
const lotteries = require('../../lotteries')
const crawler = require('../../crawler/500com')

try {
  const ghToken = core.getInput('ghToken')
  const octokit = github.getOctokit(ghToken)
  const today = (new Date()).getDay()

  lotteries.forEach(({ name, redeemDay, redeem }) => {
    if (today === redeemDay) {
      doRedeem({ octokit, name, redeem })
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

async function doRedeem({ octokit, name, redeem }) {
  const [expected, issues] = await Promise.all([
    crawler(),
    getOpenIssues(octokit, name)
  ])

  issues.forEach(issue => {
    const actual = extractActual(issue)
    const money = redeem(expected, actual)
    core.info(`Got ${money} in ${name}: expected=${expected} actual=${actual}`)

    // TODO: close with comment
  })
}

async function getOpenIssues(octokit, name) {
  const qualifiers = [
    name,
    'repo:chinesedfan/lottery-bot',
    'is:issue',
    'is:open',
  ]
  const { data: { items: issues } } = await octokit.search.issuesAndPullRequests({
    q: qualifiers.join('+')
  })
  return issues
}

function extractActual(issue) {
  return issue.title.split(']')[1]
    .split(',')
    .map(x => +x)
}
