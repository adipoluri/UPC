import {
  Mappedin,
  MapView,
  showVenue,
  TShowVenueOptions
} from "@mappedin/mappedin-js";
import { useEffect, useState } from "react";

export default function useMapView(
  el: HTMLElement | null,
  venue: Mappedin | undefined,
  options?: TShowVenueOptions
) {
  const [mapView, setMapView] = useState<MapView | undefined>();

  useEffect(() => {
    async function renderVenue() {
      if (el == null || venue == null) {
        return;
      }

      if (mapView != null && mapView.venue.venue.id === venue.venue.id) {
        return;
      }

      if (mapView != null) {
        mapView.destroy();
      }

      try {
        const _mapView = await showVenue(el, venue, options);
        setMapView(_mapView);
      } catch (e) {
        setMapView(undefined);
      }
    }

    renderVenue();
  }, [el, venue, options, mapView]);

  return mapView;
}
