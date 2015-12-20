// Filename: sessionbrowser.js
// Timestamp: 2015.12.20-00:45:30 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)

var cookiepack = require('./lib/cookiepack'),
    juicycookie = require('juicycookie'),
    rocktimer = require('rocktimer'),
    eventhook = require('eventhook');

var sessionbrowser = module.exports = (function (p) {

  var proto = {
    timer : null,

    name : '',
    content : '',
    contentraw : '',
    contenttok : '',
    timestartTS : undefined,
    timeremainingMS : 0,

    onChangeHook : null,

    getendDate : function () {
      return this.timestartTS + this.timeremainingMS;        
    },    

    getmsRemaining : function () {
      return this.getendDate() - Date.now();
    },

    getWithOpts : function (that, opts) {
      opts = (typeof opts === 'object' && opts) || {};

      that.name = opts.name;
      that.content = opts.content || '';
      that.contentraw = opts.contentraw;
      that.contenttok = opts.contenttok;
      that.timeremainingMS = opts.timeremainingMS || 0;
      that.timestartTS = opts.timestartTS || undefined;

      return that;
    },

    // persist session data to cookie
    persist : function () {
      var that = this;

      if (!that.timestartTS) {
        that.timestartTS = Date.now();
      }

      juicycookie.persist(that.cookiename, cookiepack.getObjAsPackStr(that), {
        expires : { 
          ms : that.getmsRemaining() 
        }
      });      
      
      return that;
    },    

    getNewFromCookieNamed : function (that, cookiename) {
      var cookieval = juicycookie.getValue(cookiename),
          opts;

      if (cookieval) {
        opts = cookiepack.getPackStrAsObj(cookiename, cookieval);
        that = this.getWithOpts(that, opts);
      }

      return that;
    },

    onChange : function (fn) {
      this.onChangeHook.addFn(fn);
      return this;
    },

    doChange : function (opts) {
      this.onChangeHook.fire(opts);    
    },

    end : function () {
      var that = this,
          timer = that.timer;

      juicycookie.rm(that.cookiename);
      that = that.getWithOpts(that);

      if (timer.st === 1) {
        timer.ms = 0;
        timer.reset();
        timer.callStop();
      }

      return that;
    },

    start : function (ms) {
      var that = this,
          timer = that.timer;

      if (ms > 0 && timer.st !== 1) {
        timer.ms = ms;
        timer.reset();
        timer.start();
      }

      return that;
    },

    setSeed : function (valStr) {
      var that = this,
          opts;

      that = that.getNewFromCookieNamed(that, that.cookiename);
      opts = cookiepack.getPackStrAsObj(that.cookiename, valStr);
      that = that.getWithOpts(that, opts);

      return that.persist();
    },

    // valStr ex, '3kj409234|60000'
    refresh : function (valStr) {
      var that = this;

      that = that.setSeed(valStr);
      that.start(that.getmsRemaining());
      return that;
    },

    connect : function () {
      var that = this;

      if (that.getmsRemaining() > 0) {
        that.start(that.getmsRemaining());
      }

      return that;
    },

    forEach : function (timeObj, fn) {
      this.timer.forEach(timeObj, fn);
      return this;
    },

    onStop : function (fn) {
      this.timer.onStop(fn);
      return this;
    },

    onStart : function (fn) {
      this.timer.onStart(fn);
      return this;
    }
  };

  p = function (name) {
    var that_proto = Object.create(proto),
        that;

    that_proto.timer = rocktimer();
    that_proto.cookiename = name || null;
    that_proto.onChangeHook = eventhook.getNew();

    // cookie properties at top level
    that = Object.create(that_proto);
    that = that.getNewFromCookieNamed(that, that.cookiename);

    return that;
  };

  p.proto = proto;

  return p;

}());
