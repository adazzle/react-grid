/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
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
      id    :   React.PropTypes.string,
      title :   React.PropTypes.number
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
      this.props.onCommit({value : this.refs.autoComplete.state.searchTerm, key : 'Tab'});
    }else{
      this.props.onCommit({value : this.getFocusedSuggestion(), key : 'Tab'});
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
    return this.refs.autoComplete.state.focusedValue.title;
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

  handleChange(args){
    this.props.onCommit({value : args.title, key : 'Enter'});
  },

  renderEditorNode(){
    var val = {title : this.getDefaultValue()};
    return (<div style={this.getStyle()} onKeyDown={this.onKeyDown}>
              <ReactAutocomplete  ref="autoComplete" options={this.props.options} value={val} onChange={this.handleChange} />
            </div>);
  }

});

module.exports = AutoCompleteEditor;
