import React, { useState } from 'react';
import { Booking } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Star, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RatingModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ booking, isOpen, onClose }) => {
  const { submitReview } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(booking.id, rating, comment);
    setSubmitted(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          border: '2px solid var(--primary)'
        }}
      >
        <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAF7F0' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
            Service Quality Ledger & Feedback
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <CheckCircle2 size={40} color="var(--primary)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                Thank you for your rating!
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Your feedback directly influences artisan cooperative dividend allocations and certification status.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                <img src={booking.workerAvatar} alt={booking.workerName} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{booking.workerName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary)' }}>{booking.serviceName}</div>
                </div>
              </div>

              {/* Star selector */}
              <div style={{ textAlign: 'center', margin: '0.35rem 0' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Rate the quality of craftsmanship & transparency:
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.45rem' }}>
                  {[1, 2, 3, 4, 5].map(star => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        style={{ color: active ? '#D4AF37' : 'var(--border)', cursor: 'pointer' }}
                      >
                        <Star size={30} fill={active ? '#D4AF37' : 'none'} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>
                  Citizen Feedback Notes
                </label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="e.g. Punctual, professional diagnostics, clean workmanship, strictly charged benchmark rates..."
                  rows={3}
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

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit to Federation Ledger
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
