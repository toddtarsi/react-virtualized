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
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */
var ScrollSync = function (_Component) {
  _inherits(ScrollSync, _Component);

  function ScrollSync(props, context) {
    _classCallCheck(this, ScrollSync);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    };

    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }

  ScrollSync.prototype.render = function render() {
    var children = this.props.children;
    var _state = this.state,
        clientHeight = _state.clientHeight,
        clientWidth = _state.clientWidth,
        scrollHeight = _state.scrollHeight,
        scrollLeft = _state.scrollLeft,
        scrollTop = _state.scrollTop,
        scrollWidth = _state.scrollWidth;


    return children({
      clientHeight: clientHeight,
      clientWidth: clientWidth,
      onScroll: this._onScroll,
      scrollHeight: scrollHeight,
      scrollLeft: scrollLeft,
      scrollTop: scrollTop,
      scrollWidth: scrollWidth
    });
  };

  ScrollSync.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
  };

  ScrollSync.prototype._onScroll = function _onScroll(_ref) {
    var clientHeight = _ref.clientHeight,
        clientWidth = _ref.clientWidth,
        scrollHeight = _ref.scrollHeight,
        scrollLeft = _ref.scrollLeft,
        scrollTop = _ref.scrollTop,
        scrollWidth = _ref.scrollWidth;

    this.setState({ clientHeight: clientHeight, clientWidth: clientWidth, scrollHeight: scrollHeight, scrollLeft: scrollLeft, scrollTop: scrollTop, scrollWidth: scrollWidth });
  };

  return ScrollSync;
}(_react.Component);

exports.default = ScrollSync;
process.env.NODE_ENV !== "production" ? ScrollSync.propTypes = {
  /**
   * Function responsible for rendering 2 or more virtualized components.
   * This function should implement the following signature:
   * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired
} : void 0;