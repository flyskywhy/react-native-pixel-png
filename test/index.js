/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Dependencies
const pixelPng = require('../src').default;
const fixture = require('fixture-images');

// Environment
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

// Specs
describe('pixel-png', () =>
  describe('.parse', function() {
    it('animated', function(done) {
      const file = fixture.animated.png;

      return pixelPng.parse(file).then(function(images) {
        expect(images.numPlays).toBe(0);
        expect(images.length).toBe(34);

        const image = images[0];
        expect(image.width).toBe(73);
        expect(image.height).toBe(73);
        expect(image.data.length).toBe(image.width * image.height * 4);

        return done();
      });
    });

    return it('static', function(done) {
      const file = fixture.still.png;

      return pixelPng.parse(file).then(function(images) {
        expect(images.numPlays).toBe(-1);

        const image = images[0];
        expect(image.width).toBe(96);
        expect(image.height).toBe(96);
        expect(image.data.length).toBe(image.width * image.height * 4);

        return done();
      });
    });
  }));
