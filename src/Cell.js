/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var EditorContainer = require('./addons/editors/EditorContainer');
var ExcelColumn  = require('./addons/grids/ExcelColumn');

var Cell = React.createClass({

  propTypes : {
    rowIdx : React.PropTypes.number.isRequired,
    idx : React.PropTypes.number.isRequired,
    selected : React.PropTypes.shape({
      idx : React.PropTypes.number.isRequired,
    }),
    tabIndex : React.PropTypes.number,
    ref : React.PropTypes.string,
    column: React.PropTypes.shape(ExcelColumn).isRequired,
    value: React.PropTypes.oneOfType(React.PropTypes.string,React.PropTypes.number, React.PropTypes.Object).isRequired,
    isExpanded: React.PropTypes.bool,
    cellMetaData: React.PropTypes.shape({selected: {idx: React.PropTypes.number.isRequired, onCellClick: React.PropTypes.func}}),
    handleDragStart: React.PropTypes.func,
    className: React.PropTypes.string
  },

  getDefaultProps : function(): {tabIndex: number; ref: string; isExpanded: boolean } {
    return {
      tabIndex : -1,
      ref : "cell",
      isExpanded: false
    }
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentDidUpdate: function(prevProps: any, prevState: any) {
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
    var formatter = this.getFormatter();
    var formatterTag = React.isValidElement(formatter) ? cloneWithProps(formatter, props) : this.props.formatter(props);
    return (<div
      className="react-grid-Cell__value">{formatterTag} {this.props.cellControls}</div>)
    },

  isSelected: function(): boolean {
    var meta = this.props.cellMetaData;
    if(meta == null || meta.selected == null) { return false; }

    return (
      meta.selected
      && meta.selected.rowIdx === this.props.rowIdx
      && meta.selected.idx === this.props.idx
    );
  },

  isActive(): boolean{
    var meta = this.props.cellMetaData;
    if(meta == null || meta.selected == null) { return false; }
    return this.isSelected() && meta.selected.active === true;
  },

  isCellSelectionChanging(nextProps: {idx: number; cellMetaData: {selected: {idx: number}}}): boolean {
    var meta = this.props.cellMetaData;
    if(meta == null || meta.selected == null) { return false; }
    var nextSelected = nextProps.cellMetaData.selected;
    if(meta.selected && nextSelected){
      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
    }else{
      return true;
    }
  },

  getFormatter(): ReactElement {
    var col = this.props.column;
    if(this.isActive()){
      return <EditorContainer rowIdx={this.props.rowIdx} idx={this.props.idx} cellMetaData={this.props.cellMetaData} column={col} height={this.props.height}/>;
    }else{
      return this.props.column.formatter;
    }
  },

  onCellClick(){
    var meta = this.props.cellMetaData;
    if(meta != null && meta.onCellClick != null) {
      meta.onCellClick({rowIdx : this.props.rowIdx, idx : this.props.idx});
    }
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
      'copied' : this.isCopied(),
      // 'selected-draggable' : this.isSelected(),
      // 'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
      // 'is-dragged-over-up' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < this.props.dragged.rowIdx,
      // 'is-dragged-over-down' :  !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > this.props.dragged.rowIdx,
      // 'was-dragged-over' : this.wasDraggedOver()
    });
    return className + ' ' + extraClasses;
  },


  setScrollLeft(scrollLeft: number) {
    var ctrl: any = this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
    if (ctrl.isMounted()) {
      var node = this.getDOMNode();
      var transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  },

  isCopied : function(): boolean{
    var copied = this.props.cellMetaData.copied
    return (
      copied
      && copied.rowIdx === this.props.rowIdx
      && copied.idx === this.props.idx
    );
  },

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


module.exports = Cell;
