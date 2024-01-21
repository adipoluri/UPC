import { TGetVenueOptions } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import { useRef } from "react";
import "./styles.css";
import useMapView from "./useMapView";
import { useVenue } from "./useVenue";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options: TGetVenueOptions = {
  venue: "mappedin-demo-mall",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1"
};

export default function App() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const venue = useVenue(options);
  const mapView = useMapView(mapRef.current, venue);

  return <div id="app" ref={mapRef} />;
}