/* TODO@flow mixin */
/**
 * @jsx React.DOM


 */
'use strict';
var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var isFunction = require('../../utils/isFunction');

var ExcelColumn = require('../../grids/ExcelColumn');

var EditorMixin = {

  propTypes : {
    height : React.PropTypes.number.isRequired,
    column : React.PropTypes.shape(ExcelColumn).isRequired,
    onCommit : React.PropTypes.func.isRequired
  },

  getStyle(): { height: number} {
    return {
      height : this.props.height - 1
    }
  },

  getInitialState(): {isInvalid: boolean }{
    return {isInvalid : false}
  },

  onPressEnter(e: Event){
    React.addons.Perf.start();
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Enter'});
  },

  onPressTab(e: Event){
    e.stopPropagation();
    e.preventDefault();
    this.commit({key : 'Tab'});
  },

  commit(args: {key: string}){
    var value = this.getValue();
    var rowDataChanged = {};
    rowDataChanged[this.props.column.key] = value;
    if(this.isNewValueValid(value)){
      this.props.onCommit({updated : rowDataChanged, key : args.key});
    }
  },

  isNewValueValid(value: string): boolean{
    if(isFunction(this.validate)){
      var isValid = this.validate(value);
      this.setState({isInvalid : !isValid});
      return isValid;
    }else{
      return true;
    }
  },

  getValue(): string{
      return this.getInputNode().value;
  },

  setValue(value: string){
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

  getInputNode(): HTMLElement{
    return this.getDOMNode().getElementsByTagName("input")[0];
  },

  getContainerClass(): string{
    return cx({
      'has-error' : this.state.isInvalid === true
    })
  },

  renderStatusIcon(): ?ReactElement{
    if(this.state.isInvalid === true){
      return <span className="glyphicon glyphicon-remove form-control-feedback"></span>
    }
  },

  render(): ?ReactElement{
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
