import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src || '/marker-icon.png',
  shadowUrl: iconShadow.src || '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface RiskZone {
  id: string;
  lat: number;
  lng: number;
  radius: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

interface MapViewProps {
  onLocationSelect: (location: string) => void;
}

// Component to update map view when center changes
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

const MapView: React.FC<MapViewProps> = ({ onLocationSelect }) => {
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, name: string} | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]); // Default world view
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Get user's current location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          
          // Reverse geocode to get location name
          fetchLocationName(latitude, longitude).then(locationName => {
            if (locationName) {
              setSelectedLocation({
                lat: latitude,
                lng: longitude,
                name: locationName
              });
              onLocationSelect(locationName);
            }
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Default to a world view if geolocation fails
          setMapCenter([20, 0]);
        }
      );
    }

    // Fetch risk zones - replace with actual API call in production
    fetchRiskZones();
  }, []);

  const fetchRiskZones = async () => {
    try {
      // In a real app, you would fetch this data from your backend
      // For now, we'll use mock data
      const mockZones: RiskZone[] = [
        {
          id: '1',
          lat: 51.505,
          lng: -0.09,
          radius: 1000,
          riskLevel: 'high',
          description: 'High pollution area with elevated PM2.5 levels'
        },
        {
          id: '2',
          lat: 51.51,
          lng: -0.1,
          radius: 800,
          riskLevel: 'medium',
          description: 'Moderate air quality concerns'
        },
        {
          id: '3',
          lat: 51.49,
          lng: -0.08,
          radius: 1200,
          riskLevel: 'low',
          description: 'Low risk area with good air quality'
        }
      ];

      setRiskZones(mockZones);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching risk zones:', error);
      setIsLoading(false);
    }
  };

  // Function to fetch location name from coordinates using Nominatim
  const fetchLocationName = async (lat: number, lng: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location name');
      }
      
      const data = await response.json();
      
      // Extract a meaningful location name
      const address = data.address;
      let locationName = '';
      
      if (address.city) {
        locationName = address.city;
      } else if (address.town) {
        locationName = address.town;
      } else if (address.village) {
        locationName = address.village;
      } else if (address.county) {
        locationName = address.county;
      } else if (address.state) {
        locationName = address.state;
      }
      
      if (address.country && locationName) {
        locationName += `, ${address.country}`;
      } else if (address.country) {
        locationName = address.country;
      }
      
      return locationName || 'Unknown location';
    } catch (error) {
      console.error('Error fetching location name:', error);
      return null;
    }
  };

  // Function to geocode a location name to coordinates using Nominatim
  const geocodeLocation = async (locationName: string) => {
    try {
      setErrorMessage(null);
      setIsLoading(true);
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to geocode location');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        
        setSelectedLocation({
          lat: latitude,
          lng: longitude,
          name: display_name
        });
        
        setMapCenter([latitude, longitude]);
        onLocationSelect(display_name);
      } else {
        setErrorMessage('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
      setErrorMessage('Error finding location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    
    await geocodeLocation(searchInput);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode to get location name
          const locationName = await fetchLocationName(latitude, longitude);
          
          if (locationName) {
            setSelectedLocation({
              lat: latitude,
              lng: longitude,
              name: locationName
            });
            
            setMapCenter([latitude, longitude]);
            onLocationSelect(locationName);
            setSearchInput(locationName);
          }
          
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setErrorMessage('Could not access your location. Please check your browser permissions.');
          setIsLoading(false);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by your browser.');
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ff0000';
      case 'medium': return '#ffa500';
      case 'low': return '#ffff00';
      default: return '#00ff00';
    }
  };

  if (isLoading && !selectedLocation) {
    return <div className="h-96 flex items-center justify-center bg-gray-100">Loading map data...</div>;
  }

  return (
    <div className="flex flex-col h-96">
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter a location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errorMessage && (
              <div className="absolute text-red-500 text-sm mt-1">{errorMessage}</div>
            )}
          </div>
          <div className="flex">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <span className="hidden sm:inline">Use Current Location</span>
              <span className="sm:hidden">📍</span>
            </button>
          </div>
        </form>
      </div>
      
      <div className="flex-grow rounded-lg overflow-hidden shadow-lg">
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          whenCreated={(map) => { mapRef.current = map; }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {riskZones.map((zone) => (
            <Circle
              key={zone.id}
              center={[zone.lat, zone.lng]}
              radius={zone.radius}
              pathOptions={{
                color: getRiskColor(zone.riskLevel),
                fillColor: getRiskColor(zone.riskLevel),
                fillOpacity: 0.3
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{zone.riskLevel.toUpperCase()} RISK ZONE</h3>
                  <p>{zone.description}</p>
                </div>
              </Popup>
            </Circle>
          ))}
          
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
              <Popup>
                <div>
                  <h3 className="font-bold">Selected Location</h3>
                  <p>{selectedLocation.name}</p>
                </div>
              </Popup>
            </Marker>
          )}
          
          <ChangeMapView center={mapCenter} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
