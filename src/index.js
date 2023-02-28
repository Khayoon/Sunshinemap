"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var fs_1 = require("fs");
var util_1 = require("util");
var writeFileAsync = (0, util_1.promisify)(fs_1["default"].writeFile);
var OPENWEATHER_API_KEY = 'your_api_key_here';
var COLOR_MAP = {
    600: { r: 0, g: 0, b: 255 },
    700: { r: 0, g: 128, b: 255 },
    800: { r: 0, g: 255, b: 255 },
    900: { r: 255, g: 255, b: 0 },
    1000: { r: 255, g: 0, b: 0 }
};
var LAT_MIN = -90;
var LAT_MAX = 90;
var LON_MIN = -180;
var LON_MAX = 180;
var IMAGE_WIDTH = 360 * 3; // three pixels per longitude degree
function getSunshineData(lat, lon) {
    return new Promise(function (resolve, reject) {
        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(841), f37fa44bb88dd90c0ae1706526539;
    },  & exclude, current, minutely, hourly, alerts(templateObject_1 || (templateObject_1 = __makeTemplateObject([";\n    https.get(url, (res) => {\n      let data = '';\n      res.on('data', (chunk) => {\n        data += chunk;\n      });\n      res.on('end', () => {\n        try {\n          const jsonData = JSON.parse(data);\n          const sunshine = jsonData.daily[0].sunshine;\n          const sunshineData: SunshineData = { lat, lon, sunshine };\n          resolve(sunshineData);\n        } catch (error) {\n          reject(error);\n        }\n      });\n    }).on('error', (error) => {\n      reject(error);\n    });\n  });\n}\n\nasync function generateSunshineMap() {\n  const image = new PNG({ width: IMAGE_WIDTH, height: 180 });\n  for (let lat = LAT_MIN; lat <= LAT_MAX; lat++) {\n    for (let lon = LON_MIN; lon <= LON_MAX; lon++) {\n      const sunshineData = await getSunshineData(lat, lon);\n      const color = getColorForSunshine(sunshineData.sunshine, COLOR_MAP);\n      const pixelIndex = getPixelIndexForCoordinates(lat, lon, IMAGE_WIDTH);\n      image.data[pixelIndex] = color.r;\n      image.data[pixelIndex + 1] = color.g;\n      image.data[pixelIndex + 2] = color.b;\n      image.data[pixelIndex + 3] = 255;  // alpha channel (fully opaque)\n    }\n  }\n  await writeFileAsync('sunshine_map.png', PNG.sync.write(image));\n  console.log('Sunshine map generated.');\n}\n\ngenerateSunshineMap();\n"], [";\n    https.get(url, (res) => {\n      let data = '';\n      res.on('data', (chunk) => {\n        data += chunk;\n      });\n      res.on('end', () => {\n        try {\n          const jsonData = JSON.parse(data);\n          const sunshine = jsonData.daily[0].sunshine;\n          const sunshineData: SunshineData = { lat, lon, sunshine };\n          resolve(sunshineData);\n        } catch (error) {\n          reject(error);\n        }\n      });\n    }).on('error', (error) => {\n      reject(error);\n    });\n  });\n}\n\nasync function generateSunshineMap() {\n  const image = new PNG({ width: IMAGE_WIDTH, height: 180 });\n  for (let lat = LAT_MIN; lat <= LAT_MAX; lat++) {\n    for (let lon = LON_MIN; lon <= LON_MAX; lon++) {\n      const sunshineData = await getSunshineData(lat, lon);\n      const color = getColorForSunshine(sunshineData.sunshine, COLOR_MAP);\n      const pixelIndex = getPixelIndexForCoordinates(lat, lon, IMAGE_WIDTH);\n      image.data[pixelIndex] = color.r;\n      image.data[pixelIndex + 1] = color.g;\n      image.data[pixelIndex + 2] = color.b;\n      image.data[pixelIndex + 3] = 255;  // alpha channel (fully opaque)\n    }\n  }\n  await writeFileAsync('sunshine_map.png', PNG.sync.write(image));\n  console.log('Sunshine map generated.');\n}\n\ngenerateSunshineMap();\n"]))));
}
var templateObject_1;
