/**
 * @jsx React.DOM
 */
"use strict";

var React          = require('react');

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

//creates a simple nav menu and viewer
var Examples = React.createClass({
 onMenuClick: function(component) {
   this.setState({exampleToShow: component});
 },
 getInitialState: function(){
   return { exampleToShow: null };
 },
 render: function() {
   var detail =this.state.exampleToShow ? this.state.exampleToShow({}) : '';
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
            </div>


            {detail}
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
   return (<ul className="nav navbar-nav">{children}
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

 React.renderComponent(<Examples />, document.body);
