
import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface Location {
  city: string;
  region: string;
  country: string;
}

export default function LocationBanner() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get user's geolocation coordinates
    const getUserLocation = async () => {
      try {
        setLoading(true);
        
        // Check if geolocation is supported by the browser
        if (!navigator.geolocation) {
          throw new Error("Geolocation is not supported by your browser");
        }
        
        // Get coordinates using the browser's geolocation API
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Use OpenCage Geocoding API to get location details based on coordinates
        // Note: This is using their free API with a rate limit, for production consider alternatives
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=82f1e29c099e4b9f906a1a0d0d76ac33&language=en`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const result = data.results[0].components;
          setLocation({
            city: result.city || result.town || result.village || result.county || "Unknown",
            region: result.state || result.province || "",
            country: result.country || ""
          });
        } else {
          throw new Error("Location not found");
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error("Error getting location:", err);
        setError(err.message || "Failed to get location");
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  if (error) {
    return null; // Don't show anything if there's an error
  }

  return (
    <div className="w-full bg-primary/10 text-primary-foreground py-1 px-4 text-center text-sm">
      <div className="container-wide">
        <div className="flex items-center justify-center gap-1.5">
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin text-primary" />
              <span className="text-muted-foreground">Detecting your location...</span>
            </>
          ) : location ? (
            <>
              <MapPin size={14} className="text-primary" />
              <span>
                {location.city}
                {location.region && `, ${location.region}`}
                {location.country && `, ${location.country}`}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
