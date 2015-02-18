
"use strict";
var React = require('react/addons');
Object.assign = require('object-assign');
var ExampleImage = require('./ExampleImage');
var FakeObjectDataListStore = require('./FakeObjectDataListStore');
var FixedDataTable = require('../../fixedDataGrid/FixedDataTableRoot');
var SelectableGridMixin   = require('./mixins/SelectableGridMixin');


var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

function renderImage(/*string*/ cellData) {
  return <ExampleImage src={cellData} />;
}

function renderLink(/*string*/ cellData) {
  return <a href="#">{cellData}</a>;
  }

  function renderDate(/*object*/ cellData) {
    return <span>{cellData.toLocaleString()}</span>;
    }

    var ObjectDataExample = React.createClass({

      mixins : [SelectableGridMixin],

      propTypes: {
        onContentDimensionsChange: PropTypes.func,
        left: PropTypes.number,
        top: PropTypes.number,
      },

      _onContentHeightChange(contentHeight) {
        this.props.onContentDimensionsChange &&
        this.props.onContentDimensionsChange(contentHeight, 1150);
      },

      render() {
        var win = window;

        var widthOffset = win.innerWidth < 680 ? 0 : 240;
        var tableWidth  = win.innerWidth - widthOffset;
        var tableHeight =win.innerHeight - 200;


        var controlledScrolling =
        this.props.left !== undefined || this.props.top !== undefined;

        return (
          <Table
            rowHeight={50}
            headerHeight={50}
            rowGetter={FakeObjectDataListStore.getObjectAt}
            rowsCount={FakeObjectDataListStore.getSize()}
            width={1150}
            height={tableHeight}
            onContentHeightChange={this._onContentHeightChange}
            scrollTop={this.props.top}
            scrollLeft={this.props.left}
            overflowX={controlledScrolling ? "hidden" : "auto"}
            overflowY={controlledScrolling ? "hidden" : "auto"}>
            <Column
              cellRenderer={renderImage}
              dataKey="avartar"
              fixed={true}
              label=""
              width={50}
              />
            <Column
              dataKey="firstName"
              fixed={true}
              label="First Name"
              width={100}
              />
            <Column
              dataKey="lastName"
              fixed={true}
              label="Last Name"
              width={100}
              />
            <Column
              dataKey="city"
              label="City"
              width={100}
              />
            <Column
              label="Street"
              width={200}
              dataKey="street"
              />
            <Column
              label="Zip Code"
              width={200}
              dataKey="zipCode"
              />
            <Column
              cellRenderer={renderLink}
              label="Email"
              width={200}
              dataKey="email"
              />
            <Column
              cellRenderer={renderDate}
              label="DOB"
              width={200}
              dataKey="date"
              />
          </Table>
        );
      },
    });

    module.exports = ObjectDataExample;
