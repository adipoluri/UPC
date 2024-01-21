'use client'

import React, { useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { createClient } from '@/src/utils/supabase/client';
import { useMap } from 'react-map-gl';

export default function BathroomList(props){
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

    return(
        <ScrollArea.Root className="w-[400px] h-5/6 rounded-[30px] overflow-hidden shadow-[9px_9px] border-4 border-black bg-[#fff2ab]">
            <ScrollArea.Viewport className="w-full h-full rounded">
            <div className="px-[-4px]">
                <div className="font-j text-[20px] leading-[23px] p-2.5 text-center font-medium">Nearby Bathrooms</div>
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
                            <div className="flex-col justify-between">
                                <div className="font-medium">{
                                    bathroom.building_name + "| Floor " + bathroom.floor}
                                </div>
                                <div className="flex space-x-1 font-j">
                                {   "★".repeat(bathroom.rating)+"☆".repeat(5-bathroom.rating)+" ("+bathroom.rating+" ratings)"}
                                </div>
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
    )
}
