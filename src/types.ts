interface SunshineData {
    lat: number;
    lon: number;
    sunshine: number;
  }
  
  interface Color {
    r: number;
    g: number;
    b: number;
  }
  
  type ColorMap = { [key: number]: Color };
  type Color = [number, number, number];
  
  