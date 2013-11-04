// Filename: sessiontest.js
// Timestamp: 2013.11.03-16:53:36 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: sessionbrowser.js, sessionmodel.js


console.log('sesssionbrowsertest');

// a session usually consists of profile data, or a token.
// re-establish session.


var sessionbrowserObj;


sessionbrowserObj = sessionbrowser.getNew({
  cookieSpecArr : [{
    name : 'sessrefresh',
    expires : { mm : '4' },
    iscontrol : true
  }, {
    name : 'sesstoken', 
    expires : { mm : '2' }
  }, {
    name : 'sessprofile',
    expires : { mm : '2' }
  }]
});

sessionbrowserObj.connect();

// needs to reconnect a session...
// needs to fire event when session changes...

sessionmodel.onChangeHook.addFn(function (sessObj) {
  console.log('go');
});

sessionmodel.setData({ token : null });
sessionmodel.setData({ token : '3kj409234' });

sessionmodel.setData({ user : { isLoggedIn : false } });
sessionmodel.setData({ user : { isLoggedIn : true } });
