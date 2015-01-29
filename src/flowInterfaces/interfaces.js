/* @flow */
type RowUpdateEvent = {rowIdx: number; updated: object; cellKey: string; keyCode: string};
type CellDragEvent = {rowIdx: number; fromRow: number; toRow: number; value: any};
type CellCopyPasteEvent = {rowIdx: number; value : any; fromRow: number; toRow: number; cellKey: string};
