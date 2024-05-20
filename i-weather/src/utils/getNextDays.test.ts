import { getNextDays } from './getNextDays'

// uses the group when there are more conditions that need to be tested
// opitional, but stays organized
describe('Util: getNextDays', () => {
  // create descriptive name
  // use test() or it()
  it('should be return the next five days', () => {
    // run the test
    const days = getNextDays()

    expect(days.length).toBe(5)
  })
})
