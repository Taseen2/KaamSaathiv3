import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Booking } from '../types';
import { BookingStatusStepper } from '../components/common/BookingStatusStepper';
import { formatINR } from '../utils/currency';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  FileText, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface CustomerDashboardProps {
  onViewInvoice: (booking: Booking) => void;
  onRateBooking: (booking: Booking) => void;
  onExploreWorkers: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onViewInvoice,
  onRateBooking,
  onExploreWorkers
}) => {
  const { bookings, user, cancelBooking } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  // Customer bookings
  const activeBookings: Booking[] = bookings.filter(
    (b: Booking) => b.status === 'pending' || b.status === 'confirmed' || b.status === 'in_progress'
  );

  const pastBookings: Booking[] = bookings.filter(
    (b: Booking) => b.status === 'completed' || b.status === 'cancelled'
  );

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-pending">Matching Worker</span>;
      case 'confirmed':
        return <span className="badge badge-verified">Assigned & Verified</span>;
      case 'in_progress':
        return (
          <span className="badge badge-verified" style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF' }}>
            Work In Progress
          </span>
        );
      case 'completed':
        return <span className="badge badge-verified">Completed</span>;
      case 'cancelled':
        return <span className="badge badge-emergency">Cancelled</span>;
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', minHeight: '85vh' }}>
      {/* Citizen Registry Banner */}
      <div
        className="card"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          borderTop: '3px solid var(--primary)',
          borderRadius: 'var(--radius-xs)',
          marginBottom: '2rem',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="stamp-official" style={{ fontSize: '0.7rem' }}>
                <ShieldCheck size={12} /> CITIZEN SERVICE REGISTER
              </span>
            </div>
            <h1 style={{ fontSize: '1.85rem', color: 'var(--primary)', marginTop: '0.2rem' }}>
              Welcome, {user.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Track scheduled services, verify arriving workers with your secure 4-digit OTP, and view audited receipts.
            </p>
          </div>

          <button onClick={onExploreWorkers} className="btn btn-accent">
            <span>Book Another Service</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '2px solid var(--border)',
          marginBottom: '2rem'
        }}
      >
        <button
          onClick={() => setActiveTab('active')}
          style={{
            padding: '0.65rem 0.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: activeTab === 'active' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'active' ? '3px solid var(--primary)' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <span>Active Bookings</span>
          <span
            style={{
              backgroundColor: activeTab === 'active' ? 'var(--primary)' : 'var(--surface)',
              color: activeTab === 'active' ? '#FFFFFF' : 'var(--text-primary)',
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {activeBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '0.65rem 0.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'history' ? '3px solid var(--primary)' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <span>Past Services & Receipts</span>
          <span
            style={{
              backgroundColor: activeTab === 'history' ? 'var(--primary)' : 'var(--surface)',
              color: activeTab === 'history' ? '#FFFFFF' : 'var(--text-primary)',
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {pastBookings.length}
          </span>
        </button>
      </div>

      {/* Tab Content: Active Bookings */}
      {activeTab === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {activeBookings.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#FFFFFF' }}>
              <CalendarCheck size={44} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>No Active Bookings</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                All scheduled services have been completed or you haven't booked one yet.
              </p>
              <button onClick={onExploreWorkers} className="btn btn-accent btn-sm">
                Explore Available Workers
              </button>
            </div>
          ) : (
            activeBookings.map((booking: Booking) => (
              <div
                key={booking.id}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderLeft: '4px solid var(--primary)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        #{booking.id}
                      </span>
                      {getStatusBadge(booking.status)}
                      {booking.isEmergency && (
                        <span className="badge badge-emergency">24/7 SOS Dispatch</span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{booking.serviceName}</h3>
                  </div>

                  {/* Secure OTP Passbook Slip */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '2px dashed var(--primary)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '0.5rem 1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      Start Job Verification OTP
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.25em', fontFamily: 'var(--font-mono)' }}>
                      {booking.otp}
                    </div>
                  </div>
                </div>

                {/* Worker & Schedule Details Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    backgroundColor: 'var(--surface)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-light)',
                    marginBottom: '1rem'
                  }}
                >
                  {/* Worker Card */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img
                      src={booking.workerAvatar}
                      alt={booking.workerName}
                      style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{booking.workerName}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--primary)' }}>Cooperative Member</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.1rem', fontFamily: 'var(--font-mono)' }}>
                        <Phone size={11} /> {booking.workerPhone}
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div style={{ fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      <Clock size={13} color="var(--primary)" />
                      <strong>{booking.date}</strong> ({booking.timeSlot})
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                      <MapPin size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{booking.customerAddress}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ fontSize: '0.82rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Total Payable Amount</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                      {formatINR(booking.pricing.total)}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--primary)' }}>
                      {booking.paymentStatus === 'paid_online' ? '✓ Paid Online (Razorpay)' : 'Cash upon Completion'}
                    </div>
                  </div>
                </div>

                {/* Synchronized 4-Stage Booking Stepper */}
                <BookingStatusStepper
                  status={booking.status}
                  isEmergency={booking.isEmergency}
                />

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="btn btn-outline btn-sm"
                      style={{ color: 'var(--sos-red)' }}
                    >
                      Cancel Booking
                    </button>
                  )}
                  <button
                    onClick={() => onViewInvoice(booking)}
                    className="btn btn-outline btn-sm"
                  >
                    <FileText size={13} /> View Official Receipt
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Past Services */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pastBookings.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', background: '#FFFFFF' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No completed services in your ledger yet.</p>
            </div>
          ) : (
            pastBookings.map((booking: Booking) => (
              <div key={booking.id} className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.25rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.85rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={booking.workerAvatar} alt={booking.workerName} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border)' }} />
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{booking.serviceName}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Serviced by {booking.workerName} on {booking.date}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                      ₹{booking.pricing.total}
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>

                {/* Review if present */}
                {booking.review ? (
                  <div style={{ backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', marginBottom: '0.85rem', border: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8C6F19', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                      {[...Array(booking.review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#8C6F19" />
                      ))}
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginLeft: '0.35rem' }}>Your Review</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      "{booking.review.comment}"
                    </p>
                  </div>
                ) : (
                  booking.status === 'completed' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', background: 'var(--surface)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Share honest feedback to support the cooperative worker's rating ledger.
                      </span>
                      <button
                        onClick={() => onRateBooking(booking)}
                        className="btn btn-accent btn-sm"
                        style={{ fontSize: '0.74rem' }}
                      >
                        <Star size={12} /> Rate Service
                      </button>
                    </div>
                  )
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
                  <button
                    onClick={() => onViewInvoice(booking)}
                    className="btn btn-primary btn-sm"
                  >
                    <FileText size={13} /> View Statutory Tax Invoice
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
