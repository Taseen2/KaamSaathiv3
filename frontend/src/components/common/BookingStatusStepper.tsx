import React from 'react';
import { BookingStatus } from '../../types';
import { CheckCircle2, Clock, Navigation, Wrench, ShieldCheck } from 'lucide-react';

interface BookingStatusStepperProps {
  status: BookingStatus;
  isEmergency?: boolean;
  onAdvanceStatus?: (nextStatus: BookingStatus) => void;
  canManage?: boolean; // If worker is viewing and can update the progress
}

export const BookingStatusStepper: React.FC<BookingStatusStepperProps> = ({
  status,
  isEmergency,
  onAdvanceStatus,
  canManage = false
}) => {
  const steps = [
    { key: 'confirmed', label: '1. Confirmed', icon: <CheckCircle2 size={13} />, desc: 'Match Scheduled' },
    { key: 'en_route', label: '2. En Route', icon: <Navigation size={13} />, desc: 'Worker Traveling' },
    { key: 'in_progress', label: '3. In Progress', icon: <Wrench size={13} />, desc: 'OTP Verified' },
    { key: 'completed', label: '4. Completed', icon: <ShieldCheck size={13} />, desc: 'Disbursed' }
  ];

  const getStepIndex = (st: BookingStatus): number => {
    switch (st) {
      case 'pending': return 0;
      case 'confirmed': return 0;
      case 'en_route': return 1;
      case 'in_progress': return 2;
      case 'completed': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(status);

  if (status === 'cancelled') {
    return (
      <div style={{
        padding: '0.6rem 1rem',
        backgroundColor: '#FEF2F2',
        border: '1px solid #DC2626',
        borderRadius: 'var(--radius-xs)',
        color: '#B91C1C',
        fontSize: '0.8rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
      }}>
        <span>Cancelled Booking</span>
      </div>
    );
  }

  const progressPercent = currentIndex === 0 ? 15 : currentIndex === 1 ? 45 : currentIndex === 2 ? 75 : 100;

  return (
    <div style={{ margin: '1rem 0' }}>
      {/* Step Badges and Labels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.5rem',
        marginBottom: '0.5rem'
      }}>
        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;

          return (
            <div
              key={step.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.35rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: isCurrent ? 'var(--primary-surface)' : isDone ? 'rgba(28, 61, 46, 0.04)' : 'transparent',
                border: isCurrent ? '1px solid var(--primary)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: isCurrent ? 'var(--primary)' : isDone ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isCurrent || isDone ? 700 : 500,
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '2px',
                  backgroundColor: isDone ? 'var(--primary)' : isCurrent ? (isEmergency ? 'var(--sos-red)' : 'var(--primary)') : 'var(--bg-secondary)',
                  color: isDone || isCurrent ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem'
                }}>
                  {step.icon}
                </span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{step.label}</span>
              </div>
              <span style={{
                fontSize: '0.65rem',
                color: isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                marginTop: '0.15rem'
              }}>
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Track Bar */}
      <div style={{
        width: '100%',
        height: '5px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div
          style={{
            height: '100%',
            backgroundColor: isEmergency && currentIndex < 3 ? 'var(--sos-red)' : 'var(--primary)',
            width: `${progressPercent}%`,
            transition: 'width 0.35s ease'
          }}
        />
      </div>

      {/* Worker Dispatch Action Trigger (if worker can advance from confirmed to en route) */}
      {canManage && status === 'confirmed' && onAdvanceStatus && (
        <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onAdvanceStatus('en_route')}
            className="btn btn-primary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.78rem',
              padding: '0.35rem 0.85rem'
            }}
          >
            <Navigation size={13} />
            <span>Depart Now (Update to "Worker En Route")</span>
          </button>
        </div>
      )}
    </div>
  );
};
