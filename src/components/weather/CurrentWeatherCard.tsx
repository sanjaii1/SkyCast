import type { Weather } from '@/services/weather';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { WeatherIcon, Thermometer, Droplets, WindIcon, LocationPinIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  weather: Weather;
  city: string;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather, city }) => {
  return (
    <Card className="w-full max-w-md bg-card shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold text-primary flex items-center">
              <LocationPinIcon className="mr-2 h-7 w-7" /> {city}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">Current Conditions</CardDescription>
          </div>
          <WeatherIcon description={weather.description} className="h-16 w-16 text-accent" />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-0">
        <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg">
          <Thermometer className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Temperature</p>
            <p className="text-xl font-semibold">{weather.temperatureCelsius}°C</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg">
          <Droplets className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-xl font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg">
          <WindIcon className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Wind Speed</p>
            <p className="text-xl font-semibold">{weather.windSpeedKph} kph</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg col-span-1">
           <WeatherIcon description={weather.description} className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Condition</p>
            <p className="text-xl font-semibold">{weather.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;
