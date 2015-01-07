/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';
var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var isFunction = require('../../utils/isFunction');

var EditorMixin = {

  propTypes : {
    onCommit : React.PropTypes.func.isRequired
  },

  getStyle(){
    return {
      height : this.props.height - 1
    }
  },

  getInitialState(){
    return {isInvalid : false}
  },

  onPressEnter(e){
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Enter'});
  },

  onPressTab(e){
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Tab'});
  },

  commit(args){
    var value = this.getValue();
    if(this.isNewValueValid(value)){
      this.props.onCommit({value : value, key : args.key});
    }
  },

  isNewValueValid(value){
    if(isFunction(this.validate)){
      var isValid = this.validate(value);
      this.setState({isInvalid : !isValid});
      return isValid;
    }else{
      return true;
    }
  },

  getValue(){
      return this.getInputNode().value;
  },

  setValue(value){
      this.getInputNode().value = value;
  },

  componentDidMount: function() {
    if(this.getInputNode() !== undefined){
      this.checkFocus();
      this.getInputNode().className += ' editor-main';
    }
  },

  checkFocus(){
    this.getInputNode().focus();
  },

  getInputNode(){
    return this.getDOMNode().getElementsByTagName("input")[0];
  },

  getContainerClass(){
    return cx({
      'has-error' : this.state.isInvalid === true
    })
  },

  renderStatusIcon(){
    if(this.state.isInvalid === true){
      return <span className="glyphicon glyphicon-remove form-control-feedback"></span>
    }
  },

  render(){
    if(!isFunction(this.renderEditorNode)){
        throw "Editor Mixin Error : " + this.displayName + " component must implement method renderEditorNode";
    }
    var editorNode = this.renderEditorNode();
    return (
      <div className={this.getContainerClass()}>
        {editorNode}
        {this.renderStatusIcon()}
      </div>
    )
  }
};

module.exports = EditorMixin;
