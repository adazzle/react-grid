/* @flow */
/* Flow issues:
overrides? getDefaultValue, getStyle, onKeyDown
*/
/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var ReactAutocomplete       = require('ron-react-autocomplete');
var KeyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');

var optionPropType = React.PropTypes.shape({
      id    :   React.PropTypes.required,
      title :   React.PropTypes.string
    });

var AutoCompleteEditor = React.createClass({

  mixins : [KeyboardHandlerMixin],

  propTypes : {
    onCommit : React.PropTypes.func.isRequired,
    options : React.PropTypes.arrayOf(optionPropType).isRequired,
    label : React.PropTypes.string,
    value : React.PropTypes.any.isRequired,
    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
    column: React.PropTypes.shape(ExcelColumn).isRequired,
    resultIdentifier : React.PropTypes.string,
    search : React.PropTypes.string,

  },

  getDefaultProps(){
    return {
      resultIdentifier : 'id'
    }
  },

  handleKeyDown(e: Event){
    if(!this.isKeyPrintable(e.keyCode) && this.areResultsShowing()){
      e.stopPropagation();
      e.preventDefault();
    }else{
      this.props.onKeyDown(e);
    }
  },

  areResultsShowing(){
    return this.refs.autoComplete.state.showResults === true;
  },

  handleTab(e: Event){
    e.stopPropagation();
    e.preventDefault();
    if(!this.isFocusedOnSuggestion()){
      this.handleChange(null, 'Tab');
    }else{
      this.handleChange(this.getFocusedSuggestion(), 'Tab');
    }
  },

  handleEnter(e: Event){
    e.stopPropagation();
    e.preventDefault();
    if(!this.isFocusedOnSuggestion()){
      this.props.onCommit({value : this.refs.autoComplete.state.searchTerm, key : 'Enter'});
    }
  },

  getValue(){
    return this.refs.autoComplete.refs.search.value
  },

  isFocusedOnSuggestion(): boolean{
    var autoComplete = this.refs.autoComplete;
    return autoComplete.state.focusedValue != null;
  },

  getFocusedSuggestion(): string{
    return this.refs.autoComplete.state.focusedValue;
  },

  getLabel(item: any): string {
    var label = this.props.label != null ? this.props.label : 'title';
    if (typeof label === "function") {
      return label(item);
    } else if (typeof label === "string") {
      return item[label];
    }
  },

  handleChange(item: ?string, key: string) {
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
    this.props.commit({value : value, key : key, updated : rowDataChanged});
  },

  constuctValueFromParams(obj: any, props: Array<string>): string {
    var ret = [];
    for (var i = 0, ii = props.length; i < ii; i++) {
      ret.push(obj[props[i]]);
    }
    return ret.join('|');
  },

  render(): ReactElement {
    var label = this.props.label != null ? this.props.label : 'title';
    return (<div height={this.props.height} onKeyDown={this.handleKeyDown}>
              <ReactAutocomplete  search={this.props.search} ref="autoComplete" label={label} resultIdentifier={this.props.resultIdentifier} options={this.props.options} value={this.props.value} onChange={this.handleChange} />
            </div>);
  }

});

module.exports = AutoCompleteEditor;
