
"use strict";

var isFunction = function(functionToCheck){
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = isFunction;
