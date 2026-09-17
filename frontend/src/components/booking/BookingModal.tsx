import React, { useState } from 'react';
import { WorkerProfile, ServiceCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  worker: WorkerProfile;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  worker,
  isOpen,
  onClose,
  onBookingComplete
}) => {
  const { categories, user, createBooking, language, t } = useApp();

  const [serviceId, setServiceId] = useState<string>(worker.primaryCategory);
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [address, setAddress] = useState<string>(user.address || 'Flat 402, Lotus Greens, Sector 78, Noida');
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cash'>('razorpay');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);

  // States: 'form' | 'processing' | 'success'
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [confirmedBookingData, setConfirmedBookingData] = useState<{ id: string; otp: string } | null>(null);

  if (!isOpen) return null;

  // Calculate pricing breakdown
  const baseRate = worker.hourlyRate;
  const travelFee = 50;
  const welfareFund = 20;
  const platformCess = Math.round(baseRate * 0.05); // Capped 5% admin fee
  const emergencyFee = isEmergency ? 100 : 0;
  const subtotal = baseRate + travelFee + welfareFund + platformCess + emergencyFee;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleConfirm = () => {
    setStep('processing');

    setTimeout(() => {
      const newBooking = createBooking({
        workerId: worker.id,
        serviceId,
        date,
        timeSlot,
        customerAddress: address,
        customerNotes: notes,
        paymentMethod,
        isEmergency
      });

      setConfirmedBookingData({ id: newBooking.id, otp: newBooking.otp });
      setStep('success');

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (onBookingComplete) {
        onBookingComplete();
      }
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Modal Header: Official Cooperative Requisition Slip */}
        <div
          style={{
            padding: '1.1rem 1.5rem',
            borderBottom: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAF7F0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={worker.avatar}
              alt={worker.name}
              style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{worker.name}</h3>
                <span className="seal-badge seal-govt" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
                  <ShieldCheck size={11} /> Verified Member
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                {worker.cooperativeSociety} • ID: {worker.membershipId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--text-muted)', padding: '0.35rem', borderRadius: 'var(--radius-xs)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          {step === 'form' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Emergency Toggle */}
              {worker.isEmergencyReady && (
                <div
                  style={{
                    backgroundColor: isEmergency ? 'var(--sos-red-bg)' : 'var(--surface)',
                    border: `1px solid ${isEmergency ? 'var(--sos-red-border)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsEmergency(!isEmergency)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <AlertTriangle size={17} color={isEmergency ? 'var(--sos-red)' : 'var(--text-muted)'} />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isEmergency ? 'var(--sos-red)' : 'var(--text-primary)' }}>
                        Request 24/7 Rapid SOS Dispatch (+ ₹100)
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                        Priority artisan dispatch with diagnostic repair kit within 15-20 mins.
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={e => setIsEmergency(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--sos-red)' }}
                  />
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>
                  Service Category
                </label>
                <select
                  value={serviceId}
                  onChange={e => setServiceId(e.target.value)}
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
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {language === 'hi' ? c.nameHi : c.name} (Base Rate: ₹{c.basePrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time slot grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} /> {t('booking.dateLabel')}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={13} /> {t('booking.timeLabel')}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Service Address */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={13} /> {t('booking.addressLabel')}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="House / Flat No., Society / Street, Landmark"
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

              {/* Special Notes */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>
                  {t('booking.notesLabel')}
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Describe repair requirements, e.g. circuit tripping in bedroom, copper joint leak."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Transparent Cooperative Pricing Ledger */}
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  fontSize: '0.82rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 700, borderBottom: '1px solid var(--border-light)', paddingBottom: '0.35rem' }}>
                  <span>AUDITED COOPERATIVE PRICING LEDGER</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Tripartite Wage Compliance</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>{t('booking.baseRate')}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{baseRate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>{t('booking.travelCess')}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{travelFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {t('booking.welfareFund')} <span title="Directly credited to worker medical & accident safety reserve"><Info size={11} /></span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{welfareFund}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>{t('booking.platformFee')} (Strict 5% upkeep cap)</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{platformCess}</span>
                </div>
                {isEmergency && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--sos-red)' }}>
                    <span>Emergency Priority Rapid Surcharge</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>₹{emergencyFee}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                  <span>{t('booking.gst')} (Statutory 18%)</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{gst}</span>
                </div>
                <div
                  style={{
                    borderTop: '2px solid var(--primary)',
                    paddingTop: '0.45rem',
                    marginTop: '0.2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  <span>{t('booking.total')}</span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '1.15rem' }}>₹{total}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'block' }}>
                  Payment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    style={{
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: paymentMethod === 'razorpay' ? 'var(--primary-surface)' : 'var(--surface)',
                      border: `1px solid ${paymentMethod === 'razorpay' ? 'var(--primary)' : 'var(--border)'}`,
                      color: paymentMethod === 'razorpay' ? 'var(--primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <CreditCard size={15} />
                    <span>UPI / Online (Razorpay)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    style={{
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: paymentMethod === 'cash' ? 'var(--primary-surface)' : 'var(--surface)',
                      border: `1px solid ${paymentMethod === 'cash' ? 'var(--primary)' : 'var(--border)'}`,
                      color: paymentMethod === 'cash' ? 'var(--primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Banknote size={15} />
                    <span>Cash on Service</span>
                  </button>
                </div>
              </div>

              {/* Submit Button in Tool-belt Rust Orange (#B5651D) — Reserved for primary action */}
              <button
                type="button"
                onClick={handleConfirm}
                className="btn btn-accent btn-lg"
                style={{ width: '100%', marginTop: '0.25rem' }}
              >
                {t('booking.confirmBtn')} • ₹{total}
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '3px solid var(--border)',
                  borderTopColor: 'var(--primary)',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 1.25rem auto'
                }}
              />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                {paymentMethod === 'razorpay' ? 'Simulating Razorpay UPI Gateway...' : 'Registering Service with Labour Federation...'}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                Securing artisan schedule, generating statutory invoice and door verification OTP.
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {step === 'success' && confirmedBookingData && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--primary-surface)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  border: '1px solid var(--primary)'
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                {t('booking.bookingSuccess')}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '1.5rem' }}>
                Requisition Docket: <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>#{confirmedBookingData.id}</strong>
              </p>

              {/* OTP Card */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '2px dashed var(--primary)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
                  DOORSTEP VERIFICATION CODE FOR WORKER
                </div>
                <div
                  style={{
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    letterSpacing: '0.35em',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {confirmedBookingData.otp}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  Protect your home & service: Share this code only when {worker.name} arrives at your door.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Acknowledge & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
