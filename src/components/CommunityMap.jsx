import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons for bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const propertyIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:28px;height:28px;background:#C9A84C;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22" fill="white"/></svg>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const landmarkIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:24px;height:24px;background:#141E30;border:2px solid white;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#C9A84C"/></svg>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [map, center, zoom]);
  return null;
}

export default function CommunityMap({ area }) {
  if (!area.mapCenter) return null;

  return (
    <div className="mb-8">
      <h3 className="font-heading font-semibold text-foreground mb-1">Neighbourhood Map</h3>
      <p className="text-xs text-muted-foreground font-body mb-3">
        <span className="inline-flex items-center gap-1 mr-3">
          <span className="w-3 h-3 rounded-full bg-[#C9A84C] inline-block border border-white shadow" /> Properties
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[#141E30] inline-block border border-white shadow" /> Landmarks
        </span>
      </p>
      <div className="rounded-xl overflow-hidden border border-border shadow-sm" style={{ height: 380 }}>
        <MapContainer
          center={area.mapCenter}
          zoom={14}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
        >
          <MapController center={area.mapCenter} zoom={14} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Community radius highlight */}
          <Circle
            center={area.mapCenter}
            radius={area.radiusM || 1000}
            pathOptions={{ color: '#C9A84C', fillColor: '#C9A84C', fillOpacity: 0.07, weight: 1.5, dashArray: '6 4' }}
          />

          {/* Property pins */}
          {area.propertyPins?.map((pin, i) => (
            <Marker key={`prop-${i}`} position={pin.coords} icon={propertyIcon}>
              <Popup>
                <div className="text-xs">
                  <p className="font-semibold text-[#141E30] mb-0.5">{pin.label}</p>
                  {pin.note && <p className="text-gray-500">{pin.note}</p>}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Landmark pins */}
          {area.landmarks?.map((lm, i) => (
            <Marker key={`lm-${i}`} position={lm.coords} icon={landmarkIcon}>
              <Popup>
                <div className="text-xs">
                  <p className="font-semibold text-[#141E30] mb-0.5">{lm.label}</p>
                  {lm.note && <p className="text-gray-500">{lm.note}</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}