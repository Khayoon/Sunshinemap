import https from 'https';
import fs from 'fs';
import { promisify } from 'util';
import { PNG } from 'pngjs';
import { getColorForSunshine, getPixelIndexForCoordinates } from './utils';
import { SunshineData, ColorMap } from './types';

const writeFileAsync = promisify(fs.writeFile);

const OPENWEATHER_API_KEY = 'your_api_key_here';
const COLOR_MAP: ColorMap = {
  600: { r: 0, g: 0, b: 255 },    // dark blue
  700: { r: 0, g: 128, b: 255 },  // medium blue
  800: { r: 0, g: 255, b: 255 },  // light blue
  900: { r: 255, g: 255, b: 0 },  // yellow
  1000: { r: 255, g: 0, b: 0 },   // red
};

const LAT_MIN = -90;
const LAT_MAX = 90;
const LON_MIN = -180;
const LON_MAX = 180;
const IMAGE_WIDTH = 360 * 3;  // three pixels per longitude degree

function getSunshineData(lat: number, lon: number): Promise<SunshineData> {
  return new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${}&exclude=current,minutely,hourly,alerts`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          const sunshine = jsonData.daily[0].sunshine;
          const sunshineData: SunshineData = { lat, lon, sunshine };
          resolve(sunshineData);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function generateSunshineMap() {
  const image = new PNG({ width: IMAGE_WIDTH, height: 180 });
  for (let lat = LAT_MIN; lat <= LAT_MAX; lat++) {
    for (let lon = LON_MIN; lon <= LON_MAX; lon++) {
      const sunshineData = await getSunshineData(lat, lon);
      const color = getColorForSunshine(sunshineData.sunshine, COLOR_MAP);
      const pixelIndex = getPixelIndexForCoordinates(lat, lon, IMAGE_WIDTH);
      image.data[pixelIndex] = color.r;
      image.data[pixelIndex + 1] = color.g;
      image.data[pixelIndex + 2] = color.b;
      image.data[pixelIndex + 3] = 255;  // alpha channel (fully opaque)
    }
  }
  await writeFileAsync('sunshine_map.png', PNG.sync.write(image));
  console.log('Sunshine map generated.');
}

generateSunshineMap();
