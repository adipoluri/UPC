'use client'

import React, { useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { createClient } from '@/src/utils/supabase/client';
import { useMap } from 'react-map-gl';
import { AccessiblePin, ManPin, NeutralPin, WomanPin } from './pin';

export default function BathroomList(props){
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(true);   
    const [bathrooms, setBathrooms] = useState<any>([]);
    const {current: map} = useMap();
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
      const fetchBathrooms = async () => {
        const { data } = await supabase.from('bathrooms').select();

        if ('geolocation' in navigator) {
            // Get the current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude, longitude)
                    console.log(data)
                    setLocation({ latitude, longitude });
                    data?.sort((a, b) => {
                        const distanceA = calculateDistance(
                            a.latitude,
                            a.longitude,
                            latitude,
                            longitude
                        );
                        const distanceB = calculateDistance(
                            b.latitude,
                            b.longitude,
                            latitude,
                            longitude
                        );
                        return distanceA - distanceB;
                    });
                }
            );
        }

        setBathrooms(data);
        setIsLoading(false);
      };
  
      fetchBathrooms();
    }, []);

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }
    
    function prettifyKilometers(kms, precision = 2) {
        if (typeof kms !== 'number') {
            throw new Error('Input must be a number representing kilometers.');
        }
        
        const units = ['km', 'Mm', 'Gm', 'Tm']; // Kilometers, Megameters, Gigameters, Terameters
        
        let unitIndex = 0;
        while (kms >= 1000 && unitIndex < units.length - 1) {
            kms /= 1000;
            unitIndex++;
        }
        
        const formattedDistance = kms.toFixed(precision);
        const unit = units[unitIndex];
        
        return `${formattedDistance} ${unit}`;
    }

    return(
        <>
        <ScrollArea.Root className="w-[400px] h-5/6 rounded-[30px] overflow-hidden shadow-[8px_8px] border-4 border-black bg-[#fff2ab]">
            <ScrollArea.Viewport className="w-full h-full rounded">
            <div className="px-[-4px]">
                <div className="font-j text-[25px] leading-[28px] p-2.5 text-center font-medium text-xl">Nearby Washrooms</div>
                {bathrooms.map((bathroom: any) => (
                        <button
                            className="flex font-p text-[13px] leading-[18px] p-2.5 w-full border-t-[2px] border-black bg-[#fff2ab]"
                            key={bathroom.bid}
                            onClick={e => {
                                // If we let the click event propagates to the map, it will immediately close the popup
                                // with `closeOnClick: true`
                                props.highlightBathroom(bathroom);
                            }}
                        >   
                            <div className='flex-col justify-items-start w-full spacing-6'>
                                <div className="flex">
                                    <div className="flex-none text-base font-medium text-left">{
                                        bathroom.building_name + " | Floor " + bathroom.floor}
                                    </div>
                                    <div className="grow"/>
                                    <div className="flex font-j text-base font-medium">
                                        {location? prettifyKilometers(calculateDistance(bathroom.latitude, bathroom.longitude, location.latitude, location.longitude)):""}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex space-x-1 font-j">
                                        {   "★".repeat(bathroom.rating)+"☆".repeat(5-bathroom.rating)+" ("+bathroom.rating+" ratings)"}
                                    </div>
                                    <div className="grow"/>
                                    <div className="flex font-j">
                                        {bathroom.gender == 1?<ManPin />:<></>}
                                        {bathroom.gender == 2?<WomanPin/>:<></>}
                                        {bathroom.gender == 3?<NeutralPin/>:<></>}
                                        {bathroom.accessible?<AccessiblePin/>:<></>}
                                    </div>
                                </div>
                                <div className="flex font-j overflow-auto max-h-[60px] text-left py-2">
                                    {bathroom.description}
                                </div>
                                <div className="flex">
                                    <div className="pt-1 flex-none space-x-1 font-j">
                                        {   "🕔  Closes by "+ bathroom.closing_time.substring(0,5)}
                                    </div>
                                    <div className="grow"/>
                                    <div className="pt-1 flex space-x-1 font-j">
                                    {   "Last cleaned on " + new Date(bathroom.cleaned).toDateString()}
                                    </div>
                                </div>
                                {bathroom.ecofriendly?
                                <div className="pt-2 flex space-x-1 font-j">
                                    {bathroom.ecofriendly?"♲ Eco-Friendly":""}
                                </div>:<></>
                                }
                                {bathroom.women_products?
                                <div className="pt-2 flex space-x-1 font-j">
                                    {bathroom.women_products?"♀ Menstrual Products Available":""}
                                </div>:<></>
                                }
                                {bathroom.baby_change? <div className="pt-2 flex space-x-1 font-j">
                                    {bathroom.baby_change?"🚼  Baby Change Stations":""}
                                </div>:<></>}
                            </div>
                        </button>
                ))}
            </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
            >
            <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="horizontal"
            >
            <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-blackA5" />
        </ScrollArea.Root>
        <div className="flex-col pt-3 pl-12 font-j text-xl medium-bold">
            <div className="flex-row">
                <span className='flex'><ManPin /> Men's Washroom</span>
            </div>
            <div className="flex-row">
                <span className='flex'><WomanPin/> Women's Washroom</span>
            </div>
            <div className="flex-row">
                <span className='flex'><NeutralPin /> Gender Neutral Washroom</span>
            </div>
            <div className="flex-row">
                <span className='flex'><AccessiblePin /> Accessible Washroom</span>
            </div>
        </div>
        </>
    )
}
