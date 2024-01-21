'use client'
import React, {useState, useEffect} from 'react';
import Map, {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createClient } from '@/src/utils/supabase/client';

export function Bathrooms() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [bathrooms, setBathrooms] = useState<any>([]);

  useEffect(() => {
    const fetchBathrooms = async () => {
      const { data } = await supabase.from('bathrooms').select();
      setBathrooms(data);
      setIsLoading(false);
    };

    fetchBathrooms();
  }, []);

  return (
    <>
      {bathrooms.map((bathroom: { id: React.Key | null | undefined; longitude: number; latitude: number; }) => (
        <Marker
          key={bathroom.id}
          longitude={bathroom.longitude}
          latitude={bathroom.latitude}
          color='#AE4950'
        >
        </Marker>
      ))}
    </>
  );
}

export default function App() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: -123.24957,
        latitude: 49.266543,
        zoom: 14,
      }}
      style={{width: "100%", height: "100%", borderRadius:"30px", boxShadow:"10px 10px 0px 0px #000", outline:"solid", outlineWidth:"4px"}} //leave me alone ill change this later ok, ema
      mapStyle="mapbox://styles/mapbox/standard"
    >
      <GeolocateControl fitBoundsOptions={{ maxZoom: 17 }} />
      <NavigationControl />
      <Bathrooms />
    </Map>
  );
}