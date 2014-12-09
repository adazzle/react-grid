/**
 * @jsx React.DOM
 */
"use strict";

var React          = require('react');
var Perf = React.addons.Perf;
var perfStarted = false;

//globally expose React
//makes dev tools (among other things) work
if(window) { window.React = window.React || React; }

var components = [];
//register our component examples
//the files need to module.export a react component
components.push({id:'Basic', module:require('./scripts/basic') });
components.push({id:'Frozen Columns', module:require('./scripts/frozenCols') });
components.push({id:'Keyboard Nav', module:require('./scripts/GridWithKeyboardNav') });
components.push({id:'Editable Cells', module:require('./scripts/EditableCells') });
components.push({id:'Copyable Cells', module:require('./scripts/CopyableCells') });
components.push({id:'Draggable Cells', module:require('./scripts/DraggableCells') });
components.push({id:'Excel Style Grid', module:require('./scripts/ExcelGrid') });
components.push({id:'Immutable Data', module:require('./scripts/ImmutableData') });

//creates a simple nav menu and viewer
var Examples = React.createClass({
 onMenuClick: function(component) {
   this.setState({exampleToShow: component});
 },
 getInitialState: function(){
   return { exampleToShow: null, perfOn : false };
 },
 renderPerfTools : function(){
   var startClass = this.state.perfOn === true ? 'btn btn-danger' : 'btn btn-default';
   return (<div >
               <h5><b>Performance Monitoring: Print Perf Info to Browser Console</b></h5>
                 <span className="btn-group">
                   <button type="button" className={startClass} onClick={this.startPerf}><span className="glyphicon glyphicon-record"></span></button>
                   <button type="button" className="btn btn-default" onClick={this.stopPerf}><span className="glyphicon glyphicon-stop"></span></button>
                </span>
            </div>)
 },
 startPerf: function(){
   Perf.start();
   this.setState({perfOn : true});
 },
 stopPerf: function(){
   Perf.stop();
   //Perf.printDOM();
   Perf.printWasted();
   //Perf.printInclusive();
  // Perf.printExclusive();
   this.setState({perfOn : false});
 },
 render: function() {
   var detail =this.state.exampleToShow ? this.state.exampleToShow({}) : '';
   var perfTools = this.state.exampleToShow ? this.renderPerfTools() : '';
  return (<div>
            <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
              <div className="container-fluid">
                <Menu onMenuClick={this.onMenuClick} />
              </div>
            </nav>
            <div className="container-fluid">
            <div clasName="page-header">
              <h1>React Grid Examples</h1>
              <p>Unless otherwise stated these examples are all compiled using webpack and referencing the lib-compiled folder,
                which is the js-compiled folder that would be available when downloading ReactGrid from npm. For examples using standalone library, please see the <a href="./examples/dist-basic.html">ReactGrid.js</a> and <a href="./examples/dist-addons.html">ReactGrid.WithAddons.js</a> examples</p>
            </div>
            {perfTools}
            {detail}
          </div>
          </div>)
 },
});
//loops the components and puts out a menu item, wired to pass up the component
var Menu = React.createClass({
 render: function() {
   var children = components.map((comp, idx) =>
     MenuItem({
       id: comp.id,
       module: comp.module,
       onClick: this.props.onMenuClick
     }));
   return (
     <ul className="nav navbar-nav">{children}
        <li ><a href="./examples/dist-basic.html">Dist- ReactGrid.js</a></li>
        <li ><a href="./examples/dist-addons.html">Dist - ReactGrid.WithAddons.js</a></li>
     </ul>);
 },
});

var MenuItem = React.createClass({
  handleClick: function() {
    if (this.props.onClick) { this.props.onClick(this.props.module); }
  },
   render: function() {
     return (<li onClick={this.handleClick}><a href="#">{this.props.id}</a></li>);
   }

 });

 React.render(<Examples />, document.body);
