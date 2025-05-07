/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents weather information, including temperature, humidity, wind speed, and description.
 */
export interface Weather {
  /**
   * The temperature in Celsius.
   */
  temperatureCelsius: number;
  /**
   * The humidity percentage.
   */
  humidity: number;
  /**
   * The wind speed in kilometers per hour.
   */
  windSpeedKph: number;
  /**
   * A description of the weather conditions (e.g., Sunny, Cloudy, Rainy).
   */
  description: string;
}

/**
 * Represents the weather forecast for a single day.
 */
export interface DailyForecast {
  /**
   * The high temperature in Celsius for the day.
   */
  highTemperatureCelsius: number;
  /**
   * The low temperature in Celsius for the day.
   */
  lowTemperatureCelsius: number;
  /**
   * A description of the weather conditions for the day (e.g., Sunny, Cloudy, Rainy).
   */
  conditions: string;
}

/**
 * Asynchronously retrieves current weather information for a given city.
 *
 * @param city The name of the city for which to retrieve weather data.
 * @returns A promise that resolves to a Weather object containing temperature, humidity, wind speed, and description.
 */
export async function getCurrentWeather(city: string): Promise<Weather> {
  // TODO: Implement this by calling an API.

  return {
    temperatureCelsius: 25,
    humidity: 60,
    windSpeedKph: 15,
    description: 'Partly Cloudy',
  };
}

/**
 * Asynchronously retrieves a 5-day weather forecast for a given city.
 *
 * @param city The name of the city for which to retrieve the forecast.
 * @returns A promise that resolves to an array of DailyForecast objects representing the 5-day forecast.
 */
export async function getFiveDayForecast(city: string): Promise<DailyForecast[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      highTemperatureCelsius: 28,
      lowTemperatureCelsius: 18,
      conditions: 'Sunny',
    },
    {
      highTemperatureCelsius: 26,
      lowTemperatureCelsius: 17,
      conditions: 'Cloudy',
    },
    {
      highTemperatureCelsius: 24,
      lowTemperatureCelsius: 16,
      conditions: 'Rainy',
    },
    {
      highTemperatureCelsius: 25,
      lowTemperatureCelsius: 17,
      conditions: 'Partly Cloudy',
    },
    {
      highTemperatureCelsius: 27,
      lowTemperatureCelsius: 19,
      conditions: 'Sunny',
    },
  ];
}
