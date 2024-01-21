'use client'
import React, {useState, useEffect, useMemo, useRef} from 'react';
import Map, {GeolocateControl, Marker, NavigationControl, Popup, useMap} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createClient } from '@/src/utils/supabase/client';
import {ManPin, WomanPin, AccessiblePin, NeutralPin} from './pin';
import Dialogue from './dialogue';
import type mapboxgl from 'mapbox-gl';


export function Bathrooms(props) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [bathrooms, setBathrooms] = useState<any>([]);
  const {current: map} = useMap();

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
      {bathrooms.map((bathroom: { bid: number; gender: number; longitude: number; latitude: number; }) => (
        <Marker
          key={bathroom.bid}
          longitude={bathroom.longitude}
          latitude={bathroom.latitude}
          color='#AE4950'
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            if (map) {
              map.flyTo({center: [bathroom.longitude, bathroom.latitude]});
            }
            e.originalEvent.stopPropagation();
            props.showPopup(bathroom);
          }}
        >
          {bathroom.gender == 1?<ManPin />:<></>}
          {bathroom.gender == 2?<WomanPin/>:<></>}
          {bathroom.gender == 3?<AccessiblePin/>:<></>}
        </Marker>
      ))}
    </>
  );
}

export default function MapContainer() {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);

  useEffect(() => {
    const fetchBathrooms = async () => {
      const { data } = await supabase.from('bathrooms').select();
      setData(data);
      setIsLoading(false);
    };

    fetchBathrooms();
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);


  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: -123.24957,
        latitude: 49.266543,
        zoom: 14,
      }}
      style={{width: "100%", height: "100%", borderRadius:"30px", boxShadow:"11px 11px 0px 0px #000", outline:"solid", outlineWidth:"4px"}} //leave me alone ill change this later ok, ema
      mapStyle="mapbox://styles/mapbox/standard"
    >
      <GeolocateControl fitBoundsOptions={{ maxZoom: 17 }} ref={geoControlRef} trackUserLocation={true} showAccuracyCircle showUserHeading/>
      <NavigationControl />
      <Bathrooms showPopup={setPopupInfo} />

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          closeButton={false}
          onClose={() => setPopupInfo(null)}
          className='bg-white rounded-[30px] overflow-hidden shadow-[5px_5px] border-4 border-black'
          >
          <div className='font-p mx-6 text-base'>
            {popupInfo.building_name}{' '}|{' Floor '}{popupInfo.floor} 
          </div>
          <div className='m-6'>
            <Dialogue/>
          </div>
        </Popup>
      )}
    </Map>
  );
}