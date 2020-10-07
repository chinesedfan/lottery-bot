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

  it('should set correct labels', () => {
    mockRedeemDay(4) // double-color
    mockSingleIssue(octokit)
    mockExpected([1,2,0,0,0,0,1]) // 5(2+1)

    runAction()

    setTimeout(() => {
      expect(octokit.issues.createComment).toHaveBeenLastCalledWith({
        body: 'Got 5(3+0)'
      })
      expect(octokit.issues.update).toHaveBeenLastCalledWith({
        labels: ['win', '5']
      })
    })
  })
})

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
      }]
    }
  }))
}
function mockExpected(expected) {
  jest.doMock('../src/crawler/500com', () => {
    return () => expected
  })
}

function runAction() {
  require('../src/actions/redeem')
}
