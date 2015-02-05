
"use strict";

var keyMirror  = require('react/lib/keyMirror');
var isFunction = require('./isFunction')
var React      = require('react');

/**
 * Policies that describe methods in Adazzle React Mixins
 * Any methods that do not confirm to one of these policies will be treated as a custom method
 * All custom methods will be wrapped to potentially allow override/extension as defined on a component
 */
var SpecPolicy = keyMirror({
  /**
   * These methods are React Lifecycle methods and should be mixed into any components
   * according to their default behviour as specified in React library
   */
  DEFINE_LIFE_CYCLE_METHOD : null,
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base ReactCompositeComponent class.
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null

});

var MixinInterface = {


  getDefaultProps : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  propTypes : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  getInitialState : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  statics : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  displayName : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  componentWillMount : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  componentWillReceiveProps : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  shouldComponentUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  componentWillUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  componentDidUpdate : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD,
  componentWillUnmount : SpecPolicy.DEFINE_LIFE_CYCLE_METHOD
}

var MixinAliasCache = {};
var arePropertyDescriptorsSupported = function () {
    try {
      Object.defineProperty({}, 'x', {});
      return true;
    } catch (e) { /* this is IE 8. */
      return false;
    }
  };

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 */
function IE8_merge(obj1,obj2){
    for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
    return obj1;
}
//IE 8 does not support Object.assign even with polyfil.
var merge = arePropertyDescriptorsSupported() ? Object.assign :
 IE8_merge;

var Mixin = function(base, dependsOn){
  this.base = base;
  this.dependsOn = dependsOn;
};

var Dependency = function(dependsOn){
  this.assignTo = function(base){
      return new Mixin(base, dependsOn);
  }
};


var wrapEachMethodInObject = function(clone, results){
  //loop over each property and mix according to its spec policy
  Object.keys(clone).forEach(function(key){
    if(mixinUtils.isCustomProperty(key)){
      //overwrite each function of object with custom functionlity
      if(isFunction(clone[key])){
        clone[key] = mixinUtils.wrapCustomMethod(key, clone[key]);
      }
    }else{

      switch(MixinInterface[key]){
          case SpecPolicy.DEFINE_LIFE_CYCLE_METHOD:
            var lifeCycleObj = {};
            lifeCycleObj[key] = clone[key];
            //add this to mixin result - will be treated as standard
            results.push(lifeCycleObj);
            break;
          case SpecPolicy.DEFINE_MANY_MERGED:
              //TODO imlplement handlers for other spec policies
            break;
      }

      delete clone[key];
    }

  }, this);
}


var MixinHelper = {

  /**
   * Mix properties and methods from multiple objects, without mutating any of them
   *
   * @param {array} array of all mixins to be merged
   * @return {array} A new array of mixins, the first object being an object of containing all custom methods wrapped
   * Subsequent object in array will be any extracted lifecycle methods which should be treated as standard
   */
  mix : function(mixins){

    var results = [];
    var primary = {};

    var dependencies = mixinUtils.getUniqueDependencies(mixins);
    for (var d in dependencies){
      merge(primary, MixinAliasCache[dependencies[d]]);
    }
    wrapEachMethodInObject(primary, results);

    mixins.forEach(function(obj){
      //clone the object so that original methods are not overwritten
      var clone = {};
      //check if mixin was created using Mixin Helper
      //If it is then merge the properties object
      if(obj instanceof Mixin){
        merge(clone, obj.base);
      }else{
        merge(clone, obj);
      }

      wrapEachMethodInObject(clone, results);

      merge(primary, clone);
    }, this);

    results.push(primary);


    return results;
  },


  createDependency : function(deps){
    var dependencyList = [];
    for (var d in deps){
      if(deps[d] instanceof Mixin){
        this.addAlias(d, deps[d].base)
      }else{
        this.addAlias(d, deps[d])
      }
      dependencyList.push(d);
    }
    var uniqueDependencyList = dependencyList.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
    return new Dependency(uniqueDependencyList);
  },

  addAlias : function(key, object){
    MixinAliasCache[key] = object;
  }

};

// idea borrowed from https://github.com/jhudson8/react-mixin-manager/blob/master/react-mixin-manager.js
var _createClass = React.createClass;
React.createClass = function(spec) {
  if (spec.mixins) {
    spec.mixins = MixinHelper.mix(spec.mixins);
  }
  return _createClass.apply(React, arguments);
};


var mixinUtils = {

  isCustomProperty : function(key){
    return (!MixinInterface[key]);
  },

  wrapCustomMethod : function(methodName, old){
    return function(){
      //call overridden method if exists
      if(mixinUtils.isMethodOverridden.call(this, methodName)){
        return mixinUtils.callOverriddenMethod.call(this, methodName, arguments);
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
  },

  getUniqueDependencies : function(mixins){
    var deps = [];
    mixins.forEach(function(m){
      if(m instanceof Mixin){
        deps = deps.concat(m.dependsOn);
      }
    }, this);
    return deps.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });;
  }
}
module.exports = MixinHelper;
