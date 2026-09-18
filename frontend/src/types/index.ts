export type UserRole = 'customer' | 'worker' | 'admin' | 'guest';

export type Language = 'en' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  address?: string;
  city?: string;
}

export interface WorkerProfile extends User {
  skills: string[];
  primaryCategory: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  cooperativeSociety: string;
  membershipId: string;
  nsdcCertified: boolean;
  kycStatus: 'verified' | 'pending' | 'rejected';
  hourlyRate: number;
  baseCalloutFee: number;
  lat: number;
  lng: number;
  isOnline: boolean;
  isEmergencyReady: boolean;
  completedJobs: number;
  bio: string;
  badges: string[];
  payoutUpi?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  description: string;
  descriptionHi: string;
  basePrice: number;
  turnaroundTime: string;
  popular: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';

export interface PricingBreakdown {
  baseRate: number;
  travelFee: number;
  welfareFund: number; // Dedicated to worker medical/accident insurance
  platformCess: number; // Cooperative admin maintenance (transparent 5%)
  gst: number;
  total: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerAvatar: string;
  workerCategory: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  pricing: PricingBreakdown;
  paymentStatus: 'pending' | 'paid_online' | 'cash_on_delivery';
  paymentMethod?: 'razorpay' | 'upi' | 'cash';
  paymentTransactionId?: string;
  otp: string; // 4-digit code provided to customer to start the job
  customerNotes?: string;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
  createdAt: string;
  isEmergency?: boolean;
}

export interface AIInsight {
  locality: string;
  highDemandService: string;
  expectedDemandSurge: number; // percentage, e.g., 65%
  peakHours: string;
  confidenceScore: number;
  recommendedAction: string;
  shortageWarning: boolean;
}

export interface CooperativeStats {
  totalRegisteredWorkers: number;
  verifiedWorkers: number;
  totalBookings: number;
  fairWagesDisbursed: number;
  welfareFundBalance: number;
  customerSatisfaction: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'payment' | 'system' | 'emergency';
}
