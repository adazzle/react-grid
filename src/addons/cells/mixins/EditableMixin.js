/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React            = require('react/addons');
var cx               = React.addons.classSet;
var cloneWithProps   = React.addons.cloneWithProps;
var SimpleTextEditor = require('../../editors/SimpleTextEditor');
var PropTypes        = React.PropTypes;
var MixinHelper      = require('../../utils/MixinHelper');
var SelectableMixin  = require('./SelectableMixin');
var KeyboardHandlerMixin = require('./KeyboardHandlerMixin');

var EditableMixin = MixinHelper.createDependency({

  KeyboardHandlerMixin : KeyboardHandlerMixin,

  SelectableMixin : SelectableMixin

  }).assignTo({

    propTypes : {
        onCommit : PropTypes.func.isRequired
    }


});



module.exports = EditableMixin;
