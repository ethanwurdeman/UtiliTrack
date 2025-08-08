import { Map } from 'maplibre-gl';
import { Segment } from '../types/models';

export function segmentsToFeatureCollection(segments: Segment[]) {
  return {
    type: 'FeatureCollection',
    features: segments.map((s) => ({
      type: 'Feature',
      properties: { id: s.id, name: s.name },
      geometry: s.geom,
    })),
  } as any;
}

export function addSegmentSource(map: Map, id: string, data: any) {
  if (map.getSource(id)) map.removeSource(id);
  map.addSource(id, { type: 'geojson', data });
}

export function addSegmentLayer(map: Map, id: string, source: string) {
  if (map.getLayer(id)) map.removeLayer(id);
  map.addLayer({
    id,
    type: 'line',
    source,
    paint: { 'line-color': '#f00', 'line-width': 2 },
  });
}
