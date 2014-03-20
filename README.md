sessionbrowser
==============
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### OVERVIEW:

Independently manage a session object with browser cookies and timeouts. 'Useful when session or user objects are shared between server and client enviornments. To manage cookies alongside the session or expire the session in a browser, use this script in your browser environment and bind it to your session or user objects.

sessionbrowser uses [rocktimer][3] and [juicycookie][4] modules.

[0]: http://www.bumblehead.com                            "bumblehead"
[3]: https://npmjs.org/package/rocktimer                   "rocktimer"
[4]: https://npmjs.org/package/juicycookie               "juicycookie"


------------------------------------------------------------------------------
#### <a id="install"></a>INSTALL:

sessionbrowser may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install sessionbrowser
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/sessionbrowser.git
 $ cd sessionbrowser && npm install
 ```

------------------------------------------------------------------------------
#### <a id="usage"></a>USAGE:

sessionbrowser uses cookie values matching this scheme:
 
  `60000|3kj409234|1383553205422` (milliseconds|value|_bgndate_)
  
or this scheme:

  `60000|3kj409234` (milliseconds|value)
  
It operates under the assumption that the number of milliseconds is the time after which the session should expire. If _bgndate_ is not present, Date.now() is used. sessionbrowser timer ends at (bgndate + milliseconds). 

With serialised milliseconds, sessionbrowser resumes a prexisting session value on page load or begins a new session.

Assume there is a session object with named-property `token`. browsersession should expire alongside token. Token's value is stored as a browser cookie named `sesstoken`.

 * **create a sessionbrowser object**
 
 The connect method directs sessionbrowser to initialize itself with a value from cookie 'sesstoken'.

 ```javascript
 // create a session
 that.sessionbrowserObj = sessionbrowser(
     'sessiontoken' // name of cookie
 ).forEach({ ss : 1 }, function (ms) {
     // forEach, onStart and onStop are events
     // at which given callback functions are called
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
 
 // refresh the session on a token for 20 seconds
 sessionbrowserObj.refresh('20000|mytoken')
 ```


------------------------------------------------------------------------------
#### <a id="test"></a>TEST:

Tests are not automated but are performed by loading a document in the browser and using the browser console.

To build the test environment, use `npm test` from a shell.

```bash
$ npm test
```

Because cookies don't work with documents loaded through a file protocol (`file:///`), using the test document requires some additional setup.

I use lighttpd and /etc/hosts to make the document available through `sessionbrowser.com`.

 1. install lighttpd

 ```bash
 sudo apt-get install lighttpd
 ```

2. change lighttpd's configuration file

 */etc/lighttpd/lighttpd.conf*

 ```bash
 server.document-root        = "/path/to/sessionbrowser/test" 
 ```

3. restart lighttpd

 ```bash
 sudo /etc/init.d/lighttpd restart
 ```
   
4. edit /etc/hosts

 */etc/hosts*

 ```bash
 127.0.0.1       sessionbrowser.com
 ```

Then visit the sessionbrowser.com in your browser.


------------------------------------------------------------------------------
#### <a id="license">License:

 ![scrounge](http://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2012 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
