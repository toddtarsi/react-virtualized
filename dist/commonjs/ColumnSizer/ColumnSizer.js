'use strict';

exports.__esModule = true;

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * High-order component that auto-calculates column-widths for `Grid` cells.
 */
var ColumnSizer = function (_Component) {
  _inherits(ColumnSizer, _Component);

  function ColumnSizer(props, context) {
    _classCallCheck(this, ColumnSizer);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  ColumnSizer.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _props = this.props,
        columnMaxWidth = _props.columnMaxWidth,
        columnMinWidth = _props.columnMinWidth,
        columnCount = _props.columnCount,
        width = _props.width;


    if (columnMaxWidth !== prevProps.columnMaxWidth || columnMinWidth !== prevProps.columnMinWidth || columnCount !== prevProps.columnCount || width !== prevProps.width) {
      if (this._registeredChild) {
        this._registeredChild.recomputeGridSize();
      }
    }
  };

  ColumnSizer.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        columnMaxWidth = _props2.columnMaxWidth,
        columnMinWidth = _props2.columnMinWidth,
        columnCount = _props2.columnCount,
        width = _props2.width;


    var safeColumnMinWidth = columnMinWidth || 1;

    var safeColumnMaxWidth = columnMaxWidth ? Math.min(columnMaxWidth, width) : width;

    var columnWidth = width / columnCount;
    columnWidth = Math.max(safeColumnMinWidth, columnWidth);
    columnWidth = Math.min(safeColumnMaxWidth, columnWidth);
    columnWidth = Math.floor(columnWidth);

    var adjustedWidth = Math.min(width, columnWidth * columnCount);

    return children({
      adjustedWidth: adjustedWidth,
      getColumnWidth: function getColumnWidth() {
        return columnWidth;
      },
      registerChild: this._registerChild
    });
  };

  ColumnSizer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
  };

  ColumnSizer.prototype._registerChild = function _registerChild(child) {
    if (child && typeof child.recomputeGridSize !== 'function') {
      throw Error('Unexpected child type registered; only Grid/MultiGrid children are supported.');
    }

    this._registeredChild = child;

    if (this._registeredChild) {
      this._registeredChild.recomputeGridSize();
    }
  };

  return ColumnSizer;
}(_react.Component);

exports.default = ColumnSizer;
process.env.NODE_ENV !== "production" ? ColumnSizer.propTypes = {
  /**
   * Function responsible for rendering a virtualized Grid.
   * This function should implement the following signature:
   * ({ adjustedWidth, getColumnWidth, registerChild }) => PropTypes.element
   *
   * The specified :getColumnWidth function should be passed to the Grid's :columnWidth property.
   * The :registerChild should be passed to the Grid's :ref property.
   * The :adjustedWidth property is optional; it reflects the lesser of the overall width or the width of all columns.
   */
  children: _react.PropTypes.func.isRequired,

  /** Optional maximum allowed column width */
  columnMaxWidth: _react.PropTypes.number,

  /** Optional minimum allowed column width */
  columnMinWidth: _react.PropTypes.number,

  /** Number of columns in Grid or Table child */
  columnCount: _react.PropTypes.number.isRequired,

  /** Width of Grid or Table child */
  width: _react.PropTypes.number.isRequired
} : void 0;