/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Dependencies
const { PixelUtil } = require('pixel-util');
const apngCanvasParser = require('apng-canvas-parser');

class PixelPng extends PixelUtil {
  parse(file) {
    return this.createBuffer(file)
      .then(buffer => apngCanvasParser(buffer))
      .then(function(images) {
        if (images.numPlays == null) {
          images.numPlays = -1;
        }

        return images;
      });
  }
}

module.exports = new PixelPng();
module.exports.PixelPng = PixelPng;
