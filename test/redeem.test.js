const REAL_DATE = Date

describe('action redeem', () => {
  let octokit

  beforeEach(() => {
    octokit = mockedOctokit()
    jest.doMock('@actions/github', () => ({
      getOctokit: () => octokit
    }))
  })
  afterEach(() => {
    jest.resetAllMocks()
    Date = REAL_DATE
  })

  it('should set correct labels', (done) => {
    mockRedeemDay(4) // double-color
    mockSingleIssue(octokit)
    mockExpected({
      expected: [1,2,0,0,0,0,1],
      openDay: '2020-01-02',
    }) // 5(2+1)

    runAction()

    setTimeout(() => {
      expect(getLastCallFirstParameter(octokit.issues.createComment).body).toMatch('Got 5(2+1)')
      expect(getLastCallFirstParameter(octokit.issues.update)).toMatchObject({
        labels: ['win', '5']
      })
      done()
    })
  })
})

function getLastCallFirstParameter(fn) {
  const calls = fn.mock.calls
  return calls[calls.length - 1][0]
}

function mockedOctokit() {
  return {
    search: {},
    issues: {
      createComment: jest.fn(),
      update: jest.fn(),
    },
  }
}
function mockRedeemDay(day) {
  Date = function() {
    return {
      getDay() {
        return day
      }
    }
  }
}
function mockSingleIssue(octokit) {
  octokit.search.issuesAndPullRequests = jest.fn(() => Promise.resolve({
    data: {
      items: [{
        number: 123,
        title: '[双色球] 1,2,3,4,5,6,1',
        create_at: '2020-01-01T00:19:54Z',
      }]
    }
  }))
}
function mockExpected(ret) {
  jest.doMock('../src/crawler/500com', () => {
    return () => ret
  })
}

function runAction() {
  require('../src/actions/redeem')
}
