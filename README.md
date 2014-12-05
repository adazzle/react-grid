# React Grid
==================================
>Data grid for [React][].

[![Coverage Status](https://img.shields.io/coveralls/adazzle/react-grid.svg)](https://coveralls.io/r/adazzle/react-grid)



### Installation

React Grid is available via npm. 

```sh
npm install adazzle-react-grid --save
```

Or if you'd like to use bower, it's as easy as:

```sh
bower adazzle-react-grid --save
```

### Usage
React Grid comes in two flavours. A basic uneditable data grid as well as a more advanced datagrid that attempts to provide a rich excel like experience with filtering, sorting, copy/paste, cell drag down, custom editors and formatters. 

To use the basic grid, just include the following files

```html
<!-- The core React library -->
<script src="http://fb.me/react-0.11.0.js"></script>
<!-- basic React Grid component -->
<script src="adazzle-react-grid/dist/ReactGrid.Grid.js"></script>
```

or if using CommonJs

```js
var Grid = require('adazzle-react-grid');
```

To use the advanced features, add these files to your page
```html
<!-- The core React library -->
<script src="http://fb.me/react-0.11.0.js"></script>
<!-- advanced ReactGrid component -->
<script src="adazzle-react-grid/dist/ReactGrid.Grid.WithAddons.js"></script>
<!-- optional collection of editors for React Grid-->
<script src="adazzle-react-grid/dist/ReactGrid.Grid.Editors.js"></script>
<!-- optional collection of formatters for React Grid-->
<script src="adazzle-react-grid/dist/ReactGrid.Grid.Formatters.js"></script>
```

or if using CommonJs

```js
var ExcelGrid = require('adazzle-react-grid/addons');
var GridEditors = require('adazzle-react-grid/editors');
var GridFormatters = require('adazzle-react-grid/formatters');
```



### Building Your Copy of React Grid

The process to build `reactGrid.js` is built entirely on top of node.js, using many libraries you may already be familiar with.

#### Prerequisites

* You have `node` installed at v0.10.0+

### Setup
run `npm install`
You can then just run `gulp`
this will:
- compile all the jsx into js
- wrap up all the examples registered under `\examples`
- compile less -> css
- fire up a server and open a test page


### Gulp

We use gulp to automate many tasks. Look in ```gulp/tasks``` folder to see full list. The important ones to know:

```sh
# Build examples folder, fire up server and open exmaples page
gulp
# Build reactGrid library in UMD format in dist folder 
gulp dist
# Build and run tests in your browser
gulp tests-launch 
# Compile Less and build styles
gulp styles
# Wipe out build directory
gulp clean
```

## Adding examples
To add any other examples, you just need to:
1. Add a .js file under the examples folder that returns a react component by `module.exports = someNewExample`
2. in examples\index.js register this by adding `components.push({id:'Name for your component', module:require('./nameOfYourFile') });`

This will then add a new menu to the examples.html page

## Tests
we are using [jasmine](http://jasmine.github.io/) for tests and these can either be run in a standalone page by running `gulp tests-launch`
*note: you need to run `bower install` first
For automation, we are using [karma](http://karma-runner.github.io/)
To run the tests use `gulp tests`
To watch for file changes, use ~~`gulp tdd`~~
*this is a work in progress, and wont watch your files unless you first run `gulp tests-build` to do our react/browserify transforms*

## Credits

React Grid is free software created by [Prometheus Research][] and is released
under the MIT.

[React]: http://facebook.github.io/react/
[Prometheus Research, LLC]: http://prometheusresearch.com
