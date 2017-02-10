'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A section of the Window.
 * Window Sections are used to group nearby cells.
 * This enables us to more quickly determine which cells to display in a given region of the Window.
 * Sections have a fixed size and contain 0 to many cells (tracked by their indices).
 */
var Section = function () {
  function Section(_ref) {
    var height = _ref.height,
        width = _ref.width,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, Section);

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this._indexMap = {};
    this._indices = [];
  }

  /** Add a cell to this section. */


  Section.prototype.addCellIndex = function addCellIndex(_ref2) {
    var index = _ref2.index;

    if (!this._indexMap[index]) {
      this._indexMap[index] = true;
      this._indices.push(index);
    }
  };

  /** Get all cell indices that have been added to this section. */


  Section.prototype.getCellIndices = function getCellIndices() {
    return this._indices;
  };

  /** Intended for debugger/test purposes only */


  Section.prototype.toString = function toString() {
    return this.x + ',' + this.y + ' ' + this.width + 'x' + this.height;
  };

  return Section;
}(); /** @rlow */


exports.default = Section;