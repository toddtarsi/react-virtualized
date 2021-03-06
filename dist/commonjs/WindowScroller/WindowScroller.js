'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _onScroll = require('./utils/onScroll');

var _dimensions = require('./utils/dimensions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WindowScroller = function (_Component) {
  _inherits(WindowScroller, _Component);

  function WindowScroller(props) {
    _classCallCheck(this, WindowScroller);

    // Handle server-side rendering case
    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var height = typeof window !== 'undefined' ? (0, _dimensions.getHeight)(props.scrollElement || window) : 0;

    _this.state = {
      height: height,
      isScrolling: false,
      scrollTop: 0
    };

    _this._onResize = _this._onResize.bind(_this);
    _this.__handleWindowScrollEvent = _this.__handleWindowScrollEvent.bind(_this);
    _this.__resetIsScrolling = _this.__resetIsScrolling.bind(_this);
    return _this;
  }

  // Can’t use defaultProps for scrollElement without breaking server-side rendering


  WindowScroller.prototype.updatePosition = function updatePosition(scrollElement) {
    var onResize = this.props.onResize;
    var height = this.state.height;


    scrollElement = scrollElement || this.props.scrollElement || window;
    this._positionFromTop = (0, _dimensions.getPositionFromTop)(_reactDom2.default.findDOMNode(this), scrollElement);

    var newHeight = (0, _dimensions.getHeight)(scrollElement);
    if (height !== newHeight) {
      this.setState({
        height: newHeight
      });
      onResize({
        height: newHeight
      });
    }
  };

  WindowScroller.prototype.componentDidMount = function componentDidMount() {
    var scrollElement = this.props.scrollElement || window;

    this.updatePosition(scrollElement);

    (0, _onScroll.registerScrollListener)(this, scrollElement);

    window.addEventListener('resize', this._onResize, false);
  };

  WindowScroller.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var scrollElement = this.props.scrollElement || window;
    var nextScrollElement = nextProps.scrollElement || window;

    if (scrollElement !== nextScrollElement) {
      this.updatePosition(nextScrollElement);

      (0, _onScroll.unregisterScrollListener)(this, scrollElement);
      (0, _onScroll.registerScrollListener)(this, nextScrollElement);
    }
  };

  WindowScroller.prototype.componentWillUnmount = function componentWillUnmount() {
    (0, _onScroll.unregisterScrollListener)(this, this.props.scrollElement || window);

    window.removeEventListener('resize', this._onResize, false);
  };

  WindowScroller.prototype.render = function render() {
    var children = this.props.children;
    var _state = this.state,
        isScrolling = _state.isScrolling,
        scrollTop = _state.scrollTop,
        height = _state.height;


    return children({
      height: height,
      isScrolling: isScrolling,
      scrollTop: scrollTop
    });
  };

  WindowScroller.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
  };

  WindowScroller.prototype._onResize = function _onResize(event) {
    this.updatePosition();
  };

  // Referenced by utils/onScroll


  WindowScroller.prototype.__handleWindowScrollEvent = function __handleWindowScrollEvent(event) {
    var onScroll = this.props.onScroll;


    var scrollElement = this.props.scrollElement || window;
    var scrollTop = Math.max(0, (0, _dimensions.getScrollTop)(scrollElement) - this._positionFromTop);

    this.setState({
      isScrolling: true,
      scrollTop: scrollTop
    });

    onScroll({
      scrollTop: scrollTop
    });
  };

  // Referenced by utils/onScroll


  WindowScroller.prototype.__resetIsScrolling = function __resetIsScrolling() {
    this.setState({
      isScrolling: false
    });
  };

  _createClass(WindowScroller, [{
    key: 'scrollElement',
    get: function get() {
      return this.props.scrollElement || window;
    }
  }]);

  return WindowScroller;
}(_react.Component);

WindowScroller.defaultProps = {
  onResize: function onResize() {},
  onScroll: function onScroll() {}
};
exports.default = WindowScroller;
process.env.NODE_ENV !== "production" ? WindowScroller.propTypes = {
  /**
   * Function responsible for rendering children.
   * This function should implement the following signature:
   * ({ height, isScrolling, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-resize: ({ height }) */
  onResize: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-scroll: ({ scrollTop }) */
  onScroll: _react.PropTypes.func.isRequired,

  /** Element to attach scroll event listeners. Defaults to window. */
  scrollElement: _react.PropTypes.any
} : void 0;