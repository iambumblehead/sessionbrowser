var scroungejs = require('scroungejs'),
    startUtils = require('./testbuildutil');

startUtils.createFileIfNotExist({
  pathSrc : "./test/indexSrc.html",
  pathFin : "./test/index.html"
}, function (err, res) {
  if (err) return console.log('[!!!] errror: ', err);  
  scroungejs.build({
    isLines : true,
    isRecursive : true,
    isRemoveRequires : true,
    isRemoveConsole : false,
    isCompressed : false,
    isConcatenated : false,
    isSourcePathUnique : true,
    trees : [
      "sessiontest.js"
    ],
    publicPath : "./testFin",
    basepage : "./test/index.html",
    inputPath : [
      "./test/testSrc/",
      "./node_modules",
      "./lib",
      "./sessionbrowser.js"
    ],
    outputPath : "./test/testFin/"
  }, function (err, res) {
    if (err) return console.log('[!!!] error:', err);
    console.log('[...] finished. browser test at ./test/test.html');
  });

});
