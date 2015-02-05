/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 * @flow
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var MixinHelper             = require('../utils/MixinHelper');
var EditorMixin             = require('./mixins/EditorMixin');
var TextInputMixin          = require('./mixins/TextInputMixin');
var ReactAutocomplete       = require('ron-react-autocomplete');
var keyboardHandlerMixin    = require('../cells/mixins/KeyboardHandlerMixin');

var optionPropType = React.PropTypes.shape({
      id    :   React.PropTypes.required,
      title :   React.PropTypes.string
    });

var AutoCompleteEditor = React.createClass({

  propTypes : {
    options : React.PropTypes.arrayOf(optionPropType)
  },

  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin, TextInputMixin]),

  overrides : {
      checkFocus : function(){
          this.setTextInputFocus();
      },
      getInputNode(){
        return this.getSearchComponent().getDOMNode();
      },
      onPressEnter(args){
        var e = args[0];
        this.handleEnter(e);
      },
      onPressTab(args){
        var e = args[0];
        this.handleTab(e);
      }
  },

  handleTab(e){
    e.stopPropagation();
    e.preventDefault();
    if(!this.isFocusedOnSuggestion()){
      this.handleChange(null, 'Tab');
    }else{
      this.handleChange(this.getFocusedSuggestion(), 'Tab');
    }
  },

  handleEnter(e){
    e.stopPropagation();
    e.preventDefault();
    if(!this.isFocusedOnSuggestion()){
      this.props.onCommit({value : this.refs.autoComplete.state.searchTerm, key : 'Enter'});
    }
  },

  getSearchComponent(){
    return this.refs.autoComplete.refs.search;
  },

  isFocusedOnSuggestion(){
    var autoComplete = this.refs.autoComplete;
    return autoComplete.state.focusedValue != null;
  },

  getFocusedSuggestion(){
    return this.refs.autoComplete.state.focusedValue;
  },

  onPressArrowDown(e){
    //prevent event propogation. this disables downwards cell navigation
    e.stopPropagation();
    e.preventDefault();
  },

  onPressArrowUp(e){
    //prevent event propogation. this disables upwards cell navigation
    e.stopPropagation();
  },

  getLabel(result) {
    var label = this.props.label != null ? this.props.label : 'title';
    if (typeof label === "function") {
      return label(result);
    } else if (typeof label === "string") {
      return result[label];
    }
  },

  handleChange(item, key){
    var rowDataChanged = {};
    var value = this.props.value;
    if(item!=null){
      value = this.getLabel(item);
      if(this.props.valueParams){
        value = this.constuctValueFromParams(item, this.props.valueParams);
      }
      rowDataChanged[this.props.column.key] = value;
    }
    key = key ? key : 'Enter';
    this.props.onCommit({value : value, key : key, rowDataChanged : rowDataChanged});
  },

  constuctValueFromParams(obj, props) {
    var ret = [];
    for (var i = 0, ii = props.length; i < ii; i++) {
      ret.push(obj[props[i]]);
    }
    return ret.join('|');
  },

  renderEditorNode(){
    var val = {title : this.getDefaultValue()};
    var label = this.props.label != null ? this.props.label : 'title';
    return (<div style={this.getStyle()} onKeyDown={this.onKeyDown}>
              <ReactAutocomplete  search={this.props.search} ref="autoComplete" label={label} resultIdentifier={this.props.resultIdentifier} options={this.props.options} value={val} onChange={this.handleChange} />
            </div>);
  }

});

module.exports = AutoCompleteEditor;
