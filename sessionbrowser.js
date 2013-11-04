// Filename: sessionbrowser.js
// Timestamp: 2013.11.04-00:17:52 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: juicycookie.js, rocktimer.js, eventhook.js

var juicycookie = require('juicycookie');
var rocktimer = require('rocktimer');
var eventhook = require('eventhook');

var sessionbrowser = ((typeof module === 'object') ? module : {}).exports = (function () {
    // bind to user model
    // on change user model set...

  var cookiepack = (function () {
    var proto = {
      startval : '',
      bgndate : 0,
      val : '',
      time : 0,
      timer : null,
      name : '', // cookiename

      getmsRemaining : function () {
        return this.getendDate() - Date.now();
      },

      getendDate : function () {
        return this.bgndate + this.time;        
      },

      // unpack: '60000|3kj409234'
      // to this: '60000|3kj409234|1383535833423'
      unpack : function () {
        var that = this,
            val = this.startval,
            valRe = /\d*|.*/,
            packArr, packval;

        if (typeof val === 'string' && val.match(valRe)) { 
          packArr = val.split('|');
          if (packArr[0] && !isNaN(+packArr[0])) {
            that.time = +packArr[0];
          }
          if (packArr[1]) {
            that.val = packArr[1];
          }
          if (packArr[2] && !isNaN(+packArr[2])) {
            that.bgndate = +packArr[2];
          } else {
            that.bgndate = Date.now();
          }
        }

        return that;
      },

      // pack: '60000|3kj409234'
      // to this: '60000|3kj409234|1383535833423'
      pack : function () {
        var packed = '',
            packedObj = this,
            packedval = ':time|:val|:bgndate';

        if (packedval) {
          packed = packedval
            .replace(/:time/, packedObj.time)
            .replace(/:val/, packedObj.val)
            .replace(/:bgndate/, packedObj.bgndate);
        }

        return packed;
      },

      activate : function (fn) {
        var that = this;

        juicycookie.persist(that.name, that.pack(), {
          expires : { ms : that.getmsRemaining() }
        });

        that.timer = rocktimer.getNew({
          ms : that.getmsRemaining()
        }).start(function (timeTtl) {
          fn(that);
        });
      }
    };
    
    return { 
      getNew : function (name, val) {
        var that = Object.create(proto);
        that.startval = val;
        that.name = name;
        that.time = 0;
        that.timer = null;
        that.unpack();
        return that;
      }
    };
  }());

  var proto = {
    onChangeHook : function () {},
    pack : null,
    cookie : null,

    // '3kj409234|60000'
    set : function (valStr) {
      var that = this,
          pack,
          cookie = that.cookie;

      if (cookie) {
        pack = that.pack = cookiepack.getNew(that.name, valStr);
        pack.activate(function (packer) {
          that.onChangeHook.fire(packer);
        });
      }
    },

    // sessionbrowserObj.pack.timer.getremainingms()
    // connect on page load, re-establish session state
    connect : function () {
      var that = this, 
          pack,
          cookie = that.cookie,
          cookieval = juicycookie.getValue(that.name);

      if (cookieval) {
        pack = that.pack = cookiepack.getNew(that.name, cookieval);
        if (pack.getmsRemaining() > 0) {
          pack.activate(function (packer) {
            that.onChangeHook.fire(packer);
          });
        }
      }
      return that;
    }
  };

  return {
    proto : proto,
    getNew : function (spec) {
      var that = Object.create(this.proto);
      that.cookie = spec.cookie;
      // consider bgn and end hook?
      that.onChangeHook = eventhook.getNew();
      that.name = spec.cookie.name;
      that.timer = null;

      return that;
    }
  };

}());
