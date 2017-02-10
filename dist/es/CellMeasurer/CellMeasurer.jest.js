import React from 'react';
import { render } from '../TestUtils';
import CellMeasurer from './CellMeasurer';
import CellSizeCache from './defaultCellSizeCache';

var HEIGHTS = [75, 50, 125, 100, 150];
var WIDTHS = [125, 50, 200, 175, 100];

// Accounts for the fact that JSDom doesn't support measurements.
function mockClientWidthAndHeight(_ref) {
  var cellMeasurer = _ref.cellMeasurer,
      height = _ref.height,
      width = _ref.width;

  var clientHeightIndex = -1;
  var clientWidthIndex = -1;

  Object.defineProperty(cellMeasurer._div, 'clientHeight', {
    configurable: true,
    get: function get() {
      return height || HEIGHTS[++clientHeightIndex % HEIGHTS.length];
    }
  });

  Object.defineProperty(cellMeasurer._div, 'clientWidth', {
    configurable: true,
    get: function get() {
      return width || WIDTHS[++clientWidthIndex % WIDTHS.length];
    }
  });
}

function createCellRenderer() {
  var cellRendererParams = [];
  var cellRenderer = function cellRenderer(params) {
    cellRendererParams.push(params);
    return React.createElement(
      'div',
      { style: {
          height: HEIGHTS[params.columnIndex],
          width: WIDTHS[params.rowIndex]
        } },
      'cell'
    );
  };

  return {
    cellRenderer: cellRenderer,
    cellRendererParams: cellRendererParams
  };
}

function renderHelper() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      cellRenderer = _ref2.cellRenderer,
      cellSizeCache = _ref2.cellSizeCache,
      _ref2$columnCount = _ref2.columnCount,
      columnCount = _ref2$columnCount === undefined ? 1 : _ref2$columnCount,
      columnWidth = _ref2.columnWidth,
      _ref2$rowCount = _ref2.rowCount,
      rowCount = _ref2$rowCount === undefined ? 1 : _ref2$rowCount,
      rowHeight = _ref2.rowHeight;

  var params = void 0;
  render(React.createElement(
    'div',
    null,
    React.createElement(
      CellMeasurer,
      {
        cellRenderer: cellRenderer,
        cellSizeCache: cellSizeCache,
        columnCount: columnCount,
        height: rowHeight,
        rowCount: rowCount,
        width: columnWidth
      },
      function (paramsToSave) {
        params = paramsToSave;

        return React.createElement(
          'div',
          null,
          'foo'
        );
      }
    )
  ));

  mockClientWidthAndHeight({
    cellMeasurer: params.cellMeasurer,
    height: rowHeight,
    width: columnWidth
  });

  return params;
}

describe('CellMeasurer', function () {
  it('should calculate the height of a single-column row', function () {
    var _createCellRenderer = createCellRenderer(),
        cellRenderer = _createCellRenderer.cellRenderer,
        cellRendererParams = _createCellRenderer.cellRendererParams;

    var _renderHelper = renderHelper({
      cellRenderer: cellRenderer,
      columnWidth: 100
    }),
        getColumnWidth = _renderHelper.getColumnWidth,
        getRowHeight = _renderHelper.getRowHeight;

    expect(cellRendererParams).toEqual([]);
    expect(getRowHeight({ index: 0 })).toEqual(75);
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }]);
    expect(getColumnWidth({ index: 0 })).toEqual(100);

    // For some reason this explicit unmount is necessary.
    // Without it, Jasmine's :afterEach doesn't pick up and unmount the component correctly.
    render.unmount();
  });

  it('should calculate the width of a single-row column', function () {
    var _createCellRenderer2 = createCellRenderer(),
        cellRenderer = _createCellRenderer2.cellRenderer,
        cellRendererParams = _createCellRenderer2.cellRendererParams;

    var _renderHelper2 = renderHelper({
      cellRenderer: cellRenderer,
      rowHeight: 50
    }),
        getColumnWidth = _renderHelper2.getColumnWidth,
        getRowHeight = _renderHelper2.getRowHeight;

    expect(cellRendererParams).toEqual([]);
    expect(getColumnWidth({ index: 0 })).toEqual(125);
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }]);
    expect(getRowHeight({ index: 0 })).toEqual(50);
  });

  it('should calculate the height of a multi-column row based on the tallest column-cell', function () {
    var _createCellRenderer3 = createCellRenderer(),
        cellRenderer = _createCellRenderer3.cellRenderer,
        cellRendererParams = _createCellRenderer3.cellRendererParams;

    var _renderHelper3 = renderHelper({
      cellRenderer: cellRenderer,
      columnCount: 5,
      columnWidth: 100
    }),
        getColumnWidth = _renderHelper3.getColumnWidth,
        getRowHeight = _renderHelper3.getRowHeight;

    expect(cellRendererParams.length).toEqual(0);
    expect(getRowHeight({ index: 0 })).toEqual(150);
    expect(cellRendererParams.length).toEqual(5);
    expect(getColumnWidth({ index: 0 })).toEqual(100);
  });

  it('should calculate the width of a multi-row column based on the widest row-cell', function () {
    var _createCellRenderer4 = createCellRenderer(),
        cellRenderer = _createCellRenderer4.cellRenderer,
        cellRendererParams = _createCellRenderer4.cellRendererParams;

    var _renderHelper4 = renderHelper({
      cellRenderer: cellRenderer,
      rowCount: 5,
      rowHeight: 50
    }),
        getColumnWidth = _renderHelper4.getColumnWidth,
        getRowHeight = _renderHelper4.getRowHeight;

    expect(cellRendererParams.length).toEqual(0);
    expect(getColumnWidth({ index: 0 })).toEqual(200);
    expect(cellRendererParams.length).toEqual(5);
    expect(getRowHeight({ index: 0 })).toEqual(50);
  });

  it('should support :rowRenderer via :index param for easier List integration', function () {
    var _createCellRenderer5 = createCellRenderer(),
        cellRenderer = _createCellRenderer5.cellRenderer,
        cellRendererParams = _createCellRenderer5.cellRendererParams;

    var _renderHelper5 = renderHelper({
      cellRenderer: cellRenderer,
      rowCount: 5,
      rowHeight: 50
    }),
        getColumnWidth = _renderHelper5.getColumnWidth;

    getColumnWidth({ index: 0 });
    expect(cellRendererParams.length).toEqual(5);
    for (var i = 0; i < 5; i++) {
      expect(cellRendererParams[i].index).toEqual(i);
    }
  });

  it('should cache cell measurements once a cell has been rendered', function () {
    var _createCellRenderer6 = createCellRenderer(),
        cellRenderer = _createCellRenderer6.cellRenderer,
        cellRendererParams = _createCellRenderer6.cellRendererParams;

    var _renderHelper6 = renderHelper({ cellRenderer: cellRenderer }),
        getRowHeight = _renderHelper6.getRowHeight;

    expect(cellRendererParams).toEqual([]);
    getRowHeight({ index: 0 });
    getRowHeight({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 1, rowIndex: 1 }]);

    getRowHeight({ index: 0 });
    getRowHeight({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 1, rowIndex: 1 }]);
  });

  it('should reset all cached measurements when resetMeasurements() is called', function () {
    var _createCellRenderer7 = createCellRenderer(),
        cellRenderer = _createCellRenderer7.cellRenderer,
        cellRendererParams = _createCellRenderer7.cellRendererParams;

    var _renderHelper7 = renderHelper({ cellRenderer: cellRenderer }),
        getRowHeight = _renderHelper7.getRowHeight,
        resetMeasurements = _renderHelper7.resetMeasurements;

    expect(cellRendererParams).toEqual([]);
    getRowHeight({ index: 0 });
    getRowHeight({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 1, rowIndex: 1 }]);

    resetMeasurements();

    getRowHeight({ index: 0 });
    getRowHeight({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 1, rowIndex: 1 }, { columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 1, rowIndex: 1 }]);
  });

  it('should reset a specific cached row measurement when resetMeasurementForColumn() is called', function () {
    var _createCellRenderer8 = createCellRenderer(),
        cellRenderer = _createCellRenderer8.cellRenderer,
        cellRendererParams = _createCellRenderer8.cellRendererParams;

    var _renderHelper8 = renderHelper({ cellRenderer: cellRenderer }),
        getColumnWidth = _renderHelper8.getColumnWidth,
        resetMeasurementForColumn = _renderHelper8.resetMeasurementForColumn;

    expect(cellRendererParams).toEqual([]);
    getColumnWidth({ index: 0 });
    getColumnWidth({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 1, index: 0, rowIndex: 0 }]);

    resetMeasurementForColumn(0);

    getColumnWidth({ index: 0 });
    getColumnWidth({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 1, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 0, rowIndex: 0 }]);
  });

  it('should reset a specific cached row measurement when resetMeasurementForRow() is called', function () {
    var _createCellRenderer9 = createCellRenderer(),
        cellRenderer = _createCellRenderer9.cellRenderer,
        cellRendererParams = _createCellRenderer9.cellRendererParams;

    var _renderHelper9 = renderHelper({ cellRenderer: cellRenderer }),
        getRowHeight = _renderHelper9.getRowHeight,
        resetMeasurementForRow = _renderHelper9.resetMeasurementForRow;

    expect(cellRendererParams).toEqual([]);
    getRowHeight({ index: 0 });
    getRowHeight({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 1, rowIndex: 1 }]);

    resetMeasurementForRow(0);

    getRowHeight({ index: 0 });
    getRowHeight({ index: 1 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }, { columnIndex: 0, index: 1, rowIndex: 1 }, { columnIndex: 0, index: 0, rowIndex: 0 }]);
  });

  it('should allow a custom caching strategy to be specified', function () {
    var customCellSizeCache = new CellSizeCache();

    var _createCellRenderer10 = createCellRenderer(),
        cellRenderer = _createCellRenderer10.cellRenderer,
        cellRendererParams = _createCellRenderer10.cellRendererParams;

    var _renderHelper10 = renderHelper({
      cellRenderer: cellRenderer,
      cellSizeCache: customCellSizeCache,
      columnCount: 5,
      columnWidth: 200,
      rowCount: 2,
      rowHeight: 50
    }),
        getColumnWidth = _renderHelper10.getColumnWidth,
        getRowHeight = _renderHelper10.getRowHeight;

    expect(customCellSizeCache.getColumnWidth(0)).toEqual(undefined);
    expect(cellRendererParams.length).toEqual(0);
    expect(getColumnWidth({ index: 0 })).toEqual(200);
    expect(customCellSizeCache.getColumnWidth(0)).toEqual(200);
    expect(cellRendererParams.length).toEqual(2);
    expect(getColumnWidth({ index: 0 })).toEqual(200);
    expect(cellRendererParams.length).toEqual(2);

    expect(customCellSizeCache.getRowHeight(0)).toEqual(undefined);
    expect(cellRendererParams.length).toEqual(2);
    expect(getRowHeight({ index: 0 })).toEqual(50);
    expect(customCellSizeCache.getRowHeight(0)).toEqual(50);
    expect(cellRendererParams.length).toEqual(7);
    expect(getRowHeight({ index: 0 })).toEqual(50);
    expect(cellRendererParams.length).toEqual(7);
  });

  it('should support changing the custom caching strategy after initialization', function () {
    var customCellSizeCacheA = new CellSizeCache();
    var customCellSizeCacheB = new CellSizeCache();

    var _createCellRenderer11 = createCellRenderer(),
        cellRenderer = _createCellRenderer11.cellRenderer;

    var _renderHelper11 = renderHelper({
      cellRenderer: cellRenderer,
      cellSizeCache: customCellSizeCacheA,
      columnCount: 5,
      columnWidth: 200
    }),
        getColumnWidthA = _renderHelper11.getColumnWidth;

    expect(customCellSizeCacheA.getColumnWidth(0)).toEqual(undefined);
    expect(getColumnWidthA({ index: 0 })).toEqual(200);
    expect(customCellSizeCacheA.getColumnWidth(0)).toEqual(200);

    var _renderHelper12 = renderHelper({
      cellRenderer: cellRenderer,
      cellSizeCache: customCellSizeCacheA,
      columnCount: 5,
      columnWidth: 100
    }),
        getColumnWidthB = _renderHelper12.getColumnWidth;

    expect(customCellSizeCacheA.getColumnWidth(0)).toEqual(200);
    expect(getColumnWidthB({ index: 0 })).toEqual(200);
    expect(customCellSizeCacheA.getColumnWidth(0)).toEqual(200);

    var _renderHelper13 = renderHelper({
      cellRenderer: cellRenderer,
      cellSizeCache: customCellSizeCacheB,
      columnCount: 5,
      columnWidth: 50
    }),
        getColumnWidthC = _renderHelper13.getColumnWidth;

    expect(customCellSizeCacheB.getColumnWidth(0)).toEqual(undefined);
    expect(getColumnWidthC({ index: 0 })).toEqual(50);
    expect(customCellSizeCacheB.getColumnWidth(0)).toEqual(50);
  });

  it('should calculate row height just once when using the alternative uniform-size cell size cache', function () {
    var cellSizeCache = new CellSizeCache({
      uniformRowHeight: true
    });

    var _createCellRenderer12 = createCellRenderer(),
        cellRenderer = _createCellRenderer12.cellRenderer,
        cellRendererParams = _createCellRenderer12.cellRendererParams;

    var _renderHelper14 = renderHelper({
      cellRenderer: cellRenderer,
      cellSizeCache: cellSizeCache,
      rowCount: 5
    }),
        getRowHeight = _renderHelper14.getRowHeight;

    expect(cellRendererParams).toEqual([]);
    var height1 = getRowHeight({ index: 0 });
    var height2 = getRowHeight({ index: 1 });
    var height3 = getRowHeight({ index: 0 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }]);

    var expectedHeight = HEIGHTS[0];

    expect(height1).toEqual(expectedHeight);
    expect(height2).toEqual(expectedHeight);
    expect(height3).toEqual(expectedHeight);
  });

  it('should calculate column-width just once when using the alternative uniform-size cell size cache', function () {
    var cellSizeCache = new CellSizeCache({
      uniformColumnWidth: true
    });

    var _createCellRenderer13 = createCellRenderer(),
        cellRenderer = _createCellRenderer13.cellRenderer,
        cellRendererParams = _createCellRenderer13.cellRendererParams;

    var _renderHelper15 = renderHelper({
      cellRenderer: cellRenderer,
      cellSizeCache: cellSizeCache,
      columnCount: 5
    }),
        getColumnWidth = _renderHelper15.getColumnWidth;

    expect(cellRendererParams).toEqual([]);
    var width1 = getColumnWidth({ index: 0 });
    var width2 = getColumnWidth({ index: 1 });
    var width3 = getColumnWidth({ index: 0 });
    expect(cellRendererParams).toEqual([{ columnIndex: 0, index: 0, rowIndex: 0 }]);

    var expectedWidth = WIDTHS[0];

    expect(width1).toEqual(expectedWidth);
    expect(width2).toEqual(expectedWidth);
    expect(width3).toEqual(expectedWidth);
  });
});