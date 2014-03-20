// Filename: sessionmodel.js
// Timestamp: 2014.03.09-19:00:25 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: eventhook.js

var sessionmodel = (function (p) {
 var proto = {
  data : {
    token : '',
    user : {
      name : ''
    }
  },

  onChangeHook : eventhook.getNew(),

  onChange : function (fn) {
    this.onChangeHook.addFn(fn);
    return this;
  },

  set : function (spec) {
    var that = this;
    
    if (spec) {
      if (typeof spec.token === 'string') {
        that.token = spec.token;
      }
      if (spec.user) that.user = spec.user;
    }

    that.onChangeHook.fire(that);
  }
 };

 p = function (opts) {
   var that = Object.create(proto);
   
   that.token = (opts && opts.token) || '';
   that.user = (opts && opts.user) || {
     name : ''
   };

   return that;
 };

 return p;

}());
