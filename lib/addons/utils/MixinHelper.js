var _ = require('underscore');

"use strict";


/**
 * Mix properties and methods from one object to another, without mutating either.
 * Allows specified methods to be merged, by calling one first then then other
 *
 * @param {object|function} one Object to be copied from.
 * @param {object} another object to be copied from
 * @param {?array} optional list of methods to be extended
 * @return {object|function} The extended object.
 */

var MixinHelper = {
  mix : function(one, two, methodsToMerge){
    var result = {};
    var nonMergeableMethods = [_.omit(one, methodsToMerge), _.omit(two, methodsToMerge)];

    //copy all nonMergeable methods to result object
    Object.assign(result, nonMergeableMethods[0]);
    Object.assign(result, nonMergeableMethods[1]);

    for (var i = 0, len = methodsToMerge.length; i < len; i++) {
      var methodName = methodsToMerge[i];
      mergeMethod(result, one,two, methodName);
    }

    return result;
  }
}

var mergeMethod = function(result, one, two, methodName){
  if(one[methodName] != null && two[methodName] != null){

    // ... we create a new function on the result object
    result[methodName] = function(){
      // wherein we first call the method which exists on the first object
      var oldReturn = one[methodName].apply(this, arguments);

      // and then call the method on 2nd object
      two[methodName].apply(this, arguments);

      // and then return the expected result,
      // i.e. what the method on `to` returns
      return oldReturn;
    }
  }else{
    throw("Mixin Helper: objects to extend do not share method - " + methodName);
  }
}

module.exports = MixinHelper;
