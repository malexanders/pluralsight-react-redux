/* _Tip: */
/* Mocha doesn't come with an assertion library */
/* so we are going to use the expect library from npm */

import expect from 'expect';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});


