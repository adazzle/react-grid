/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */

'use strict';

var KeyboardHandlerMixin = {

  onKeyDown(e){
    //break up individual keyPress events to have their own specific callbacks
    //this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
    if (e.key !== "Unidentified") {
      var callBack = 'onPress' + e.key;
      this.checkAndCall(callBack, e);
    }else if(this.isPrintable(e.keyCode)){
      this.checkAndCall('onPressChar', e);
    }
    this.checkMethodExtendedAndCall('handleKeyDown', e);
  },

  //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
  isPrintable(keycode){
    var valid =
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
  },

  checkAndCall(methodName, args){
    if(typeof this[methodName] === 'function'){
      this[methodName](args);
    }
  }
}



module.exports = KeyboardHandlerMixin;
