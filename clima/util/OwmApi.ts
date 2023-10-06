import { DailyForecastData, ForecastData, Location } from "./Definitions";

const API_HOST = "https://api.openweathermap.org";
const API_KEY = process.env.EXPO_PUBLIC_OWM_API_KEY;

async function doRequest(url: string) {
  const response = await fetch(API_HOST + url);
  return await response.json();
}

export function requestForecast(lat: number, lon: number): Promise<ForecastData> {
  return doRequest(`/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${API_KEY}`);
}

export function requestDailyForecasts(lat: number, lon: number): Promise<DailyForecastData> {
  return doRequest(`/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${API_KEY}`);
}

export function requestSearchLocations(name: string): Promise<Location[]> {
  return doRequest(`/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`);
}

export function getIconUrl(name: string) {
  return `https://openweathermap.org/img/wn/${name}@4x.png`;
}
