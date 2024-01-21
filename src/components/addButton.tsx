'use client'

import React, { useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { createClient } from '@/src/utils/supabase/client';
import { useMap } from 'react-map-gl';
import { AccessiblePin, ManPin, NeutralPin, WomanPin } from './pin';

export default function AddButton(props){
    return(
        <button className="relative flex rounded-[30px] overflow-hidden shadow-[4px_4px] border-4 border-black bg-[#fff2ab]">
            <img
            className="h-12 w-12 rounded-full"
            src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/add-1024.png"
            alt={""}
            />
      </button>
    )
}
