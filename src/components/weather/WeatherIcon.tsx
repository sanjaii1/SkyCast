import type { LucideProps } from 'lucide-react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  HelpCircle,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  Gauge,
  CalendarDays,
  Search,
  MapPin
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ description, className, ...props }) => {
  const descLower = description.toLowerCase();

  if (descLower.includes('clear') || descLower.includes('sunny')) {
    return <Sun className={className} {...props} />;
  }
  if (descLower.includes('partly cloudy') || descLower.includes('few clouds') || descLower.includes('scattered clouds')) {
    return <CloudSun className={className} {...props} />;
  }
  if (descLower.includes('cloudy') || descLower.includes('overcast') || descLower.includes('broken clouds')) {
    return <Cloud className={className} {...props} />;
  }
  if (descLower.includes('rain') || descLower.includes('showers')) {
    return <CloudRain className={className} {...props} />;
  }
  if (descLower.includes('drizzle')) {
    return <CloudDrizzle className={className} {...props} />;
  }
  if (descLower.includes('thunderstorm')) {
    return <CloudLightning className={className} {...props} />;
  }
  if (descLower.includes('snow')) {
    return <CloudSnow className={className} {...props} />;
  }
  if (descLower.includes('mist') || descLower.includes('fog')) {
    return <CloudFog className={className} {...props} />;
  }
  if (descLower.includes('wind')) {
    return <Wind className={className} {...props} />;
  }
  if (descLower.includes('humidity')) {
    return <Droplets className={className} {...props} />;
  }
   if (descLower.includes('temperature')) {
    return <Thermometer className={className} {...props} />;
  }

  return <HelpCircle className={className} {...props} />;
};

export { WeatherIcon, Thermometer, Droplets, Wind as WindIcon, Gauge, CalendarDays, Search as SearchIcon, MapPin as LocationPinIcon };
