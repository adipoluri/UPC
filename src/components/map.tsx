'use client'
import React, {useState, useEffect, useRef} from 'react';
import Map, {GeolocateControl, MapRef, Marker, NavigationControl, Popup, useMap} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createClient } from '@/src/utils/supabase/client';
import {ManPin, WomanPin, AccessiblePin, NeutralPin} from './pin';
import Dialogue from './dialogue';
import type mapboxgl from 'mapbox-gl';
import BathroomList from './scrollBathrooms';


export function Bathrooms(props) {
  const {current: map} = useMap();

  return (
    <>
      {props.bathrooms.map((bathroom: { bid: number; gender: number; accessible:boolean; longitude: number; latitude: number; }) => (
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
              map.flyTo({center: [bathroom.longitude, bathroom.latitude], speed: 0.2, zoom: 18});
            }
            e.originalEvent.stopPropagation();
            props.showPopup(bathroom);
          }}
        >
          <div className="flex space-x-[-16px]">
            {bathroom.gender == 1?<div className="flex"><ManPin /></div>:<></>}
            {bathroom.gender == 2?<div className="flex"><WomanPin/></div>:<></>}
            {bathroom.gender == 3?<div className="flex"><NeutralPin/></div>:<></>}
            {bathroom.accessible?<div className="flex z-1"><AccessiblePin/></div>:<></>}
          </div>
          
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
  const [bathrooms, setBathrooms] = useState<any>([]);
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const fetchBathrooms = async () => {
      const { data } = await supabase.from('bathrooms').select();
      setBathrooms(data);
      setIsLoading(false);
    };

    geoControlRef.current?.trigger();
    fetchBathrooms();
  }, [geoControlRef.current]);

  function highlightBathroom(bathroom){
    if (mapRef.current) {
      mapRef.current.flyTo({center: [bathroom.longitude, bathroom.latitude], zoom: 18});
    }
    setPopupInfo(bathroom);
  }

  return (
    <>
      <div className="absolute top-0 left-0 z-10 p-4 h-screen">
        <BathroomList highlightBathroom={highlightBathroom}/>
      </div>
      <div className="flex p-4 pl-16 pt-20 h-dvh" >
        <div className="grow w-5/6">
        <Map
          mapboxAccessToken={mapboxToken}
          initialViewState={{
            longitude: -123.24957,
            latitude: 49.266543,
            zoom: 14,
          }}
          ref={mapRef}
          style={{width: "100%", height: "100%", borderRadius:"30px", boxShadow:"11px 11px 0px 0px #000", outline:"solid", outlineWidth:"4px"}} //leave me alone ill change this later ok, ema
          mapStyle="mapbox://styles/mapbox/standard"
        >
            <GeolocateControl fitBoundsOptions={{ maxZoom: 17 }} ref={geoControlRef} trackUserLocation={true} showUserHeading style={{marginRight:"24px",marginTop:"24px", scale:"1.25"}}/>
            <NavigationControl visualizePitch style={{marginRight:"24px",marginTop:"24px",scale:"1.25"}}/>
            <Bathrooms showPopup={setPopupInfo} bathrooms={bathrooms}/>
            {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
                closeButton={false}
                onClose={() => setPopupInfo(null)}
                className='rounded-[30px] overflow-hidden shadow-[5px_5px] border-4 border-black bg-[#fff2ab]'
                >
                <div
                  className="flex-col font-p text-[13px] leading-[18px] p-2.5 w-full border-black bg-[#fff2ab]"
                  >   
                  <div className='flex-col justify-items-start w-full spacing-6'>
                      <div className="flex">
                        <div className="flex-none text-base font-medium text-left">{
                            popupInfo.building_name + " | Floor " + popupInfo.floor}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex space-x-1 font-j">
                            {   "★".repeat(popupInfo.rating)+"☆".repeat(5-popupInfo.rating)+" ("+popupInfo.rating+" ratings)"}
                        </div>
                        <div className="grow"/>
                        <div className="flex font-j">
                            {popupInfo.gender == 1?<ManPin />:<></>}
                            {popupInfo.gender == 2?<WomanPin/>:<></>}
                            {popupInfo.gender == 3?<NeutralPin/>:<></>}
                            {popupInfo.accessible?<AccessiblePin/>:<></>}
                        </div>
                      </div>
                      <div className="flex font-j overflow-auto max-h-[60px] text-left py-2">
                          {popupInfo.description}
                      </div>
                      <div className="pt-1 flex-none space-x-1 font-j">
                        {   "🕔 Closes by "+ popupInfo.closing_time.substring(0,5)}
                      </div>
                      <div className="pt-1 flex space-x-1 font-j">
                        {   "Last cleaned on " + new Date(popupInfo.cleaned).toDateString()}
                      </div>
                      <div className="pt-2 flex space-x-1 font-j">
                        {popupInfo.ecofriendly?"♲ Eco-Friendly":""}
                      </div>
                  </div>
                  <div className='m-6'>
                      <Dialogue/>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </>
  );
}