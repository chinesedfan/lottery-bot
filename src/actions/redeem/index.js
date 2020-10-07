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
  const [{expected, openDay}, issues] = await Promise.all([
    crawler(),
    getOpenIssues(octokit, name)
  ])

  issues.forEach(async issue => {
    if (openDay < issue.create_at) {
      core.info(`skip issue ${issue.number}`)
      return
    }

    const actual = extractActual(issue)
    const money = redeem(expected, actual)
    const body = `Got ${money} in ${name}: expected=${expected} actual=${actual}`
    core.info(body)

    await closeIssue(octokit, issue.number, body, calLabels(money))
  })
}

function calLabels(money) {
  const win = !/nothing/.test(money)
  if (win) {
    return ['win', money.split('(')[0]]
  } else {
    return []
  }
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

async function closeIssue(octokit, issue_number, body, labels) {
  await octokit.issues.createComment({
    owner: 'chinesedfan',
    repo: 'lottery-bot',
    issue_number,
    body
  });
  await octokit.issues.update({
    owner: 'chinesedfan',
    repo: 'lottery-bot',
    issue_number,
    labels,
    state: 'closed'
  })
}
