// Filename: sessiontest.js
// Timestamp: 2014.03.19-18:33:19 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: sessionbrowser.js, sessionmodel.js, juicycookie.js


// a session usually consists of profile data, or a token.
// re-establish session.

var sessionbrowserObj;
var sessionbrowser = require('sessionbrowser');
var sessionmodel = require('./testSrc/sessionmodel');
var juicycookie = require('./juicy-cookie');

var session = {
  model : null,
  sessionbrowserObj : null,

  getObjAsHTMLStr : function ghtml (obj) {
    var htmlStr = '';

    function getAsStr(o) {
      if (typeof o === 'object' && o) {
        return ghtml(o);
      }
      return o;
    }

    for (var o in obj) {
      if (obj.hasOwnProperty(o)) {
        htmlStr += '<li><b>:o</b> : :objo</li>'
          .replace(/:o/, o).replace(/:objo/, getAsStr(obj[o]));
        
      }
    }
    if (htmlStr) {
      htmlStr = '<ul>' + htmlStr + '</ul>';
    }

    return htmlStr;
  },


  updateMMLabel : function (str) {
    var labelElem = document.getElementById('DisplayMM');
    if (labelElem) {
      labelElem.innerHTML = str;
    }
  },
  updateSSLabel : function (str) {
    var labelElem = document.getElementById('DisplaySS');
    if (labelElem) {
      labelElem.innerHTML = str;
    }
  },
  updateMSLabel : function (str) {
    var labelElem = document.getElementById('DisplayMS');
    if (labelElem) {
      labelElem.innerHTML = str;
    }
  },


  showSession : function (obj) {
    var labelElem = document.getElementById('SessionStatus'),
        htmlStr = '';

    if (labelElem) {
      labelElem.innerHTML = this.getObjAsHTMLStr(obj);
    }
  },

  showModel : function (obj) {
    var labelElem = document.getElementById('ModelStatus'),
        htmlStr = '';

    if (labelElem) {
      labelElem.innerHTML = this.getObjAsHTMLStr(obj);
    }
  },

  setModel : function () {
    var that = this;
  
    if (!juicycookie.getValue('sesstoken')) {
      // set on the model to trigger session observer
      console.log('setData',{ token : '20000|3kj409234' });
      that.model.set({ token : '20000|3kj409234' });
    }
  },

  rmModel : function () {
    var that = this;
  
    that.model.set({ token : '' });
  },

  mount : function () {
    var that = this;

    that.sessionbrowserObj = sessionbrowser(
      'sessiontoken'
    ).forEach({ ss : 1 }, function (ms) {
      that.updateSSLabel(ms.remaining.asss());
    }).forEach({ ms : 100 }, function (ms) {
      that.updateMSLabel(ms.remaining.asms());
    }).onStart(function (ms) {
      that.updateSSLabel(ms.remaining.asss());
      that.updateMSLabel(ms.remaining.asms());
    }).onStop(function (ms) {
      that.updateSSLabel(ms.remaining.asss());
      that.updateMSLabel(ms.remaining.asms());
      that.model.set({ token : '' });
    }).connect();

    that.model = sessionmodel();

    // when model changes, refresh session
    that.model.onChange(function (sessObj) {
      if (sessObj.token) {
        that.sessionbrowserObj.refresh(sessObj.token);
      } else {
        that.sessionbrowserObj.end();
      }
      that.showModel(that.model);
      that.showSession(that.sessionbrowserObj);
    });

    if (that.sessionbrowserObj.contenttok) {
      that.model.set({ token : that.sessionbrowserObj.contentraw });      
    }

    window.sessionbrowserObj = sessionbrowserObj;
  },

  init : function () {
    var that = this,
        StartLink = document.getElementById('StartLink'),
        KillLink = document.getElementById('KillLink'),
        SetModelLink = document.getElementById('SetModelLink'),
        RmModelLink = document.getElementById('RmModelLink');

    that.mount();

    StartLink.onclick = function (e) {
      //that.start();
      e.preventDefault();
    };

    KillLink.onclick = function (e) {
      that.sessionbrowserObj.end();
      e.preventDefault();
    };

    SetModelLink.onclick = function (e) {
      that.setModel();
      e.preventDefault();
    };

    RmModelLink.onclick = function (e) {
      that.rmModel();
      e.preventDefault();
    };
  }
};


