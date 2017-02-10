'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders 1, 2, or 4 Grids depending on configuration.
 * A main (body) Grid will always be rendered.
 * Optionally, 1-2 Grids for sticky header rows will also be rendered.
 * If no sticky columns, only 1 sticky header Grid will be rendered.
 * If sticky columns, 2 sticky header Grids will be rendered.
 */
var MultiGrid = function (_Component) {
  _inherits(MultiGrid, _Component);

  function MultiGrid(props, context) {
    _classCallCheck(this, MultiGrid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.state = {
      scrollLeft: 0,
      scrollTop: 0
    };

    _this._bottomLeftGridRef = _this._bottomLeftGridRef.bind(_this);
    _this._bottomRightGridRef = _this._bottomRightGridRef.bind(_this);
    _this._cellRendererBottomLeftGrid = _this._cellRendererBottomLeftGrid.bind(_this);
    _this._cellRendererBottomRightGrid = _this._cellRendererBottomRightGrid.bind(_this);
    _this._cellRendererTopRightGrid = _this._cellRendererTopRightGrid.bind(_this);
    _this._columnWidthRightGrid = _this._columnWidthRightGrid.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._rowHeightBottomGrid = _this._rowHeightBottomGrid.bind(_this);
    _this._topLeftGridRef = _this._topLeftGridRef.bind(_this);
    _this._topRightGridRef = _this._topRightGridRef.bind(_this);
    return _this;
  }

  /** See Grid#measureAllCells */


  MultiGrid.prototype.measureAllCells = function measureAllCells() {
    this._bottomLeftGrid && this._bottomLeftGrid.measureAllCells();
    this._bottomRightGrid && this._bottomRightGrid.measureAllCells();
    this._topLeftGrid && this._topLeftGrid.measureAllCells();
    this._topRightGrid && this._topRightGrid.measureAllCells();
  };

  /** See issue #546 */


  MultiGrid.prototype.measureAllRows = function measureAllRows() {
    console.warn('MultiGrid measureAllRows() is deprecated; use measureAllCells() instead.');

    this.measureAllCells();
  };

  /** See Grid#recomputeGridSize */


  MultiGrid.prototype.recomputeGridSize = function recomputeGridSize() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$columnIndex = _ref.columnIndex,
        columnIndex = _ref$columnIndex === undefined ? 0 : _ref$columnIndex,
        _ref$rowIndex = _ref.rowIndex,
        rowIndex = _ref$rowIndex === undefined ? 0 : _ref$rowIndex;

    var _props = this.props,
        fixedColumnCount = _props.fixedColumnCount,
        fixedRowCount = _props.fixedRowCount;


    var adjustedColumnIndex = Math.max(0, columnIndex - fixedColumnCount);
    var adjustedRowIndex = Math.max(0, rowIndex - fixedRowCount);

    this._bottomLeftGrid && this._bottomLeftGrid.recomputeGridSize({
      columnIndex: columnIndex,
      rowIndex: adjustedRowIndex
    });
    this._bottomRightGrid && this._bottomRightGrid.recomputeGridSize({
      columnIndex: adjustedColumnIndex,
      rowIndex: adjustedRowIndex
    });
    this._topLeftGrid && this._topLeftGrid.recomputeGridSize({
      columnIndex: columnIndex,
      rowIndex: rowIndex
    });
    this._topRightGrid && this._topRightGrid.recomputeGridSize({
      columnIndex: adjustedColumnIndex,
      rowIndex: rowIndex
    });

    this._leftGridWidth = null;
    this._topGridHeight = null;
    this._maybeCalculateCachedStyles(null, this.props);
  };

  MultiGrid.prototype.componentWillMount = function componentWillMount() {
    this._maybeCalculateCachedStyles(null, this.props);
  };

  MultiGrid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props2 = this.props,
        columnWidth = _props2.columnWidth,
        fixedColumnCount = _props2.fixedColumnCount,
        fixedRowCount = _props2.fixedRowCount,
        rowHeight = _props2.rowHeight;


    if (columnWidth !== nextProps.columnWidth || fixedColumnCount !== nextProps.fixedColumnCount) {
      this._leftGridWidth = null;
    }

    if (fixedRowCount !== nextProps.fixedRowCount || rowHeight !== nextProps.rowHeight) {
      this._topGridHeight = null;
    }

    this._maybeCalculateCachedStyles(this.props, nextProps);
  };

  MultiGrid.prototype.render = function render() {
    var _props3 = this.props,
        onScroll = _props3.onScroll,
        onSectionRendered = _props3.onSectionRendered,
        scrollLeftProp = _props3.scrollLeft,
        scrollToColumn = _props3.scrollToColumn,
        scrollTopProp = _props3.scrollTop,
        scrollToRow = _props3.scrollToRow,
        rest = _objectWithoutProperties(_props3, ['onScroll', 'onSectionRendered', 'scrollLeft', 'scrollToColumn', 'scrollTop', 'scrollToRow']);

    // scrollTop and scrollToRow props are explicitly filtered out and ignored

    var _state = this.state,
        scrollLeft = _state.scrollLeft,
        scrollTop = _state.scrollTop;


    return _react2.default.createElement(
      'div',
      { style: this._containerOuterStyle },
      _react2.default.createElement(
        'div',
        { style: this._containerTopStyle },
        this._renderTopLeftGrid(rest),
        this._renderTopRightGrid(_extends({}, rest, {
          scrollLeft: scrollLeft
        }))
      ),
      _react2.default.createElement(
        'div',
        { style: this._containerBottomStyle },
        this._renderBottomLeftGrid(_extends({}, rest, {
          scrollTop: scrollTop
        })),
        this._renderBottomRightGrid(_extends({}, rest, {
          onScroll: onScroll,
          onSectionRendered: onSectionRendered,
          scrollLeft: scrollLeft,
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow,
          scrollTop: scrollTop
        }))
      )
    );
  };

  MultiGrid.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
  };

  MultiGrid.prototype._bottomLeftGridRef = function _bottomLeftGridRef(ref) {
    this._bottomLeftGrid = ref;
  };

  MultiGrid.prototype._bottomRightGridRef = function _bottomRightGridRef(ref) {
    this._bottomRightGrid = ref;
  };

  MultiGrid.prototype._cellRendererBottomLeftGrid = function _cellRendererBottomLeftGrid(_ref2) {
    var rowIndex = _ref2.rowIndex,
        rest = _objectWithoutProperties(_ref2, ['rowIndex']);

    var _props4 = this.props,
        cellRenderer = _props4.cellRenderer,
        fixedRowCount = _props4.fixedRowCount;


    return cellRenderer(_extends({}, rest, {
      rowIndex: rowIndex + fixedRowCount
    }));
  };

  MultiGrid.prototype._cellRendererBottomRightGrid = function _cellRendererBottomRightGrid(_ref3) {
    var columnIndex = _ref3.columnIndex,
        rowIndex = _ref3.rowIndex,
        rest = _objectWithoutProperties(_ref3, ['columnIndex', 'rowIndex']);

    var _props5 = this.props,
        cellRenderer = _props5.cellRenderer,
        fixedColumnCount = _props5.fixedColumnCount,
        fixedRowCount = _props5.fixedRowCount;


    return cellRenderer(_extends({}, rest, {
      columnIndex: columnIndex + fixedColumnCount,
      rowIndex: rowIndex + fixedRowCount
    }));
  };

  MultiGrid.prototype._cellRendererTopRightGrid = function _cellRendererTopRightGrid(_ref4) {
    var columnIndex = _ref4.columnIndex,
        rest = _objectWithoutProperties(_ref4, ['columnIndex']);

    var _props6 = this.props,
        cellRenderer = _props6.cellRenderer,
        fixedColumnCount = _props6.fixedColumnCount;


    return cellRenderer(_extends({}, rest, {
      columnIndex: columnIndex + fixedColumnCount
    }));
  };

  MultiGrid.prototype._columnWidthRightGrid = function _columnWidthRightGrid(_ref5) {
    var index = _ref5.index;
    var _props7 = this.props,
        fixedColumnCount = _props7.fixedColumnCount,
        columnWidth = _props7.columnWidth;


    return columnWidth instanceof Function ? columnWidth({ index: index + fixedColumnCount }) : columnWidth;
  };

  MultiGrid.prototype._getBottomGridHeight = function _getBottomGridHeight(props) {
    var height = props.height;


    var topGridHeight = this._getTopGridHeight(props);

    return height - topGridHeight;
  };

  MultiGrid.prototype._getLeftGridWidth = function _getLeftGridWidth(props) {
    var fixedColumnCount = props.fixedColumnCount,
        columnWidth = props.columnWidth;


    if (this._leftGridWidth == null) {
      if (columnWidth instanceof Function) {
        var leftGridWidth = 0;

        for (var index = 0; index < fixedColumnCount; index++) {
          leftGridWidth += columnWidth({ index: index });
        }

        this._leftGridWidth = leftGridWidth;
      } else {
        this._leftGridWidth = columnWidth * fixedColumnCount;
      }
    }

    return this._leftGridWidth;
  };

  MultiGrid.prototype._getRightGridWidth = function _getRightGridWidth(props) {
    var width = props.width;


    var leftGridWidth = this._getLeftGridWidth(props);

    return width - leftGridWidth;
  };

  MultiGrid.prototype._getTopGridHeight = function _getTopGridHeight(props) {
    var fixedRowCount = props.fixedRowCount,
        rowHeight = props.rowHeight;


    if (this._topGridHeight == null) {
      if (rowHeight instanceof Function) {
        var topGridHeight = 0;

        for (var index = 0; index < fixedRowCount; index++) {
          topGridHeight += rowHeight({ index: index });
        }

        this._topGridHeight = topGridHeight;
      } else {
        this._topGridHeight = rowHeight * fixedRowCount;
      }
    }

    return this._topGridHeight;
  };

  /**
   * Avoid recreating inline styles each render; this bypasses Grid's shallowCompare.
   * This method recalculates styles only when specific props change.
   */


  MultiGrid.prototype._maybeCalculateCachedStyles = function _maybeCalculateCachedStyles(prevProps, props) {
    var columnWidth = props.columnWidth,
        height = props.height,
        fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount,
        rowHeight = props.rowHeight,
        style = props.style,
        styleBottomLeftGrid = props.styleBottomLeftGrid,
        styleBottomRightGrid = props.styleBottomRightGrid,
        styleTopLeftGrid = props.styleTopLeftGrid,
        styleTopRightGrid = props.styleTopRightGrid,
        width = props.width;


    var firstRender = !prevProps;
    var sizeChange = firstRender || height !== prevProps.height || width !== prevProps.width;
    var leftSizeChange = firstRender || columnWidth !== prevProps.columnWidth || fixedColumnCount !== prevProps.fixedColumnCount;
    var topSizeChange = firstRender || fixedRowCount !== prevProps.fixedRowCount || rowHeight !== prevProps.rowHeight;

    if (firstRender || sizeChange || style !== prevProps.style) {
      this._containerOuterStyle = _extends({
        height: height,
        width: width
      }, style);
    }

    if (firstRender || sizeChange || topSizeChange) {
      this._containerTopStyle = {
        height: this._getTopGridHeight(props),
        position: 'relative',
        width: width
      };

      this._containerBottomStyle = {
        height: height - this._getTopGridHeight(props),
        overflow: 'hidden',
        position: 'relative',
        width: width
      };
    }

    if (firstRender || styleBottomLeftGrid !== prevProps.styleBottomLeftGrid) {
      this._bottomLeftGridStyle = _extends({
        left: 0,
        outline: 0,
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'absolute'
      }, styleBottomLeftGrid);
    }

    if (firstRender || leftSizeChange || styleBottomRightGrid !== prevProps.styleBottomRightGrid) {
      this._bottomRightGridStyle = _extends({
        left: this._getLeftGridWidth(props),
        outline: 0,
        position: 'absolute'
      }, styleBottomRightGrid);
    }

    if (firstRender || styleTopLeftGrid !== prevProps.styleTopLeftGrid) {
      this._topLeftGridStyle = _extends({
        left: 0,
        outline: 0,
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'absolute',
        top: 0
      }, styleTopLeftGrid);
    }

    if (firstRender || leftSizeChange || styleTopRightGrid !== prevProps.styleTopRightGrid) {
      this._topRightGridStyle = _extends({
        left: this._getLeftGridWidth(props),
        outline: 0,
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'absolute',
        top: 0
      }, styleTopRightGrid);
    }
  };

  MultiGrid.prototype._onScroll = function _onScroll(scrollInfo) {
    var scrollLeft = scrollInfo.scrollLeft,
        scrollTop = scrollInfo.scrollTop;

    this.setState({
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    });
    var onScroll = this.props.onScroll;
    if (onScroll) {
      onScroll(scrollInfo);
    }
  };

  MultiGrid.prototype._renderBottomLeftGrid = function _renderBottomLeftGrid(props) {
    var fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount,
        rowCount = props.rowCount,
        scrollTop = props.scrollTop;


    if (!fixedColumnCount) {
      return null;
    }

    return _react2.default.createElement(_Grid2.default, _extends({}, props, {
      cellRenderer: this._cellRendererBottomLeftGrid,
      columnCount: fixedColumnCount,
      height: this._getBottomGridHeight(props),
      ref: this._bottomLeftGridRef,
      rowCount: Math.max(0, rowCount - fixedRowCount),
      rowHeight: this._rowHeightBottomGrid,
      scrollTop: scrollTop,
      style: this._bottomLeftGridStyle,
      width: this._getLeftGridWidth(props)
    }));
  };

  MultiGrid.prototype._renderBottomRightGrid = function _renderBottomRightGrid(props) {
    var columnCount = props.columnCount,
        fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount,
        rowCount = props.rowCount,
        scrollToColumn = props.scrollToColumn,
        scrollToRow = props.scrollToRow;


    return _react2.default.createElement(_Grid2.default, _extends({}, props, {
      cellRenderer: this._cellRendererBottomRightGrid,
      columnCount: Math.max(0, columnCount - fixedColumnCount),
      columnWidth: this._columnWidthRightGrid,
      height: this._getBottomGridHeight(props),
      onScroll: this._onScroll,
      ref: this._bottomRightGridRef,
      rowCount: Math.max(0, rowCount - fixedRowCount),
      rowHeight: this._rowHeightBottomGrid,
      scrollToColumn: scrollToColumn - fixedColumnCount,
      scrollToRow: scrollToRow - fixedRowCount,
      style: this._bottomRightGridStyle,
      width: this._getRightGridWidth(props)
    }));
  };

  MultiGrid.prototype._renderTopLeftGrid = function _renderTopLeftGrid(props) {
    var fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount;


    if (!fixedColumnCount || !fixedRowCount) {
      return null;
    }

    return _react2.default.createElement(_Grid2.default, _extends({}, props, {
      columnCount: fixedColumnCount,
      height: this._getTopGridHeight(props),
      ref: this._topLeftGridRef,
      rowCount: fixedRowCount,
      style: this._topLeftGridStyle,
      width: this._getLeftGridWidth(props)
    }));
  };

  MultiGrid.prototype._renderTopRightGrid = function _renderTopRightGrid(props) {
    var columnCount = props.columnCount,
        fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount,
        scrollLeft = props.scrollLeft;


    if (!fixedRowCount) {
      return null;
    }

    return _react2.default.createElement(_Grid2.default, _extends({}, props, {
      cellRenderer: this._cellRendererTopRightGrid,
      columnCount: Math.max(0, columnCount - fixedColumnCount),
      columnWidth: this._columnWidthRightGrid,
      height: this._getTopGridHeight(props),
      ref: this._topRightGridRef,
      rowCount: fixedRowCount,
      scrollLeft: scrollLeft,
      style: this._topRightGridStyle,
      width: this._getRightGridWidth(props)
    }));
  };

  MultiGrid.prototype._rowHeightBottomGrid = function _rowHeightBottomGrid(_ref6) {
    var index = _ref6.index;
    var _props8 = this.props,
        fixedRowCount = _props8.fixedRowCount,
        rowHeight = _props8.rowHeight;


    return rowHeight instanceof Function ? rowHeight({ index: index + fixedRowCount }) : rowHeight;
  };

  MultiGrid.prototype._topLeftGridRef = function _topLeftGridRef(ref) {
    this._topLeftGrid = ref;
  };

  MultiGrid.prototype._topRightGridRef = function _topRightGridRef(ref) {
    this._topRightGrid = ref;
  };

  return MultiGrid;
}(_react.Component);

MultiGrid.defaultProps = {
  fixedColumnCount: 0,
  fixedRowCount: 0,
  style: {},
  styleBottomLeftGrid: {},
  styleBottomRightGrid: {},
  styleTopLeftGrid: {},
  styleTopRightGrid: {}
};
exports.default = MultiGrid;
process.env.NODE_ENV !== "production" ? MultiGrid.propTypes = {
  fixedColumnCount: _react.PropTypes.number.isRequired,
  fixedRowCount: _react.PropTypes.number.isRequired,
  style: _react.PropTypes.object.isRequired,
  styleBottomLeftGrid: _react.PropTypes.object.isRequired,
  styleBottomRightGrid: _react.PropTypes.object.isRequired,
  styleTopLeftGrid: _react.PropTypes.object.isRequired,
  styleTopRightGrid: _react.PropTypes.object.isRequired
} : void 0;