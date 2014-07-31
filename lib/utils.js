/**
 * @jsx React.DOM
 */
"use strict";
var utils = {};

utils.mergeInto = function mergeInto(dst, src) {
  if (src != null) {
    for (var k in src) {
      if (!src.hasOwnProperty(k)) {
        continue;
      }
      dst[k] = src[k];
    }
  }
};

utils.merge = function merge(a, b) {
  var result = {};
  utils.mergeInto(result, a);
  utils.mergeInto(result, b);
  return result;
};

utils.shallowEqual = function shallowEqual(a, b) {
  if (a === b) {
    return true;
  }

  var k;

  for (k in a) {
    if (a.hasOwnProperty(k) &&
        (!b.hasOwnProperty(k) || a[k] !== b[k])) {
      return false;
    }
  }

  for (k in b) {
    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
      return false;
    }
  }

  return true;
};

utils.emptyFunction = function emptyFunction() {

};

utils.invariant = function invariant(condition, message) {
  if (!condition) {
    throw new Error(message || 'invariant violation');
  }
};

utils.shallowCloneObject = function shallowCloneObject(obj) {
  var result = {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      result[k] = obj[k];
    }
  }
  return result;
};

utils.wrap = function(obj, methodName, pre, post) {
  var orig = obj[methodName]; //keep a ref
  obj[methodName] = (function() {
    if(typeof(pre) === 'function') { pre.apply(this, arguments); }
    orig.apply(this, arguments);
    if(typeof(post) === 'function') { post.apply(this, arguments); }
  }).bind(obj);
};

module.exports = utils;
