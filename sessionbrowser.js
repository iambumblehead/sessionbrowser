// Filename: sessionbrowser.js
// Timestamp: 2013.11.03-16:59:37 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: juicycookie.js, rocktimer.js

var juicycookie = require('juicycookie');
var rocktimer = require('rocktimer');

var sessionbrowser = ((typeof module === 'object') ? module : {}).exports = (function () {
    // bind to user model
    // on change user model set...

  var proto = {
    cookieSpecArr : [],

    // data or time may be given, else attempt is made to read from cookie..

    packControl : function () {

    },

    unpackControl : function () {

    },

    // connect on page load, re-establish session state
    connect : function () {
      var that = this, ctrl;
      that.cookieSpecArr.map(function (cookieSpec) {
        if (cookieSpec.isControl) {
          ctrl = juicycookie.getValue(cookieSpec.name);
          if (ctrl) {
            that.unpackControl(ctrl);
          }
        }

      });
    }
    
  };

//    return juicycookie.getValue('ganimastoken') ? true : false;
//  var info = juicycookie.getValue('ganimasprofile');

  return {
    proto : proto,
    getNew : function (spec) {
      var that = this;
      that.cookieSpecArr = spec.cookieSpecArr;
/*
    that.timer = rocktimer.get({
      mm : timeoutMinutes
    }).start(function (timeTtl) {
      that.clear();
      if (fn) fn(timeTtl);
    });
*/

      return that;
    }
  };

}());

/*
// usage
moldsession.onChangeHook.addFn(function (sess) {

});
*/

