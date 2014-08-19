
"use strict";

var _ = require('underscore');

/**
 * Mix properties and methods from multiple objects, without mutating any of them
 *
 * @param {array} array of all mixins to be merged
 * @param {?array} optional list of methods to be extended
 * @return {object|function} The extended object.
 */

var lifeCycleMethods = ['getDefaultProps'];

var MixinHelper = {

  mix : function(mixins){

    var results = [];
    var primary = {};

    mixins.forEach(function(obj){
      //clone the object so that original methods are not overwritten
      var clone = _.clone(obj)
      //add any lifecycle methods to array result. These should behave as normal and not be merged
      var lifeCycleMethodObj = _.pick(clone, lifeCycleMethods);
      if(!_.isEmpty(lifeCycleMethodObj)){
        results.push(lifeCycleMethodObj);
      }

      //loop over each custom method and wrap it such that it might be overwritten or extended if desired
      var customMethodObj = this.wrapAnyCustomMethods(clone);
      Object.assign(primary, customMethodObj);
    }, this);
    results.push(primary);
    return results;
  },

  wrapAnyCustomMethods : function(obj){
    var customMethodObj =  _.omit(obj, lifeCycleMethods);
    var methods = _.functions(customMethodObj);
    methods.forEach(function(methodName){
      var oldMethod = customMethodObj[methodName];
        //overwrite each fuction of object with custom functionlity
        customMethodObj[methodName] = this.wrapMixinMethod(methodName, oldMethod);
    }, this);
    return customMethodObj;
  },

  wrapMixinMethod : function(methodName, old){
    return function(){
      //call overridden method if exists
      if(MixinHelper.isMethodOverridden.call(this, methodName)){
        return MixinHelper.callOverriddenMethod.call(this, methodName, arguments);
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
