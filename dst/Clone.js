"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clone = (function () {
  function Clone(source) {
    _classCallCheck(this, Clone);

    this.bufferSource = [];
    this.bufferTarget = [];
  }

  _createClass(Clone, [{
    key: "dup",
    value: function dup(source) {
      try {
        switch (true) {
          case source == null || typeof source != "object":
            return source;
          case source instanceof RegExp:
            return new RegExp(source);
          case source instanceof Date:
            return new Date(source);
          case source instanceof Array:
            return this.dupArray(source);
          case source instanceof Object:
            return this.dupObject(source);
        }
      } catch (e) {
        console.warn("JS.Clone: object " + source.constructor.name + " was not cloned");
        return source;
      }
    }
  }, {
    key: "duplicate",
    value: function duplicate(source, target, dupPropsMethod) {
      var index = this.bufferSource.indexOf(source);
      if (index >= 0) return this.bufferTarget[index];
      this.bufferSource.push(source);
      this.bufferTarget.push(target);
      this[dupPropsMethod](source, target);
      return target;
    }
  }, {
    key: "dupArray",
    value: function dupArray(source) {
      return this.duplicate(source, [], "dupArrayProps");
    }
  }, {
    key: "dupObject",
    value: function dupObject(source) {
      return this.duplicate(source, new source.constructor(), "dupObjectProps");
    }
  }, {
    key: "dupArrayProps",
    value: function dupArrayProps(source, target) {
      for (var i = 0, l = source.length; i < l; i++) {
        target[i] = this.dup(source[i]);
      }return target;
    }
  }, {
    key: "dupObjectProps",
    value: function dupObjectProps(source, target) {
      for (var attr in source) {
        if (source.hasOwnProperty(attr)) target[attr] = this.dup(source[attr]);
      }return target;
    }
  }]);

  return Clone;
})();

exports["default"] = function (source) {
  return new Clone().dup(source);
};

module.exports = exports["default"];
