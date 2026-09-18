import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile } from '../../types';
import { AlertTriangle, Clock, PhoneCall, CheckCircle2, X, AlertOctagon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR } from '../../utils/currency';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmergencyBooked: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, onEmergencyBooked }) => {
  const { workers, createBooking, user } = useApp();

  // Find workers marked ready for emergency SOS
  const emergencyWorkers = workers.filter(w => w.isEmergencyReady && w.isOnline);
  const selectedWorker = emergencyWorkers[0] || workers[0];

  const [issueType, setIssueType] = useState<string>('water_leak');
  const [address, setAddress] = useState<string>(user.address || 'Flat 402, Lotus Greens, Sector 78, Noida');
  const [booked, setBooked] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');

  if (!isOpen) return null;

  const handleSOSConfirm = () => {
    const today = new Date().toISOString().split('T')[0];
    const newBooking = createBooking({
      workerId: selectedWorker.id,
      serviceId: 'emergency',
      date: today,
      timeSlot: 'Immediate Dispatch (15-20 mins)',
      customerAddress: address,
      customerNotes: `URGENT SOS: ${issueType === 'water_leak' ? 'Severe water leakage / pipe burst' : issueType === 'electrical_spark' ? 'Sparking switchboard / power blackout' : 'Emergency lock jam'}`,
      paymentMethod: 'cash',
      isEmergency: true
    });

    setOtp(newBooking.otp);
    setBooked(true);
    confetti({ particleCount: 60, spread: 70 });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          border: '3px solid var(--sos-red)',
          maxWidth: '520px',
          borderRadius: 'var(--radius-xs)',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Emergency Alert Header (Strictly distinct by design and saturated red) */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: 'var(--sos-red)',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', backgroundColor: '#7F1D1D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertOctagon size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#FFFFFF' }}>
                24/7 Priority Emergency SOS Dispatch
              </h3>
              <div style={{ fontSize: '0.72rem', color: '#FEE2E2', fontFamily: 'var(--font-mono)' }}>
                Guaranteed 15-20 Min Rapid Citizen Response
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#FFFFFF' }}><X size={20} /></button>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          {booked ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CheckCircle2 size={44} color="var(--primary)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                Emergency Artisan Unit Dispatched!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                <strong>{selectedWorker.name}</strong> is en route to your address with emergency repair equipment.
              </p>

              <div style={{ backgroundColor: 'var(--surface)', border: '2px dashed var(--primary)', borderRadius: 'var(--radius-xs)', padding: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  DOORSTEP VERIFICATION CODE
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '0.3em', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', margin: '0.25rem 0' }}>
                  {otp}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  Share this OTP only when worker arrives at your door.
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onEmergencyBooked();
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Track Dispatch in Citizen Register
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'block' }}>
                  Emergency Issue Classification
                </label>
                <select
                  value={issueType}
                  onChange={e => setIssueType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="water_leak">🚰 Major Water Pipe Burst / Flooding</option>
                  <option value="electrical_spark">⚡ Sparking Switchboard / Short Circuit Hazard</option>
                  <option value="lock_jam">🔒 Jammed Electronic Door / Lockout</option>
                  <option value="ac_smell">🔥 Acrid Burning Odor from AC Unit</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'block' }}>
                  Service Address & Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              {/* Nearest standby worker */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '0.75rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={selectedWorker.avatar} alt={selectedWorker.name} style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border)' }} />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>NEAREST STANDBY EMERGENCY RESPONDER</div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{selectedWorker.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Est. Arrival: <strong>14 minutes</strong> • {selectedWorker.cooperativeSociety}
                  </div>
                </div>
              </div>

              {/* Rate */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Statutory Emergency Benchmark Rate:</span>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{formatINR(399)}</span>
              </div>

              <button
                type="button"
                onClick={handleSOSConfirm}
                className="btn btn-sos btn-lg"
                style={{ width: '100%' }}
              >
                <AlertOctagon size={16} />
                <span>CONFIRM EMERGENCY SOS DISPATCH</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
