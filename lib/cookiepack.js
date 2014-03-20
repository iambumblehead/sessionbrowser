// Filename: cookiepack.js
// Timestamp: 2014.03.19-18:26:28 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: juicycookie.js


var cookiepack = ((typeof module === 'object') ? module : {}).exports = {

  isValidPackStr : function (packStr) {
    return typeof packStr === 'string' && packStr.match(/\d*|.*/);
  },

  getPackStrAsArr : function (str) {
    var match = str.match(/(\d*)\|([^|]*)\|?(\d{13})?/);

    if (match) {
      match[1] = +match[1];
      match[3] = +(match[3] || 0);

      return match.slice(1, 4);
    };
  },

  // construct session from packed string (usually from cookie)
  // unpack: '60000|3kj409234'
  // to this: '60000|3kj409234|1383535833423'
  getPackStrAsObj : function (cookiename, valStr) {
    var packArr = this.getPackStrAsArr(valStr);

    if (packArr) {
      return {
        name : cookiename,
        content : packArr[1],
        contentraw : valStr,
        contenttok : packArr[0] + '|' + packArr[1],
        timestartTS : packArr[2],
        timeremainingMS : packArr[0]
      };
    }
  },

  getObjAsPackStr : function (obj) {
    obj = obj || {};

    if (obj != null) {
      return ':t|:v|:d'
        .replace(/:t/, obj.timeremainingMS)
        .replace(/:v/, obj.content)
        .replace(/:d/, obj.timestartTS);
    }
  }
};

