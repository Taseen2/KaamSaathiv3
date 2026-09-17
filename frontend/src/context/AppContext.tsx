import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  Language, 
  WorkerProfile, 
  ServiceCategory, 
  Booking, 
  AIInsight, 
  CooperativeStats,
  NotificationItem,
  PricingBreakdown
} from '../types';
import { initialCategories, initialWorkers, initialBookings, initialAIInsights, initialStats } from '../data/initialData';
import { translations } from '../i18n/translations';

interface AppContextType {
  user: User;
  role: UserRole;
  language: Language;
  workers: WorkerProfile[];
  categories: ServiceCategory[];
  bookings: Booking[];
  stats: CooperativeStats;
  aiInsights: AIInsight[];
  notifications: NotificationItem[];
  unreadCount: number;
  // Methods
  switchRole: (role: UserRole) => void;
  setLanguage: (lang: Language) => void;
  createBooking: (bookingData: {
    workerId: string;
    serviceId: string;
    date: string;
    timeSlot: string;
    customerNotes: string;
    customerAddress: string;
    paymentMethod: 'razorpay' | 'cash';
    isEmergency?: boolean;
  }) => Booking;
  acceptBooking: (bookingId: string) => void;
  startJob: (bookingId: string, otp: string) => { success: boolean; message: string };
  completeJob: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  verifyWorker: (workerId: string, approved: boolean) => void;
  toggleWorkerDuty: (workerId?: string) => void;
  markNotificationsAsRead: () => void;
  t: (path: string) => string;
}

const defaultUser: User = {
  id: 'usr-customer-1',
  name: 'Aarav Gupta',
  email: 'aarav.gupta@example.com',
  phone: '+91 98234 56789',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  address: 'Flat 402, Lotus Greens, Sector 78, Noida',
  city: 'Noida'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial from localStorage or fall back
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('ks_role') as UserRole) || 'customer';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('ks_lang') as Language) || 'en';
  });

  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem('ks_workers');
    return saved ? JSON.parse(saved) : initialWorkers;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('ks_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [stats, setStats] = useState<CooperativeStats>(() => {
    const saved = localStorage.getItem('ks_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  const [aiInsights] = useState<AIInsight[]>(initialAIInsights);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Cooperative Welfare Credit',
      message: 'Worker Ramesh Kumar completed job #KS-BK-8940. Rs. 20 credited to medical welfare pool.',
      time: '10 mins ago',
      read: false,
      type: 'payment'
    },
    {
      id: 'notif-2',
      title: 'AI High Demand Alert',
      message: 'High demand spike forecasted in Noida Sector 78 for Plumbing services tomorrow morning.',
      time: '35 mins ago',
      read: false,
      type: 'system'
    }
  ]);

  // Derived user according to current role
  const user: User = React.useMemo(() => {
    if (role === 'worker') {
      const activeWorker = workers[0]; // Ramesh Kumar Verma
      return {
        id: activeWorker.id,
        name: activeWorker.name,
        email: activeWorker.email,
        phone: activeWorker.phone,
        role: 'worker',
        avatar: activeWorker.avatar,
        address: activeWorker.address,
        city: 'New Delhi'
      };
    } else if (role === 'admin') {
      return {
        id: 'usr-admin-1',
        name: 'Dr. Savita Deshmukh',
        email: 'savita.admin@shramikcoop.org',
        phone: '+91 99990 00111',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        address: 'Cooperative Federation Headquarters, New Delhi',
        city: 'New Delhi'
      };
    }
    return defaultUser;
  }, [role, workers]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('ks_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('ks_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('ks_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('ks_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ks_stats', JSON.stringify(stats));
  }, [stats]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Helper translation resolver
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback: any = translations.en;
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return typeof current === 'string' ? current : path;
  };

  const createBooking = (data: {
    workerId: string;
    serviceId: string;
    date: string;
    timeSlot: string;
    customerNotes: string;
    customerAddress: string;
    paymentMethod: 'razorpay' | 'cash';
    isEmergency?: boolean;
  }): Booking => {
    const targetWorker = workers.find(w => w.id === data.workerId) || workers[0];
    const targetService = initialCategories.find(c => c.id === data.serviceId) || initialCategories[0];

    const baseRate = targetWorker.hourlyRate || targetService.basePrice;
    const travelFee = 50;
    const welfareFund = 20; // Straight to worker welfare pool
    const platformCess = Math.round(baseRate * 0.05); // 5% cooperative upkeep
    const taxable = baseRate + travelFee + welfareFund + platformCess;
    const gst = Math.round(taxable * 0.18);
    const total = taxable + gst;

    const pricing: PricingBreakdown = {
      baseRate,
      travelFee,
      welfareFund,
      platformCess,
      gst,
      total
    };

    // Generate random 4-digit OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newBookingId = `KS-BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: newBookingId,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      customerAddress: data.customerAddress || user.address || 'Noida, NCR',
      workerId: targetWorker.id,
      workerName: targetWorker.name,
      workerPhone: targetWorker.phone,
      workerAvatar: targetWorker.avatar,
      workerCategory: targetWorker.primaryCategory,
      serviceId: targetService.id,
      serviceName: targetService.name,
      date: data.date,
      timeSlot: data.timeSlot,
      status: 'confirmed', // cooperative direct match
      pricing,
      paymentStatus: data.paymentMethod === 'razorpay' ? 'paid_online' : 'cash_on_delivery',
      paymentMethod: data.paymentMethod,
      paymentTransactionId: data.paymentMethod === 'razorpay' ? `pay_rzp_${Date.now()}` : undefined,
      otp: generatedOtp,
      customerNotes: data.customerNotes,
      createdAt: new Date().toLocaleString(),
      isEmergency: data.isEmergency
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update stats
    setStats(prev => ({
      ...prev,
      totalBookings: prev.totalBookings + 1,
      fairWagesDisbursed: prev.fairWagesDisbursed + baseRate,
      welfareFundBalance: prev.welfareFundBalance + welfareFund
    }));

    // Push notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Booking Scheduled!',
        message: `Your booking with ${targetWorker.name} for ${targetService.name} is confirmed. OTP: ${generatedOtp}`,
        time: 'Just now',
        read: false,
        type: 'booking'
      },
      ...prev
    ]);

    return newBooking;
  };

  const acceptBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'confirmed' } : b))
    );
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Booking Accepted',
        message: `Worker has accepted booking ${bookingId} and is preparing to travel.`,
        time: 'Just now',
        read: false,
        type: 'booking'
      },
      ...prev
    ]);
  };

  const startJob = (bookingId: string, enteredOtp: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      return { success: false, message: 'Booking not found' };
    }
    if (booking.otp !== enteredOtp.trim()) {
      return { success: false, message: 'Incorrect OTP. Please ask the customer for the 4-digit code.' };
    }

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'in_progress' } : b))
    );

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Service Started',
        message: `Work on ${booking.serviceName} has begun after OTP verification.`,
        time: 'Just now',
        read: false,
        type: 'booking'
      },
      ...prev
    ]);

    return { success: true, message: 'OTP verified! Service started.' };
  };

  const completeJob = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'completed',
              paymentStatus: 'paid_online'
            }
          : b
      )
    );

    // Increment worker completed count
    const target = bookings.find(b => b.id === bookingId);
    if (target) {
      setWorkers(prev =>
        prev.map(w =>
          w.id === target.workerId ? { ...w, completedJobs: w.completedJobs + 1 } : w
        )
      );
    }

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Job Completed!',
        message: `Booking ${bookingId} marked as completed. Customer can now download their invoice.`,
        time: 'Just now',
        read: false,
        type: 'booking'
      },
      ...prev
    ]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  const submitReview = (bookingId: string, rating: number, comment: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          return {
            ...b,
            review: {
              rating,
              comment,
              createdAt: new Date().toLocaleDateString()
            }
          };
        }
        return b;
      })
    );

    // Recompute worker rating
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setWorkers(prev =>
        prev.map(w => {
          if (w.id === booking.workerId) {
            const newCount = w.reviewCount + 1;
            const newRating = Number(((w.rating * w.reviewCount + rating) / newCount).toFixed(2));
            return {
              ...w,
              rating: newRating,
              reviewCount: newCount
            };
          }
          return w;
        })
      );
    }
  };

  const verifyWorker = (workerId: string, approved: boolean) => {
    setWorkers(prev =>
      prev.map(w => {
        if (w.id === workerId) {
          return {
            ...w,
            kycStatus: approved ? 'verified' : 'rejected',
            nsdcCertified: approved ? true : w.nsdcCertified,
            badges: approved
              ? Array.from(new Set([...w.badges.filter(b => b !== 'Verification Pending'), 'NSDC Certified', 'Cooperative Verified']))
              : w.badges
          };
        }
        return w;
      })
    );

    if (approved) {
      setStats(prev => ({ ...prev, verifiedWorkers: prev.verifiedWorkers + 1 }));
    }
  };

  const toggleWorkerDuty = (workerId?: string) => {
    const targetId = workerId || workers[0].id;
    setWorkers(prev =>
      prev.map(w => (w.id === targetId ? { ...w, isOnline: !w.isOnline } : w))
    );
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        language,
        workers,
        categories: initialCategories,
        bookings,
        stats,
        aiInsights,
        notifications,
        unreadCount,
        switchRole,
        setLanguage,
        createBooking,
        acceptBooking,
        startJob,
        completeJob,
        cancelBooking,
        submitReview,
        verifyWorker,
        toggleWorkerDuty,
        markNotificationsAsRead,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
