/* tslint:disable */
(function () {
  if (Array.prototype.fill) return;

  var fill = function (value) {
    // Steps 1-2.
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    // Step 11.
    var last = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 12.
    while (k < last) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  };

  if (Object.defineProperty) {
    try {
      Object.defineProperty(Array.prototype, 'fill', {
        value: fill,
        configurable: true,
        enumerable: false,
        writable: true
      });
    } catch(e) {}
  }

  if (!Array.prototype.fill) {
    Array.prototype.fill = fill;
  }
})();
