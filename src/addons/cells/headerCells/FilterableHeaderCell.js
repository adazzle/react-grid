/* @flow  */
/**
 * @jsx React.DOM


 */
'use strict';

var React              = require('react/addons');
var cx             = React.addons.classSet;
var Column = require('../../../Column').ColumnType;

var FilterableHeaderCell = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    column: React.PropTypes.shape(Column).isRequired
  },

  getInitialState(): {filterTerm: string}{
    return {filterTerm : ''}
  },

  handleChange(e: Event){
    e.preventDefault();
    e.stopPropagation();

    var val = (e.currentTarget instanceof Node) ? e.currentTarget.nodeValue : null;
    this.setState({filterTerm : val });
    this.props.onChange({filterTerm : val, columnKey : this.props.column.key});
  },

  componentDidUpdate(nextProps: any) {
    var ele = this.getDOMNode();
    if(ele) ele.focus();
  },

  render: function(): ?ReactElement {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  },

  renderInput : function(): ?ReactElement {
    if(this.props.column.filterable === false){
      return <span/>;
    }else{
      return (<input type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>)
    }

  }
});

module.exports = FilterableHeaderCell;
