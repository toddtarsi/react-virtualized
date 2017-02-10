"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default CellMeasurer `cellSizeCache` implementation.
 * Permanently caches all cell sizes (identified by column and row index) unless explicitly cleared.
 * Can be configured to handle uniform cell widths and/or heights as a way of optimizing certain use cases.
 */
var DefaultCellSizeCache = function () {
  function DefaultCellSizeCache() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$uniformRowHeight = _ref.uniformRowHeight,
        uniformRowHeight = _ref$uniformRowHeight === undefined ? false : _ref$uniformRowHeight,
        _ref$uniformColumnWid = _ref.uniformColumnWidth,
        uniformColumnWidth = _ref$uniformColumnWid === undefined ? false : _ref$uniformColumnWid;

    _classCallCheck(this, DefaultCellSizeCache);

    this._uniformRowHeight = uniformRowHeight;
    this._uniformColumnWidth = uniformColumnWidth;

    this._cachedColumnWidth = undefined;
    this._cachedRowHeight = undefined;

    this._cachedColumnWidths = {};
    this._cachedRowHeights = {};
  }

  DefaultCellSizeCache.prototype.clearAllColumnWidths = function clearAllColumnWidths() {
    this._cachedColumnWidth = undefined;
    this._cachedColumnWidths = {};
  };

  DefaultCellSizeCache.prototype.clearAllRowHeights = function clearAllRowHeights() {
    this._cachedRowHeight = undefined;
    this._cachedRowHeights = {};
  };

  DefaultCellSizeCache.prototype.clearColumnWidth = function clearColumnWidth(index) {
    this._cachedColumnWidth = undefined;

    delete this._cachedColumnWidths[index];
  };

  DefaultCellSizeCache.prototype.clearRowHeight = function clearRowHeight(index) {
    this._cachedRowHeight = undefined;

    delete this._cachedRowHeights[index];
  };

  DefaultCellSizeCache.prototype.getColumnWidth = function getColumnWidth(index) {
    return this._uniformColumnWidth ? this._cachedColumnWidth : this._cachedColumnWidths[index];
  };

  DefaultCellSizeCache.prototype.getRowHeight = function getRowHeight(index) {
    return this._uniformRowHeight ? this._cachedRowHeight : this._cachedRowHeights[index];
  };

  DefaultCellSizeCache.prototype.setColumnWidth = function setColumnWidth(index, width) {
    this._cachedColumnWidth = width;
    this._cachedColumnWidths[index] = width;
  };

  DefaultCellSizeCache.prototype.setRowHeight = function setRowHeight(index, height) {
    this._cachedRowHeight = height;
    this._cachedRowHeights[index] = height;
  };

  return DefaultCellSizeCache;
}();

exports.default = DefaultCellSizeCache;