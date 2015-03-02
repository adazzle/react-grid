/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var EditorContainer = require('./addons/editors/EditorContainer');

var Cell = React.createClass({

  propTypes : {
    rowIdx : React.PropTypes.number.isRequired,
    idx : React.PropTypes.number.isRequired,
    selected : React.PropTypes.shape({
      idx : React.PropTypes.number.isRequired,
    }),
    tabIndex : React.PropTypes.number,
    ref : React.PropTypes.string,
    // handleDragEnter : React.PropTypes.func,
    // handleDragStart : React.PropTypes.func,
    // handleDragEnd : React.PropTypes.func,
    // handleTerminateDrag : React.PropTypes.func,
    // onDragEnter : React.PropTypes.func,
    // onDragEnd : React.PropTypes.func,
    // value: React.PropTypes.any.isRequired,
    // dragged: React.PropTypes.shape({
    //   overRowIdx: React.PropTypes.number.isRequired,
    //   idx: React.PropTypes.number.isRequired,
    //   complete: React.PropTypes.bool
    // }),
    // copied: React.PropTypes.shape({
    //   rowIdx: React.PropTypes.number.isRequired,
    //   idx: React.PropTypes.number.isRequired
    // }),
    // handleCopy : React.PropTypes.func.isRequired,
    // handlePaste : React.PropTypes.func.isRequired
  },

  getDefaultProps : function(): {tabIndex: number; ref: string } {
    return {
      tabIndex : -1,
      ref : "cell",
      formatter: simpleCellFormatter,
      // handleDragStart: this.handleDragStart,
      // onDragEnter: this.handleDragEnter,
      // onDragEnd: this.handleDragEnd
    }
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function() {
    this.checkFocus();
    var dragged = this.props.dragged;
    if(dragged && dragged.complete === true){
      this.props.handleTerminateDrag();
    }
  },

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return this.props.column.width !== nextProps.column.width
    || this.props.value !== nextProps.value
    || this.props.height !== nextProps.height
    || this.props.rowIdx !== nextProps.rowIdx
    || this.isCellSelectionChanging(nextProps);
  },

  getStyle(): {position:string; width: number; height: number; left: number} {
    var style = {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left
    };
    return style;
  },

  render(): ?ReactElement {
    var style = this.getStyle();

    var className = this.getCellClass();

    var cellContent = this.renderCellContent({
      value : this.props.value,
      column : this.props.column,
      rowIdx : this.props.rowIdx,
      isExpanded : this.props.isExpanded
    });

    return (
      <div {...this.props} className={className} style={style} onClick={this.onCellClick}>
      {cellContent}
      <div className="drag-handle" draggable="true" onDragStart={this.props.handleDragStart}>
      </div>
      </div>
    );
  },

  renderCellContent(props: any): ReactElement {
    var formatter = this.getFormatter() || this.props.formatter;
    var formatterTag = React.isValidElement(formatter) ? cloneWithProps(formatter, props) : this.props.formatter(props);
    return (<div
      className="react-grid-Cell__value">{formatterTag} {this.props.cellControls}</div>)
    },

  isSelected: function(): boolean {
    var selected = this.props.cellMetaData.selected;
    return (
      selected
      && selected.rowIdx === this.props.rowIdx
      && selected.idx === this.props.idx
    );
  },

  isActive(): boolean{
    var selected = this.props.cellMetaData.selected;
    return this.isSelected() && selected.active === true;
  },

  isCellSelectionChanging(nextProps: {idx: number; cellMetaData: {selected: {idx: number}}}): boolean {
    var selected     = this.props.cellMetaData.selected;
    var nextSelected = nextProps.cellMetaData.selected;
    if(selected && nextSelected){
      return this.props.idx === nextSelected.idx || this.props.idx === selected.idx;
    }else{
      return true;
    }
  },

  getFormatter(): ReactElement {
    var col = this.props.column;
    if(this.isActive()){
      return <EditorContainer cellMetaData={this.props.cellMetaData} column={col} height={this.props.height}/>;
    }else{
      return this.props.column.formatter;
    }
  },


  onCommit(commit: {key: string; updated: any}){
    var rowIdx = this.props.rowIdx;
    var idx = this.props.idx;
    var cellKey = this.props.column.key;
    this.props.cellMetaData.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, updated : commit.updated, keyCode : commit.key});
  },

  onCellClick(){
    this.props.cellMetaData.onCellClick({rowIdx : this.props.rowIdx, idx : this.props.idx});
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      this.getDOMNode().focus();
    }
  },

  getCellClass : function(): string {
    var className = cx(
      'react-grid-Cell',
      this.props.className,
      this.props.column.locked ? 'react-grid-Cell--locked' : null
    );

    var extraClasses = cx({
      'selected' : this.isSelected() && !this.isActive() ,
      'editing' : this.isActive(),
      // 'copied' : this.isCopied(),
      // 'selected-draggable' : this.isSelected(),
      // 'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
      // 'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
      // 'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
      // 'was-dragged-over' : this.wasDraggedOver()
    });
    return className + ' ' + extraClasses;
  },


  setScrollLeft(scrollLeft: number) {
    if (this.isMounted()) {
      var node = this.getDOMNode();
      var transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  },


  // KeyCode_c : '99',
  //
  // KeyCode_C : '67',
  //
  // KeyCode_V : '86',
  //
  // KeyCode_v : '118',
  //
  // isCopied : function(){
  //   return (
  //     this.props.copied
  //     && this.props.copied.rowIdx === this.props.rowIdx
  //     && this.props.copied.idx === this.props.idx
  //   );
  // },
  //
  // onPressKeyWithCtrl(e){
  //   if(this.canEdit()){
  //     if(e.keyCode == this.KeyCode_c || e.keyCode == this.KeyCode_C){
  //       this.props.handleCopy({value : this.props.value});
  //     }else if(e.keyCode == this.KeyCode_v || e.keyCode == this.KeyCode_V){
  //       this.props.handlePaste({value : this.props.value});
  //     }
  //   }
  // },
  //
  // isDraggedOver(){
  //
  //   return (
  //     this.props.dragged &&
  //     this.props.dragged.overRowIdx === this.props.rowIdx
  //     && this.props.dragged.idx === this.props.idx
  //   )
  // },
  //
  // wasDraggedOver(){
  //   return (
  //     this.props.dragged
  //     && ((this.props.dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < this.props.dragged.rowIdx)
  //     ||  (this.props.dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > this.props.dragged.rowIdx))
  //     && this.props.dragged.idx === this.props.idx
  //   );
  // },
  //
  // handleDragStart(e){
  //   var rowIdx = this.props.rowIdx;
  //   var idx = this.props.idx;
  //   this.props.handleDragStart({rowIdx : rowIdx, idx : idx, copiedText : this.props.value});
  // },
  //
  // handleDragEnter(){
  //   this.props.handleDragEnter(this.props.rowIdx);
  // },
  //
  // handleDragEnd(){
  //   this.props.handleDragEnd();
  // },
  //
  // isDraggedCellChanging(nextProps){
  //   if(this.props.dragged){
  //     return (nextProps.dragged && this.props.idx === nextProps.dragged.idx)
  //     || (this.props.dragged && this.props.idx === this.props.dragged.idx);
  //   }else{
  //     return false;
  //   }
  // }
});

function simpleCellFormatter(props: any): string {
  return props.value;
}

module.exports = Cell;
