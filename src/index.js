/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Dependencies
import {PixelUtil} from 'react-native-pixel-util';
import parseAPNG, {isNotAPNG} from 'apng-js-no-blob';
import {PNG} from 'react-native-png-stream-browserify';
import ImageData from '@canvas/image-data';

class PixelPng extends PixelUtil {
  parse(file) {
    return this.createBuffer(file).then(async buffer => {
      const apng = await parseAPNG(buffer);
      if (apng instanceof Error && isNotAPNG(apng)) {
        const png = PNG.sync.read(buffer);
        const imageData = new ImageData(new Uint8ClampedArray(png.data), png.width, png.height);
        for (var key in png) {
          if (key === 'width' || key === 'height' || key === 'data' || key === 'colorSpace') {
            continue;
          }
          imageData[key] = png[key];
        }

        return [imageData];
      } else {
        const result = [];
        const width = apng.width;
        const height = apng.height;
        let gifNeedsDisposal = false;

        for (let i = 0; i < apng.frames.length; i++) {
          const frame = apng.frames[i];
          const pngImage = frame.imageData; // named frame.imageData but actually type is PNG (not animated) not decoded
          const png = PNG.sync.read(Buffer.from(pngImage));
          const patch = png.data; // type is ImageData.data decoded from PNG (not animated)
          const patchLeft = frame.left;
          const patchTop = frame.top;
          const patchWidth = frame.width;
          const patchHeight = frame.height;
          let index;

          let imageData;
          if (patchWidth === width && patchHeight === height) {
          // if (i === 0) {
            imageData = new ImageData(new Uint8ClampedArray(patch), width, height);
          } else if (i > 0) {
            imageData = new ImageData(new Uint8ClampedArray(result[i - 1].data), width, height);

            // ref to https://github.com/flyskywhy/gifuct-js/blob/2.2.2/src/index.js#L102
            if (gifNeedsDisposal) {
              for (let y = 0; y < patchHeight; y++) {
                for (let x = 0; x < patchWidth; x++) {
                  let op = (((y + patchTop) * width) + x + patchLeft) * 4;
                  imageData.data[op++] = 0;
                  imageData.data[op++] = 0;
                  imageData.data[op++] = 0;
                  imageData.data[op] = 0;
                }
              }
              gifNeedsDisposal = false;
            }
            if (frame.disposeOp === 2) {
              gifNeedsDisposal = true;
            }

            for (let y = 0; y < patchHeight; y++) {
              for (let x = 0; x < patchWidth; x++) {
                index = (y * patchWidth + x) * 4;
                if (patch[index + 3] > 0) {
                  let op = (((y + patchTop) * width) + x + patchLeft) * 4;
                  imageData.data[op++] = patch[index++];
                  imageData.data[op++] = patch[index++];
                  imageData.data[op++] = patch[index++];
                  imageData.data[op] = patch[index];
                }
              }
            }
          }

          imageData.left = 0;
          imageData.top = 0;
          imageData.disposeOp = frame.disposeOp;
          imageData.blendOp = frame.blendOp;
          imageData.delay = frame.delay;

          imageData.alpha = png.alpha;
          imageData.bpp = png.bpp;
          imageData.color = png.color;
          imageData.colorType = png.colorType;
          imageData.depth = png.depth;
          imageData.gamma = png.gamma;
          imageData.interlace = png.interlace;

          if (imageData.hasOwnProperty('delay')) {
            imageData.delay = imageData.delay * 10;
          } else {
            imageData.delay = 100; // ms
          }

          result.push(imageData);
        }

        result.playTime = apng.playTime;
        result.numPlays = apng.numPlays;

        if (result.numPlays == null) {
          result.numPlays = -1;
        }

        return result;
      }
    });
  }
}

export default new PixelPng();
export {PixelPng};
