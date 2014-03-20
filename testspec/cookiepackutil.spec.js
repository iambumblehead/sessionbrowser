var cookiepack = require('../lib/cookiepack');

describe("cookiepackutil.getPackStrAsArr", function () {
  
  it("should return [30000, 'token', 1234567891234] from '30000|token|1234567891234'", function () {

    var packArr = cookiepack.getPackStrAsArr('30000|token|1234567891234');

    expect(
      packArr[0] === 30000 &&
      packArr[1] === 'token' &&
      packArr[2] === 1234567891234
    ).toBe(true);
  });

});
