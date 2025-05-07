'use client';

import type { DailyForecast, Weather } from '@/services/weather';
import { getCurrentWeather, getFiveDayForecast } from '@/services/weather';
import { useEffect, useState, Suspense } from 'react';
import SearchBar from '@/components/weather/SearchBar';
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard';
import ForecastDisplay from '@/components/weather/ForecastDisplay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"


export default function SkyCastPage() {
  const [city, setCity] = useState<string>('London');
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchWeatherData(city);
  }, []); // Fetch initial data for default city on mount

  const fetchWeatherData = async (loc: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay for better UX perception
      // await new Promise(resolve => setTimeout(resolve, 500));
      const weatherData = await getCurrentWeather(loc);
      const forecastData = await getFiveDayForecast(loc);
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      toast({
        title: "Weather Updated",
        description: `Showing weather for ${loc}.`,
      });
    } catch (err) {
      const errorMessage = `Failed to fetch weather data for ${loc}. The city might not be found or there was a network issue.`;
      setError(errorMessage);
      setCurrentWeather(null);
      setForecast(null);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    fetchWeatherData(searchCity); // Fetch new data when city changes via search
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 md:p-24 bg-background transition-colors duration-300">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center mb-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-primary mr-2">
            <path d="M12.0006 20.0002C12.2927 20.0002 12.5761 19.9443 12.8334 19.8365C13.0295 19.7542 13.1677 19.5572 13.1343 19.3522L12.7999 17.2112C14.4938 16.8113 15.9785 15.7514 16.8627 14.2616C17.0318 13.9866 16.9193 13.6341 16.6549 13.4716L15.0399 12.4252C15.3188 11.6489 15.4641 10.8256 15.4641 9.98424C15.4641 6.2903 12.7069 3.28516 9.23594 3.28516C7.69982 3.28516 6.29821 3.82631 5.2002 4.75187C5.00479 4.91943 4.90708 5.18018 4.96094 5.43463L5.53492 7.93299C5.57727 8.13241 5.77332 8.26697 5.97992 8.23711C8.32039 7.88512 10.2716 9.72093 10.2716 12.1034C10.2716 12.4704 10.2261 12.8293 10.1392 13.177L6.28281 14.9677C6.02031 15.0909 5.88281 15.3825 5.93125 15.6591C6.50156 18.2216 8.97031 20.0002 12.0006 20.0002ZM9.50057 11.0002C8.94829 11.0002 8.50057 10.5525 8.50057 10.0002C8.50057 9.44792 8.94829 9.00021 9.50057 9.00021C10.0528 9.00021 10.5006 9.44792 10.5006 10.0002C10.5006 10.5525 10.0528 11.0002 9.50057 11.0002Z" />
            <path d="M18.2148 10.0002C18.2148 10.0002 18.2148 10.0002 18.2148 9.99906C18.2148 9.99906 18.2148 9.99789 18.2148 9.99789V9.98455C18.2148 6.90189 16.0289 4.33314 13.1953 3.69877C13.1953 3.69877 13.1953 3.69877 13.1953 3.6976C13.0385 3.66644 12.9023 3.51877 12.8984 3.34906L12.7852 0.73783C12.7812 0.57033 12.6523 0.43158 12.4883 0.419861C12.1367 0.39283 11.7852 0.375252 11.4219 0.375252C11.1336 0.375252 10.8516 0.387052 10.5703 0.410489C10.3672 0.427911 10.2187 0.592306 10.2187 0.80002C10.2187 2.22916 9.10156 3.37525 7.69531 3.37525C4.52344 3.37525 2.00008 5.97837 2.00008 9.24556C2.00008 9.30962 2.00008 9.37525 2.00398 9.43931C2.00398 9.43931 2.00398 9.43931 2.00398 9.44049C2.0118 9.63306 2.18367 9.76783 2.37508 9.74392L4.60945 9.47213C4.79695 9.44947 4.92586 9.28853 4.90633 9.10181C4.85945 8.68619 4.83594 8.26392 4.83594 7.83627C4.83594 6.85181 5.60156 6.06275 6.5625 6.06275H6.60156C6.69531 6.06275 6.78516 6.07447 6.875 6.08994C7.0625 6.12213 7.23438 6.00025 7.27344 5.80962L7.72266 3.85181C7.77734 3.60572 8.02344 3.45806 8.26953 3.50962C10.6367 3.98775 12.4219 5.81666 12.4219 8.22837C12.4219 9.07994 12.1406 9.86666 11.6719 10.5112L14.1094 12.4034C14.1914 12.4659 14.2852 12.5002 14.3828 12.5002C14.4687 12.5002 14.5547 12.4768 14.6289 12.4315C14.8633 12.2885 14.9453 11.9799 14.8086 11.7502C14.6055 11.3987 14.4492 11.0112 14.3398 10.6026C14.3203 10.5377 14.3086 10.469 14.3086 10.4002C14.3086 10.1799 14.4805 10.0002 14.7031 10.0002H18.2148Z" />
          </svg>
          <h1 className="text-5xl font-extrabold text-primary">SkyCast</h1>
        </div>
        <p className="text-xl text-muted-foreground">Your reliable weather companion</p>
      </header>

      <div className="w-full max-w-xl mb-8">
        <SearchBar onSearch={handleSearch} initialCity={city} isLoading={loading} />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center text-center p-10">
          <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
          <p className="text-lg text-muted-foreground">Fetching weather data for {city}...</p>
        </div>
      )}

      {error && !loading && (
         <Alert variant="destructive" className="w-full max-w-md mb-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && currentWeather && (
        <div className="animate-fadeIn mb-8 w-full flex justify-center">
            <CurrentWeatherCard weather={currentWeather} city={city} />
        </div>
      )}
      
      {!loading && !error && forecast && (
         <div className="animate-fadeIn w-full flex justify-center">
            <ForecastDisplay forecasts={forecast} />
        </div>
      )}
      
      {!loading && !error && !currentWeather && !forecast && (
        <div className="text-center p-10">
           <Image 
            src="https://picsum.photos/seed/weatherapp/400/300" 
            alt="Placeholder image for weather"
            data-ai-hint="weather app placeholder"
            width={400} 
            height={300}
            className="rounded-lg shadow-lg mx-auto"
            />
          <p className="mt-4 text-lg text-muted-foreground">Search for a city to get started.</p>
        </div>
      )}
    </main>
  );
}
