
"use strict";


/**
 * Mix properties and methods from multiple objects, without mutating any of them
 *
 * @param {array} array of all mixins to be merged
 * @param {?array} optional list of methods to be extended
 * @return {object|function} The extended object.
 */

var MixinHelper = {
  mix : function(mixins){
    var result = getMixinBase();

    mixins.forEach(function(obj){
      Object.assign(result, obj);
    });

    return result;
  }
};

var getMixinBase = function(){
  return {
    checkMethodExtendedAndCall : function(methodName, args){
      if(this.extended && (typeof this.extended[methodName] === 'function')){
        return this.extended[methodName].call(this, args);
      }
    },

    checkMethodImplementedAndCall: function(methodName, args){
      if(this.implemented && (typeof this.implemented[methodName] === 'function')){
        return this.implemented[methodName].call(this, args);
      }
    },

    isMethodOverridden: function(methodName){
      return this.overrides && (typeof this.overrides[methodName] === 'function');
    },

    callOverriddenMethod: function(methodName, args){
      return this.overrides[methodName].call(this, args);
    }
  }
};



module.exports = MixinHelper;
