import React, { useEffect, useRef } from 'react';
import { WorkerProfile } from '../../types';
import L from 'leaflet';

interface WorkerLeafletMapProps {
  workers: WorkerProfile[];
  selectedWorker: WorkerProfile | null;
  onSelectWorker: (worker: WorkerProfile) => void;
  onBookWorker: (worker: WorkerProfile) => void;
  searchRadiusKm?: number;
  userLocation?: { lat: number; lng: number };
}

export const WorkerLeafletMap: React.FC<WorkerLeafletMapProps> = ({
  workers,
  selectedWorker,
  onSelectWorker,
  onBookWorker,
  searchRadiusKm = 10,
  userLocation = { lat: 28.5800, lng: 77.2200 } // Default Central / South Delhi hub
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker icon paths in Leaflet bundlers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    // Initialize map if not yet initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 12,
        zoomControl: true,
        attributionControl: false
      });

      // OpenStreetMap tiles (CartoDB Positron / Voyager — clear civic map)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers and circle when workers or radius change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // User location marker
    const userMarkerIcon = L.divIcon({
      className: 'user-marker',
      html: `
        <div style="
          width: 20px; 
          height: 20px; 
          background: #1C3D2E; 
          border: 3px solid #FFFFFF; 
          border-radius: 50%; 
          box-shadow: 0 0 6px rgba(28, 61, 46, 0.6);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker([userLocation.lat, userLocation.lng], { icon: userMarkerIcon })
      .bindPopup(`
        <div style="padding: 4px; font-size: 12px; font-weight: 600; color: #2A2A28;">
          📍 Customer Sector Dispatch Pin
        </div>
      `)
      .addTo(markersGroup);

    // Search Radius circle
    if (circleRef.current) {
      circleRef.current.remove();
    }
    circleRef.current = L.circle([userLocation.lat, userLocation.lng], {
      radius: searchRadiusKm * 1000,
      color: '#1C3D2E',
      fillColor: '#1C3D2E',
      fillOpacity: 0.05,
      weight: 1.5,
      dashArray: '5, 5'
    }).addTo(map);

    // Add Worker Markers
    workers.forEach(worker => {
      const isSelected = selectedWorker?.id === worker.id;
      const markerBorder = worker.isEmergencyReady ? '#B91C1C' : '#1C3D2E';

      const customIcon = L.divIcon({
        className: 'custom-worker-marker',
        html: `
          <div style="
            position: relative;
            width: 36px;
            height: 36px;
            background: ${isSelected ? '#B5651D' : '#FAF7F0'};
            border: 2px solid ${markerBorder};
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(42,42,40,0.2);
            cursor: pointer;
          ">
            <img src="${worker.avatar}" style="width: 28px; height: 28px; border-radius: 2px; object-fit: cover;" />
            ${worker.isEmergencyReady ? `
              <span style="
                position: absolute; 
                top: -3px; 
                right: -3px; 
                width: 9px; 
                height: 9px; 
                background: #B91C1C; 
                border-radius: 1px; 
                border: 1px solid #ffffff;
              "></span>
            ` : ''}
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([worker.lat, worker.lng], { icon: customIcon }).addTo(markersGroup);

      // Popup content (Index Card Style)
      const popupHtml = document.createElement('div');
      popupHtml.style.padding = '0.4rem';
      popupHtml.style.minWidth = '220px';
      popupHtml.style.color = '#2A2A28';
      popupHtml.innerHTML = `
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
          <img src="${worker.avatar}" style="width: 40px; height: 40px; border-radius: 2px; object-fit: cover; border: 1px solid #8B9A8C;" />
          <div>
            <div style="font-weight: 700; font-size: 13px; color: #1C3D2E;">${worker.name}</div>
            <div style="font-size: 11px; color: #4A4D4A; text-transform: capitalize;">${worker.primaryCategory} • ★ ${worker.rating}</div>
          </div>
        </div>
        <div style="font-size: 11px; color: #6C7A6D; margin-bottom: 8px; font-family: monospace;">
          🏛️ ${worker.cooperativeSociety}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; border-top: 1px solid #E5E7EB; padding-top: 6px;">
          <span style="color: #6C7A6D;">Benchmark Rate:</span>
          <span style="font-weight: 700; color: #1C3D2E; font-family: monospace;">₹${worker.hourlyRate}/hr</span>
        </div>
      `;

      // Book button in Rust Orange (#B5651D)
      const bookBtn = document.createElement('button');
      bookBtn.innerText = 'Book Verified Artisan';
      bookBtn.style.width = '100%';
      bookBtn.style.padding = '6px';
      bookBtn.style.background = '#B5651D';
      bookBtn.style.color = '#FFFFFF';
      bookBtn.style.fontWeight = '700';
      bookBtn.style.fontSize = '12px';
      bookBtn.style.borderRadius = '3px';
      bookBtn.style.border = 'none';
      bookBtn.style.cursor = 'pointer';
      bookBtn.onclick = () => {
        onBookWorker(worker);
      };
      popupHtml.appendChild(bookBtn);

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectWorker(worker);
      });
    });

    if (selectedWorker) {
      map.flyTo([selectedWorker.lat, selectedWorker.lng], 14, { duration: 1.0 });
    }
  }, [workers, selectedWorker, searchRadiusKm, userLocation]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '440px' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '440px', borderRadius: 'var(--radius-xs)' }} />
      
      {/* Floating map legend controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          zIndex: 400,
          background: '#FAF7F0',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xs)',
          padding: '0.35rem 0.75rem',
          fontSize: '0.74rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--text-secondary)',
          boxShadow: '0 1px 3px rgba(42,42,40,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '1px', backgroundColor: 'var(--primary)' }}></span>
          <span>Verified ({workers.length})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '1px', backgroundColor: 'var(--sos-red)' }}></span>
          <span>Emergency Ready</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
          <span>Dispatch Hub</span>
        </div>
      </div>
    </div>
  );
};
