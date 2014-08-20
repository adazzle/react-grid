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
var keyboardHandlerMixin    = require('../cells/mixins/keyboardHandlerMixin');

var options = [
  {id: 'banana', title: 'Banana'},
  {id: 'apple', title: 'Apple'},
  {id: 'pineapple', title: 'Pineapple'},
  {id: 'strawberry', title: 'Strawberry'}
]

var AutoCompleteEditor = React.createClass({

  mixins : MixinHelper.mix([keyboardHandlerMixin, EditorMixin, TextInputMixin]),

  overrides : {
      checkFocus : function(){
          this.setTextInputFocus();
      },
      getInputNode(){
        return this.getSearchComponent().getDOMNode();
      },
      onPressEnter(args){
        var ev = args[0];
        ev.stopPropagation();
        ev.preventDefault();
        if(!this.isFocusedOnSuggestion()){
          this.props.onCommit({value : this.refs.autoComplete.state.searchTerm, key : 'Enter'});
        }
      },
  },

  getSearchComponent(){
    return this.refs.autoComplete.refs.search;
  },
  
  isFocusedOnSuggestion(){
    var autoComplete = this.refs.autoComplete;
    return autoComplete.state.focusedValue != null;
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

  render(){
    var val = {title : this.getDefaultValue()};
    return (<div onKeyDown={this.onKeyDown}>
              <ReactAutocomplete ref="autoComplete" options={options} value={val} onChange={this.handleChange} />
            </div>);
  }

});

module.exports = AutoCompleteEditor;
