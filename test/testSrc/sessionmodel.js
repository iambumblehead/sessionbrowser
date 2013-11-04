// Filename: sessionmodel.js
// Timestamp: 2013.11.03-16:24:36 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: eventhook.js

var sessionmodel = {
  data : {
    token : '',
    user : {
      username : '',
      isLoggedIn : false
    }
  },

  onChangeHook : eventhook.getNew(),

  setData : function (spec) {
    var that = this;
    
    if (spec) {
      if (spec.token) that.token = spec.token;
      if (spec.user) that.user = spec.user;
    }

    that.onChangeHook.fire(that);
  }
};
