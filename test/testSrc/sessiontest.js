// Filename: sessiontest.js
// Timestamp: 2013.11.04-00:26:05 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: sessionbrowser.js, sessionmodel.js, juicycookie.js


console.log('sesssionbrowsertest');

// a session usually consists of profile data, or a token.
// re-establish session.

var sessionbrowserObj;
var sessionbrowser = require('sessionbrowser');
var sessionmodel = require('./testSrc/sessionmodel');
var juicycookie = require('./juicy-cookie');


sessionbrowserObj = sessionbrowser.getNew({
  cookie : {
    name : 'sesstoken' // 60000 1 minutes
  }
}).connect();


// needs to reconnect a session...
// needs to fire event when session changes...
sessionmodel.onChangeHook.addFn(function (sessObj) {
  if (sessObj.token) {
    sessionbrowserObj.set(sessObj.token);
  }
});

if (!juicycookie.getValue('sesstoken')) {
  console.log('setData',{ token : '60000|3kj409234' });
  sessionmodel.set({ token : '60000|3kj409234' });
}

sessionbrowserObj.onChangeHook.addFn(function (sess) {
  var sessStatusElem = document.getElementById('SessionStatus');
  sessStatusElem.innerHTML = JSON.stringify(sess);
});
