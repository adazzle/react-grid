
"use strict";

var _ = require('underscore');

/**
 * Mix properties and methods from multiple objects, without mutating any of them
 *
 * @param {array} array of all mixins to be merged
 * @param {?array} optional list of methods to be extended
 * @return {object|function} The extended object.
 */

var MixinHelper = {

  mix : function(mixins){

    var result = {};

    mixins.forEach(function(obj){
      var clone = _.clone(obj);
      var methods = _.functions(clone);
      methods.forEach(function(methodName){
        var oldMethod = clone[methodName];
        //overwrite each fuction of object with custom functionlity
        clone[methodName] = this.wrapMixinMethod(methodName, oldMethod);
      }, this);

      Object.assign(result, clone);
    }, this);

    return result;
  },

  wrapMixinMethod : function(methodName, old){
    return function(){
      //call overridden method if exists
      if(MixinHelper.isMethodOverridden.call(this, methodName)){
        MixinHelper.callOverriddenMethod.call(this, methodName, arguments);
      }else{
        //call the original mixin method
        return old.apply(this, arguments);
      }
    }
  },

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
};

module.exports = MixinHelper;
