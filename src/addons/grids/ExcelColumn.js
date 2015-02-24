/* @flow */
type ExcelColumn = {
  name: string;
  key: string;
  width: number;
  cellRenderer: (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any, width: number ) => ReactElement;
};

class ExcelColumn {
  name: string;
  key: string;
  width: number;
  cellRenderer: (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any, width: number ) => ReactElement;

}
module.exports = ExcelColumn;
