'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _TestUtils = require('../TestUtils');

var _MultiGrid = require('./MultiGrid');

var _MultiGrid2 = _interopRequireDefault(_MultiGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// These tests only focus on what MultiGrid does specifically.
// The inner Grid component is tested in depth elsewhere.
describe('MultiGrid', function () {
  function defaultCellRenderer(_ref) {
    var columnIndex = _ref.columnIndex,
        key = _ref.key,
        rowIndex = _ref.rowIndex,
        style = _ref.style;

    return _react2.default.createElement(
      'div',
      {
        className: 'gridItem',
        key: key,
        style: style
      },
      'row:' + rowIndex + ', column:' + columnIndex
    );
  }

  function getMarkup() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _react2.default.createElement(_MultiGrid2.default, _extends({
      cellRenderer: defaultCellRenderer,
      columnCount: 50,
      columnWidth: 50,
      fixedColumnCount: 2,
      fixedRowCount: 1,
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 0,
      autoHeight: false,
      rowHeight: 20,
      rowCount: 100,
      width: 400
    }, props));
  }

  describe('fixed columns and rows', function () {
    it('should render 4 Grids when configured for fixed columns and rows', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 1,
        fixedRowCount: 1
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(4);
      var topLeft = grids[0],
          topRight = grids[1],
          bottomLeft = grids[2],
          bottomRight = grids[3];

      expect(topLeft.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(topLeft.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(topRight.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(topRight.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomLeft.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(bottomLeft.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should render 2 Grids when configured for fixed columns only', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 1,
        fixedRowCount: 0
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(2);
      var bottomLeft = grids[0],
          bottomRight = grids[1];

      expect(bottomLeft.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(bottomLeft.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should render 2 Grids when configured for fixed rows only', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 1
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(2);
      var topRight = grids[0],
          bottomRight = grids[1];

      expect(topRight.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(topRight.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should render 1 Grid when configured for neither fixed columns and rows', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 0
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(1);
      var bottomRight = grids[0];

      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should adjust the number of Grids when fixed column or row counts change', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 2,
        fixedRowCount: 1
      })));
      expect(rendered.querySelectorAll('.ReactVirtualized__Grid').length).toEqual(4);
      rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 0
      })));
      expect(rendered.querySelectorAll('.ReactVirtualized__Grid').length).toEqual(1);
      rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 2
      })));
      expect(rendered.querySelectorAll('.ReactVirtualized__Grid').length).toEqual(2);
    });
  });

  describe('#recomputeGridSize', function () {
    it('should clear calculated cached styles in recomputeGridSize', function () {
      var fixedRowHeight = 75;
      var fixedColumnWidth = 100;

      function variableRowHeight(_ref2) {
        var index = _ref2.index;

        if (index === 0) {
          return fixedRowHeight;
        }
        return 20;
      }
      function variableColumnWidth(_ref3) {
        var index = _ref3.index;

        if (index === 0) {
          return fixedColumnWidth;
        }
        return 50;
      }

      var multiGrid = void 0;
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 1,
        fixedRowCount: 1,
        rowHeight: variableRowHeight,
        columnWidth: variableColumnWidth,
        ref: function ref(_ref4) {
          multiGrid = _ref4;
        }
      })));

      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(4);
      var topLeft = grids[0],
          topRight = grids[1],
          bottomLeft = grids[2],
          bottomRight = grids[3];

      expect(topLeft.style.getPropertyValue('height')).toEqual('75px');
      expect(topRight.style.getPropertyValue('height')).toEqual('75px');
      expect(bottomLeft.style.getPropertyValue('height')).toEqual('225px');
      expect(bottomRight.style.getPropertyValue('height')).toEqual('225px');

      expect(topLeft.style.getPropertyValue('width')).toEqual('100px');
      expect(topRight.style.getPropertyValue('width')).toEqual('300px');
      expect(bottomLeft.style.getPropertyValue('width')).toEqual('100px');
      expect(bottomRight.style.getPropertyValue('width')).toEqual('300px');

      expect(multiGrid._topGridHeight).toEqual(75);
      expect(multiGrid._leftGridWidth).toEqual(100);

      fixedRowHeight = 125;
      fixedColumnWidth = 75;
      multiGrid.recomputeGridSize();
      expect(multiGrid._topGridHeight).toEqual(125);
      expect(multiGrid._leftGridWidth).toEqual(75);

      multiGrid.forceUpdate();

      var gridsAfter = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(gridsAfter.length).toEqual(4);
      var topLeftAfter = gridsAfter[0],
          topRightAfter = gridsAfter[1],
          bottomLeftAfter = gridsAfter[2],
          bottomRightAfter = gridsAfter[3];

      expect(topLeftAfter.style.getPropertyValue('height')).toEqual('125px');
      expect(topRightAfter.style.getPropertyValue('height')).toEqual('125px');
      expect(bottomLeftAfter.style.getPropertyValue('height')).toEqual('175px');
      expect(bottomRightAfter.style.getPropertyValue('height')).toEqual('175px');

      expect(topLeftAfter.style.getPropertyValue('width')).toEqual('75px');
      expect(topRightAfter.style.getPropertyValue('width')).toEqual('325px');
      expect(bottomLeftAfter.style.getPropertyValue('width')).toEqual('75px');
      expect(bottomRightAfter.style.getPropertyValue('width')).toEqual('325px');
    });
  });

  describe('scrollToColumn and scrollToRow', function () {
    it('should adjust :scrollLeft for the main Grid when scrollToColumn is used', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        columnWidth: 50,
        fixedColumnCount: 2,
        scrollToAlignment: 'start',
        scrollToColumn: 19
      })));
      // Bottom-right Grid is the last Grid
      var grid = rendered.querySelectorAll('.ReactVirtualized__Grid')[3];
      // 20th column, less 2 for the fixed-column Grid, 50px column width
      expect(grid.scrollLeft).toEqual(850);
    });

    it('should adjust :scrollTop for the main Grid when scrollToRow is used', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedRowCount: 1,
        rowHeight: 50,
        scrollToAlignment: 'start',
        scrollToRow: 19
      })));
      // Bottom-right Grid is the last Grid
      var grid = rendered.querySelectorAll('.ReactVirtualized__Grid')[3];
      // 20th row, less 1 for the fixed-row Grid, 50px row width
      expect(grid.scrollTop).toEqual(900);
    });
  });

  describe('styles', function () {
    it('should support custom style for the outer MultiGrid wrapper element', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        style: { backgroundColor: 'black' }
      })));
      expect(rendered.style.backgroundColor).toEqual('black');
    });

    it('should support custom styles for each Grid', function () {
      var rendered = (0, _reactDom.findDOMNode)((0, _TestUtils.render)(getMarkup({
        fixedColumnCount: 2,
        fixedRowCount: 1,
        styleBottomLeftGrid: { backgroundColor: 'green' },
        styleBottomRightGrid: { backgroundColor: 'red' },
        styleTopLeftGrid: { backgroundColor: 'blue' },
        styleTopRightGrid: { backgroundColor: 'purple' }
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      var topLeftGrid = grids[0];
      var topRightGrid = grids[1];
      var bottomLeftGrid = grids[2];
      var bottomRightGrid = grids[3];
      expect(topLeftGrid.style.backgroundColor).toEqual('blue');
      expect(topRightGrid.style.backgroundColor).toEqual('purple');
      expect(bottomLeftGrid.style.backgroundColor).toEqual('green');
      expect(bottomRightGrid.style.backgroundColor).toEqual('red');
    });
  });
});