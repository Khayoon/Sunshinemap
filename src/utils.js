"use strict";
exports.__esModule = true;
exports.getPixelIndexForCoordinates = exports.getColorForSunshine = void 0;
function getColorForSunshine(sunshine, colorMap) {
    var roundedSunshine = Math.floor(sunshine / 100) * 100;
    return colorMap[roundedSunshine] || colorMap[600];
}
exports.getColorForSunshine = getColorForSunshine;
function getPixelIndexForCoordinates(lat, lon, width) {
    var x = Math.floor((lon + 180) * (width / 360));
    var y = Math.floor((90 - lat) * (width / 180));
    return (y * width + x) * 3;
}
exports.getPixelIndexForCoordinates = getPixelIndexForCoordinates;
