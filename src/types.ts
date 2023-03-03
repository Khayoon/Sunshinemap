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

type ColorTuple = [number, number, number];

type SunshineColorMap = { [key: number]: ColorTuple };
