'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from './WeatherIcon';

interface SearchBarProps {
  onSearch: (city: string) => void;
  initialCity?: string;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialCity = '', isLoading = false }) => {
  const [city, setCity] = useState(initialCity);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-2">
      <Input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-grow bg-card text-card-foreground border-primary/50 focus:ring-accent"
        aria-label="Search city for weather forecast"
        disabled={isLoading}
      />
      <Button type="submit" variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
        <SearchIcon className="h-5 w-5 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
