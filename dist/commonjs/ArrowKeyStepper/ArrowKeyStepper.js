'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This HOC decorates a virtualized component and responds to arrow-key events by scrolling one row or column at a time.
 */
var ArrowKeyStepper = function (_Component) {
  _inherits(ArrowKeyStepper, _Component);

  function ArrowKeyStepper(props, context) {
    _classCallCheck(this, ArrowKeyStepper);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.state = {
      scrollToColumn: props.scrollToColumn,
      scrollToRow: props.scrollToRow
    };

    _this._columnStartIndex = 0;
    _this._columnStopIndex = 0;
    _this._rowStartIndex = 0;
    _this._rowStopIndex = 0;

    _this._onKeyDown = _this._onKeyDown.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  ArrowKeyStepper.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var scrollToColumn = nextProps.scrollToColumn,
        scrollToRow = nextProps.scrollToRow;


    if (this.props.scrollToColumn !== scrollToColumn) {
      this.setState({ scrollToColumn: scrollToColumn });
    }

    if (this.props.scrollToRow !== scrollToRow) {
      this.setState({ scrollToRow: scrollToRow });
    }
  };

  ArrowKeyStepper.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children;
    var _state = this.state,
        scrollToColumn = _state.scrollToColumn,
        scrollToRow = _state.scrollToRow;


    return _react2.default.createElement(
      'div',
      {
        className: className,
        onKeyDown: this._onKeyDown
      },
      children({
        onSectionRendered: this._onSectionRendered,
        scrollToColumn: scrollToColumn,
        scrollToRow: scrollToRow
      })
    );
  };

  ArrowKeyStepper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
  };

  ArrowKeyStepper.prototype._onKeyDown = function _onKeyDown(event) {
    var _props2 = this.props,
        columnCount = _props2.columnCount,
        disabled = _props2.disabled,
        mode = _props2.mode,
        rowCount = _props2.rowCount;


    if (disabled) {
      return;
    }

    var _state2 = this.state,
        scrollToColumnPrevious = _state2.scrollToColumn,
        scrollToRowPrevious = _state2.scrollToRow;
    var _state3 = this.state,
        scrollToColumn = _state3.scrollToColumn,
        scrollToRow = _state3.scrollToRow;

    // The above cases all prevent default event event behavior.
    // This is to keep the grid from scrolling after the snap-to update.

    switch (event.key) {
      case 'ArrowDown':
        scrollToRow = mode === 'cells' ? Math.min(scrollToRow + 1, rowCount - 1) : Math.min(this._rowStopIndex + 1, rowCount - 1);
        break;
      case 'ArrowLeft':
        scrollToColumn = mode === 'cells' ? Math.max(scrollToColumn - 1, 0) : Math.max(this._columnStartIndex - 1, 0);
        break;
      case 'ArrowRight':
        scrollToColumn = mode === 'cells' ? Math.min(scrollToColumn + 1, columnCount - 1) : Math.min(this._columnStopIndex + 1, columnCount - 1);
        break;
      case 'ArrowUp':
        scrollToRow = mode === 'cells' ? Math.max(scrollToRow - 1, 0) : Math.max(this._rowStartIndex - 1, 0);
        break;
    }

    if (scrollToColumn !== scrollToColumnPrevious || scrollToRow !== scrollToRowPrevious) {
      event.preventDefault();

      this.setState({ scrollToColumn: scrollToColumn, scrollToRow: scrollToRow });
    }
  };

  ArrowKeyStepper.prototype._onSectionRendered = function _onSectionRendered(_ref) {
    var columnStartIndex = _ref.columnStartIndex,
        columnStopIndex = _ref.columnStopIndex,
        rowStartIndex = _ref.rowStartIndex,
        rowStopIndex = _ref.rowStopIndex;

    this._columnStartIndex = columnStartIndex;
    this._columnStopIndex = columnStopIndex;
    this._rowStartIndex = rowStartIndex;
    this._rowStopIndex = rowStopIndex;
  };

  return ArrowKeyStepper;
}(_react.Component);

ArrowKeyStepper.defaultProps = {
  disabled: false,
  mode: 'edges',
  scrollToColumn: 0,
  scrollToRow: 0
};
exports.default = ArrowKeyStepper;
process.env.NODE_ENV !== "production" ? ArrowKeyStepper.propTypes = {
  children: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  columnCount: _react.PropTypes.number.isRequired,
  disabled: _react.PropTypes.bool.isRequired,
  mode: _react.PropTypes.oneOf(['cells', 'edges']),
  rowCount: _react.PropTypes.number.isRequired,
  scrollToColumn: _react.PropTypes.number.isRequired,
  scrollToRow: _react.PropTypes.number.isRequired
} : void 0;