/* TODO@flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React              = require('react/addons');
var cx             = React.addons.classSet;

var FilterableHeaderCell = React.createClass({

  getInitialState(): {filterTerm: string}{
    return {filterTerm : ''}
  },

  handleChange(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.setState({filterTerm : e.currentTarget.value});
    this.props.onChange({filterTerm : e.currentTarget.value, columnKey : this.props.column.key});
  },

  componentDidUpdate(): boolean{
    this.getDOMNode().focus();
  },

  render: function(): ?ReactElement {
    return (
      <div>
        <div className="form-group">
          <this.renderInput/>
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
