# react-native-pixel-png

[![npm version](http://img.shields.io/npm/v/react-native-pixel-png.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-png "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-native-pixel-png.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-png "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-native-pixel-png.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-png "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android%20%7C%20web-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-png "View this project on npm")

> Parse PNG or APNG (Animated PNG) to ImageData for React Native.

## Installation
```bash
$ npm install react-native-pixel-png
```
For RN >= 0.65, run `npm install react-native-blob-util`.

For RN < 0.65, run `npm install react-native-blob-util@0.16.3`, and patch manually to [fix: with react-native-web product build will export 'URIUtil' (reexported as 'URIUtil') was not found](https://github.com/RonRadtke/react-native-blob-util/pull/201/files).
```js
var pixelPng= require('react-native-pixel-png');
console.log(pixelPng); //function
```

# API

## pixelPng.parse(`file`) -> promise.then(`images`)

return `images` is Array contains one or more `ImageData`.

```js
var file= 'https://59naga.github.io/fixtures/animated.PNG';

pixelPng.parse(file).then(function(images){
  var i= 0;

  console.log(images.numPlays); // 0(Infinite)
  console.log(images.playTime); // 1600

  var nextImage= function(){
    var imageData= images[i++];
    if(imageData==null) return;

    console.log(imageData);
    nextImage();
  }

  nextImage();
});
// { width: 73, height: 73, left: 0, top: 0, delay: 1000, disposeOp: 0, blendOp: 0, interlace: false, alpha: true, bpp: 1, color: true, colorType: 3, depth: 8, gamma: 0, height: 57, interlace: false, data: <Uint8Array ..> }
// { width: 73, height: 73, left: 0, top: 0, delay: 900, disposeOp: 0, blendOp: 0, interlace: false, alpha: true, bpp: 1, color: true, colorType: 3, depth: 8, gamma: 0, height: 57, interlace: false, data: <Uint8Array ..> }
// { width: 73, height: 73, left: 0, top: 0, delay: 800, disposeOp: 0, blendOp: 0, interlace: false, alpha: true, bpp: 1, color: true, colorType: 3, depth: 8, gamma: 0, height: 57, interlace: false, data: <Uint8Array ..> }
// ...
// If not animated png, will be
// [{width: 35, height: 35, alpha: true, bpp: 4, color: true, colorType: 6, depth: 8, gamma: 0, interlace: false, palette: false, data: <Uint8Array ..>}]
```
> `images` can be resized and also keep property e.g. `delay` by `resizeImageDatas` of [react-native-pixel-util](https://github.com/flyskywhy/react-native-pixel-util).

# Related projects
* [react-native-pixel-image](https://github.com/flyskywhy/react-native-pixel-image)
* [react-native-pixel-util](https://github.com/flyskywhy/react-native-pixel-util)
* [react-native-pixel-gif](https://github.com/flyskywhy/react-native-pixel-gif)
* __react-native-pixel-png__
* [react-native-pixel-jpg](https://github.com/flyskywhy/react-native-pixel-jpg)
* [react-native-pixel-bmp](https://github.com/flyskywhy/react-native-pixel-bmp)
* [react-native-pixel-webp](https://github.com/flyskywhy/react-native-pixel-webp)
* [pixel-to-ansi](https://github.com/59naga/pixel-to-ansi)
* [pixel-to-svg](https://github.com/59naga/pixel-to-svg)

License
---
[MIT][License]

[License]: http://59naga.mit-license.org/
