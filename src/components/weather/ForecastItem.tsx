import * as React from 'react';
import type { DailyForecast } from '@/services/weather';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon, Thermometer, CalendarDays } from './WeatherIcon';
import { format, addDays } from 'date-fns';

interface ForecastItemProps {
  forecast: DailyForecast;
  dayOffset: number;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ forecast, dayOffset }) => {
  const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
  
  React.useEffect(() => {
    setCurrentDate(addDays(new Date(), dayOffset));
  }, [dayOffset]);


  return (
    <Card className="flex-shrink-0 w-full sm:w-40 bg-card shadow-lg transform transition-all hover:scale-105">
      <CardHeader className="p-3 text-center">
        <CardTitle className="text-md font-medium text-primary flex items-center justify-center">
          <CalendarDays className="mr-1 h-4 w-4" /> 
          {currentDate ? format(currentDate, 'EEE, MMM d') : 'Loading...'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 text-center">
        <WeatherIcon description={forecast.conditions} className="h-12 w-12 mx-auto text-accent mb-2" />
        <p className="text-sm text-muted-foreground">{forecast.conditions}</p>
        <div className="mt-2 flex justify-center items-center space-x-2">
          <Thermometer className="h-4 w-4 text-primary" />
          <div>
            <p className="text-lg font-semibold">{forecast.highTemperatureCelsius}°C</p>
            <p className="text-xs text-muted-foreground">High</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{forecast.lowTemperatureCelsius}°C</p>
            <p className="text-xs text-muted-foreground">Low</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastItem;
