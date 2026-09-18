import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import type { WorkerProfile, ServiceCategory } from '../types';
import { WorkerLeafletMap } from '../components/maps/WorkerLeafletMap';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { formatINR } from '../utils/currency';

interface FindWorkersProps {
  initialCategory?: string;
  onBookWorker: (worker: WorkerProfile) => void;
}

interface WorkerWithDistance extends WorkerProfile {
  distanceKm: number;
}

// Haversine formula to compute distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

export const FindWorkers: React.FC<FindWorkersProps> = ({
  initialCategory = 'all',
  onBookWorker
}) => {
  const { workers, categories, language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  // User location for distance calculation (Noida / Central Delhi hub)
  const userLocation = { lat: 28.5800, lng: 77.2200 };

  // Filtered workers with distance calculated
  const workersWithDistance: WorkerWithDistance[] = useMemo(() => {
    return workers.map((w: WorkerProfile) => ({
      ...w,
      distanceKm: calculateDistanceKm(userLocation.lat, userLocation.lng, w.lat, w.lng)
    }));
  }, [workers]);

  const filteredWorkers: WorkerWithDistance[] = useMemo(() => {
    return workersWithDistance.filter((w: WorkerWithDistance) => {
      // Category match
      if (selectedCategory !== 'all' && w.primaryCategory !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(query);
        const matchesSkill = w.skills.some((s: string) => s.toLowerCase().includes(query));
        const matchesAddress = w.address ? w.address.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesSkill && !matchesAddress) return false;
      }
      // Distance filter
      if (w.distanceKm > maxDistance) return false;
      // Emergency filter
      if (emergencyOnly && !w.isEmergencyReady) return false;
      // Verified filter
      if (verifiedOnly && w.kycStatus !== 'verified') return false;

      return true;
    }).sort((a: WorkerWithDistance, b: WorkerWithDistance) => a.distanceKm - b.distanceKm);
  }, [workersWithDistance, selectedCategory, searchQuery, maxDistance, emergencyOnly, verifiedOnly]);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', minHeight: '85vh' }}>
      {/* Title & Stats */}
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="stamp-official" style={{ fontSize: '0.7rem' }}>
            <ShieldCheck size={12} /> {language === 'hi' ? 'भू-सत्यापित सहकारी रोस्टर' : 'GEO-VERIFIED COOPERATIVE ROSTER'}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {language === 'hi'
              ? `${maxDistance} किमी के दायरे में ${filteredWorkers.length} संबद्ध कामगार`
              : `Showing ${filteredWorkers.length} affiliated tradespeople within ${maxDistance} km`}
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginTop: '0.35rem' }}>
          {language === 'hi' ? 'सत्यापित सहकारी कारीगर खोजें' : 'Find Verified Cooperative Workers'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {language === 'hi'
            ? 'ओपनस्ट्रीटमैप आधारित रीयल-टाइम प्रेषण। निकटता, शिल्प कौशल और सत्यापित सोसायटी संबद्धता से सीधा जुड़ाव।'
            : 'Real-time OpenStreetMap dispatch. Directly matched based on proximity, craft trade, and verified society affiliation.'}
        </p>
      </div>

      {/* Document Filter Bar */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xs)',
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {/* Top search & category row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {/* Search box */}
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by worker name, skill or locality..."
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Category Dropdown */}
          <div style={{ flex: '0 0 auto' }}>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.65rem 1rem',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem'
              }}
            >
              <option value="all">All Trade Services</option>
              {categories.map((c: ServiceCategory) => (
                <option key={c.id} value={c.id}>
                  {language === 'hi' ? c.nameHi : c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Distance Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 200px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '95px', fontFamily: 'var(--font-mono)' }}>
              Radius: <strong style={{ color: 'var(--primary)' }}>{maxDistance} km</strong>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              step="1"
              value={maxDistance}
              onChange={e => setMaxDistance(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Toggles row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem', fontSize: '0.82rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', color: emergencyOnly ? 'var(--sos-red)' : 'var(--text-secondary)', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={e => setEmergencyOnly(e.target.checked)}
              style={{ accentColor: 'var(--sos-red)', width: '15px', height: '15px' }}
            />
            <AlertTriangle size={15} /> 24/7 Emergency SOS Ready Only
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', color: verifiedOnly ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={e => setVerifiedOnly(e.target.checked)}
              style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }}
            />
            <ShieldCheck size={15} /> Verified KYC Members Only
          </label>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            <Navigation size={13} color="var(--primary)" />
            <span>Geo Center: Central Delhi / NCR Sector</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Workers List on Left, Leaflet Map on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start'
        }}
      >
        {/* Left Col: Worker Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredWorkers.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', background: '#FFFFFF' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                No cooperative workers matched your distance or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxDistance(30);
                  setEmergencyOnly(false);
                  setSearchQuery('');
                }}
                className="btn btn-outline btn-sm"
              >
                Reset Distance & Filters
              </button>
            </div>
          ) : (
            filteredWorkers.map((worker: WorkerWithDistance) => {
              const isSelected = selectedWorker?.id === worker.id;
              return (
                <div
                  key={worker.id}
                  className="card card-hover"
                  onClick={() => setSelectedWorker(worker)}
                  style={{
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                    borderWidth: isSelected ? '2px' : '1px',
                    backgroundColor: isSelected ? 'var(--surface)' : '#FFFFFF',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={worker.avatar}
                        alt={worker.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: 'var(--radius-xs)',
                          objectFit: 'cover',
                          border: '1px solid var(--border)'
                        }}
                      />
                      {worker.isEmergencyReady && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '-4px',
                            right: '-4px',
                            backgroundColor: 'var(--sos-red)',
                            borderRadius: '1px',
                            padding: '2px 4px',
                            color: '#FFFFFF'
                          }}
                          title="Ready for Emergency SOS"
                        >
                          <AlertTriangle size={10} />
                        </span>
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{worker.name}</h3>
                            {worker.kycStatus === 'verified' && (
                              <span title="Verified Cooperative Member" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                                <CheckCircle2 size={15} color="var(--primary)" />
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--primary)', textTransform: 'capitalize', fontWeight: 600 }}>
                            {worker.primaryCategory} • {worker.experienceYears} Years Exp
                          </div>
                        </div>

                        {/* Distance badge */}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            backgroundColor: 'var(--surface)',
                            color: 'var(--text-primary)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.45rem',
                            borderRadius: 'var(--radius-xs)',
                            border: '1px solid var(--border)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          <MapPin size={11} color="var(--primary)" /> {worker.distanceKm} km
                        </span>
                      </div>

                      {/* Society & Rating */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0.35rem 0' }}>
                        <span>🏛️ {worker.cooperativeSociety}</span>
                        <span>•</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#8C6F19' }}>
                          <Star size={11} fill="#8C6F19" />
                          <span style={{ fontWeight: 700 }}>{worker.rating}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                            ({worker.completedJobs} {language === 'hi' ? 'कार्य' : 'jobs'} • {worker.reviewCount} {language === 'hi' ? 'समीक्षाएं' : 'reviews'})
                          </span>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0.4rem 0' }}>
                        {worker.bio}
                      </p>

                      {/* Skills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                        {worker.skills.map((s: string, idx: number) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.68rem',
                              backgroundColor: 'var(--surface)',
                              border: '1px solid var(--border-light)',
                              padding: '0.1rem 0.4rem',
                              borderRadius: 'var(--radius-xs)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Price & Book Action */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem' }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                            Coop Rate
                          </div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                            {formatINR(worker.hourlyRate)}<span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/hr</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedWorker(worker);
                            }}
                            className="btn btn-outline btn-sm"
                          >
                            Pin on Map
                          </button>

                          {/* Primary Action in Tool-belt Rust Orange */}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onBookWorker(worker);
                            }}
                            className="btn btn-accent btn-sm"
                          >
                            Book Worker
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Col: Interactive Leaflet Map View */}
        <div
          style={{
            position: 'sticky',
            top: '110px',
            height: '620px',
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden',
            border: '2px solid var(--primary)',
            boxShadow: 'var(--shadow-subtle)',
            backgroundColor: '#FFFFFF'
          }}
        >
          <WorkerLeafletMap
            workers={filteredWorkers}
            selectedWorker={selectedWorker}
            onSelectWorker={(worker: WorkerProfile) => setSelectedWorker(worker)}
            onBookWorker={(worker: WorkerProfile) => onBookWorker(worker)}
            searchRadiusKm={maxDistance}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
};
