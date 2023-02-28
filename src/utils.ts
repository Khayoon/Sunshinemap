import type { ColorMap, Color } from './types';


export function getColorForSunshine(sunshine: number, colorMap: ColorMap): Color {
  const roundedSunshine = Math.floor(sunshine / 100) * 100;
  return colorMap[roundedSunshine] || colorMap[600];
}

export function getPixelIndexForCoordinates(lat: number, lon: number, width: number): number {
  const x = Math.floor((lon + 180) * (width / 360));
  const y = Math.floor((90 - lat) * (width / 180));
  return (y * width + x) * 3;
}
