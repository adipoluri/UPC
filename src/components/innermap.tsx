import { Mappedin, TGetVenueOptions } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import { useRef } from "react";
import { useMemo } from 'react';
import useMapView from "./useMapView";
import useVenue from "./useVenue";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
// const options: TGetVenueOptions = {
//   venue: "mappedin-demo-mall",
//   clientId: "5eab30aa91b055001a68e996",
//   clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1"
// };

const url = new URL("https://maker.mappedin.com/map/657cc670040fcba69696e69e?map=Ground");
const venueName = url.searchParams.get("map");

const options: TGetVenueOptions = {
  venue: venueName!,
  clientId: "65a0422df128bbf7c7072349",
  clientSecret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
};

export default function App() {

  const mapRef = useRef<HTMLDivElement | null>(null);
  const venue = useVenue(options);
  let mapView;
  mapView = useMapView(mapRef.current, venue);
  

  return <div id="app" ref={mapRef} className="h-screen w-screen" />;
}