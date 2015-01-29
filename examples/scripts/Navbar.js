/**
* @jsx React.DOM
*/
module.exports = React.createClass({
  render : function(){
    return(
      <div className="navbar navbar-fixed-top headroom" >
        <div className="container">
          <div className="navbar-header">
          <a href="https://github.com/you"><img className="github-ribbon" src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-green@2x.png" alt="Fork me on GitHub"></img></a>

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
            <a className="navbar-brand" href="/index.html#"><i className="fa fa-table fa-2"></i> React Grid</a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav pull-right">
              <li className="active"><a href=".">Home</a></li>
              <li><a href="documentation.html">Documentation</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Examples <b className="caret"></b></a>
                  <ul className="dropdown-menu">
                    <li><a href="sidebar-left.html">Basic Use</a></li>
                    <li><a href="sidebar-left.html">Editable Grid</a></li>
                      <li><a href="sidebar-right.html">Using Editors</a></li>
                      <li><a href="sidebar-right.html">Custom Editors</a></li>
                      <li><a href="sidebar-right.html">Copy & Paste</a></li>
                      <li><a href="sidebar-right.html">Cell Dragdown</a></li>
                    </ul>
                </li>
            </ul>
          </div>
        </div>
    </div>)
  }
})
