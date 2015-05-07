'use strict'

var dasherize = require('underscore.string/dasherize');

module.exports = function(obj, nest) {
  if (typeof obj !== 'object') { throw new Error('Input must be an object.'); }
  // slice to remove last empty line
  return transpile(obj, nest).slice(0, -1);
};

function transpile(obj, nest) {
  return Object.keys(obj).reduce(function(result, key) {
    let val = obj[key];
    if (typeof val === 'object') {
      let declarations = getDeclarations(val) || '\n';
      var selector = makeSelector(nest, key);
      result+= selector+' {'+declarations+'\n}\n\n';
      result+= transpile(val, selector);
    }
    return result;
  }, '');
}

function getDeclarations(obj) {
  return Object.keys(obj).reduce(function(result, key, idx, arr) {
    var val = obj[key];
    if (typeof val !== 'object') {
      key = dasherize(key);
      var decl = `${key}: ${val};`;
      result+= '\n  '+decl;
    }
    return result;
  }, '');
}

function makeSelector(nest, key) {
  var selector;
  if (key.indexOf('&') === 0) {
    selector = key.replace(/^&/, nest);
  } else {
    nest = typeof nest === 'undefined' ? '' : nest+' ';
    selector = nest+key;
  }
  return selector;
}
