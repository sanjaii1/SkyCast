import type { DailyForecast } from '@/services/weather';
import ForecastItem from './ForecastItem';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ForecastDisplayProps {
  forecasts: DailyForecast[];
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecasts }) => {
  return (
    <div className="w-full max-w-3xl mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-primary text-center sm:text-left">5-Day Forecast</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-4">
          {forecasts.map((forecast, index) => (
            <ForecastItem key={index} forecast={forecast} dayOffset={index + 1} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ForecastDisplay;
