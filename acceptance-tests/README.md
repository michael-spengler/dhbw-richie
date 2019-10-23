# Acceptance Tests

## Leveraging Codecept with Puppeteer

For Details you might check: https://codecept.io/quickstart

## Executing the Acceptance Tests

You can execute the Acceptance Tests by writing:  
`npx codeceptjs run --steps`  
... while being in the acceptance-tests folder

For specific tests - e.g.:
`npx codeceptjs run --steps --grep "Get Helpful Answers"`

## Motivation

- Automated Tests can be regarded as executable specifications
- Automated Tests can additionally be leveraged as executable documentation / system demos etc.
- Automated Tests can be regarded as a safety net encouraging you to bravely improve your code
- You can find an example test here: https://github.com/michael-spengler/dhbw-richie/blob/master/acceptance-tests/user-story-1-landingpage_test.js#L4
