/* @flow */
type RowUpdateEvent = {
  rowIdx: number;
  updated: any;
  cellKey: string;
  keyCode: string;
  changed: { expandedHeight: number }
};
