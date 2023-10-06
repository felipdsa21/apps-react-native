export type RootStackParamList = {
  Search: undefined;
  Forecast: { lat: number; lon: number };
  DailyForecasts: { lat: number; lon: number };
};

export interface Location {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface ForecastData {
  city: City;
  list: Forecast[];
}

export interface DailyForecastData {
  city: City;
  list: DailyForecast[];
}

export interface City {
  name: string;
  country: string;
}

export interface Forecast {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
}

export interface DailyForecast {
  dt: number;
  feels_like: DailyData;
  temp: DailyData;
  weather: Weather[];
}

export interface Main {
  feels_like: number;
  pressure: number;
  temp: number;
}

export interface Weather {
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
}

export interface DailyData {
  day: number;
}
