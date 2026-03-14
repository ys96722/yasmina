export type SessionStatus = 'available' | 'booked' | 'pending';
export type SessionType = 'tutoring' | 'bachata' | 'group';

export interface Session {
  id: number;
  date: string; // YYYY-MM-DD
  time: string;
  endTime: string;
  title: string;
  type: SessionType;
  status: SessionStatus;
  price: number;
  student?: string;
  spotsLeft?: number;
  description?: string;
}

export const SESSIONS: Session[] = [
  // March 16 (Monday)
  { id: 1, date: '2026-03-16', time: '4:00 PM', endTime: '5:00 PM', title: 'Spanish Tutoring', type: 'tutoring', status: 'booked', price: 60, student: 'Sofia R.' },
  { id: 2, date: '2026-03-16', time: '5:30 PM', endTime: '6:30 PM', title: 'Homework Help', type: 'tutoring', status: 'available', price: 50, description: 'General homework assistance and review' },
  // March 17 (Tuesday)
  { id: 3, date: '2026-03-17', time: '6:30 PM', endTime: '7:30 PM', title: 'Bachata Private Lesson', type: 'bachata', status: 'available', price: 75, description: 'Private one-on-one bachata lesson' },
  { id: 4, date: '2026-03-17', time: '8:00 PM', endTime: '9:00 PM', title: 'Bachata Group Class', type: 'group', status: 'available', price: 35, spotsLeft: 4, description: 'Small group bachata, max 8 students' },
  // March 19 (Thursday)
  { id: 5, date: '2026-03-19', time: '4:00 PM', endTime: '5:00 PM', title: 'Spanish Tutoring', type: 'tutoring', status: 'available', price: 60 },
  { id: 6, date: '2026-03-19', time: '5:00 PM', endTime: '6:00 PM', title: 'AP Spanish Test Prep', type: 'tutoring', status: 'pending', price: 70, student: 'Marco T.' },
  // March 21 (Saturday)
  { id: 7, date: '2026-03-21', time: '10:00 AM', endTime: '11:00 AM', title: 'Spanish Conversation', type: 'tutoring', status: 'available', price: 60 },
  { id: 8, date: '2026-03-21', time: '11:00 AM', endTime: '12:00 PM', title: 'Beginner Spanish', type: 'tutoring', status: 'booked', price: 55, student: 'Emma L.' },
  // March 24 (Tuesday)
  { id: 9, date: '2026-03-24', time: '6:30 PM', endTime: '7:30 PM', title: 'Bachata Private Lesson', type: 'bachata', status: 'available', price: 75 },
  { id: 10, date: '2026-03-24', time: '8:00 PM', endTime: '9:00 PM', title: 'Bachata Group Class', type: 'group', status: 'available', price: 35, spotsLeft: 6 },
  // March 26 (Thursday)
  { id: 11, date: '2026-03-26', time: '4:30 PM', endTime: '5:30 PM', title: 'Spanish Tutoring', type: 'tutoring', status: 'available', price: 60 },
  // March 28 (Saturday)
  { id: 12, date: '2026-03-28', time: '10:00 AM', endTime: '11:00 AM', title: 'SAT Spanish Prep', type: 'tutoring', status: 'available', price: 70 },
  { id: 13, date: '2026-03-28', time: '6:30 PM', endTime: '7:30 PM', title: 'Bachata Private Lesson', type: 'bachata', status: 'available', price: 75 },
  // March 31 (Tuesday)
  { id: 14, date: '2026-03-31', time: '6:30 PM', endTime: '7:30 PM', title: 'Bachata Private Lesson', type: 'bachata', status: 'available', price: 75 },
  { id: 15, date: '2026-03-31', time: '8:00 PM', endTime: '9:00 PM', title: 'Bachata Group Class', type: 'group', status: 'available', price: 35, spotsLeft: 8 },
];

export interface Announcement {
  id: number;
  pinned: boolean;
  title: string;
  body: string;
  date: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 1, pinned: true, title: 'Spring Schedule Now Open!', body: 'April sessions are now available for booking. Evening bachata slots fill up fast — secure your spot early.', date: '2026-03-10' },
  { id: 2, pinned: false, title: 'Spring Break — No Classes March 31', body: 'No tutoring or dance sessions on March 31. Regular schedule resumes April 16th.', date: '2026-03-08' },
  { id: 3, pinned: false, title: 'New: Group Bachata Classes Added', body: 'Group bachata classes now every Tuesday evening. Limited to 8 students per class.', date: '2026-03-01' },
];

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  details: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'tutoring',
    title: 'Spanish Tutoring',
    subtitle: 'Ages 8 & up',
    description: 'Personalized one-on-one sessions covering homework help, grammar, conversation, and test preparation.',
    price: 'From $50 / hr',
    details: ['Homework assistance', 'AP & SAT prep', 'Conversation practice', 'Grammar deep-dives'],
  },
  {
    id: 'private',
    title: 'Private Lessons',
    subtitle: 'All Levels',
    description: 'Focused Spanish lessons tailored to adults and advanced students. Grammar, fluency, and cultural immersion.',
    price: 'From $60 / hr',
    details: ['Flexible scheduling', 'Custom curriculum', 'Progress tracking', 'Cultural context'],
  },
  {
    id: 'bachata',
    title: 'Bachata Classes',
    subtitle: 'Private & Group',
    description: 'Private and small-group bachata in a warm, welcoming space. Perfect for beginners and those refining technique.',
    price: 'From $35 / class',
    details: ['Beginner-friendly', 'Footwork & timing', 'Body movement', 'Group & private'],
  },
];

export interface Review {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const REVIEWS: Review[] = [
  { id: 1, name: 'María González', role: 'Parent of Sofia, age 12', quote: 'Yasmina is the reason my daughter actually looks forward to Spanish homework. Her patience and warmth make all the difference.', rating: 5 },
  { id: 2, name: 'James Park', role: 'AP Spanish Student', quote: 'I went from a B- to a 5 on the AP exam. The way she explains grammar just clicks. Booking online made everything easier for our family.', rating: 5 },
  { id: 3, name: 'Rachel & Tom K.', role: 'Bachata Students', quote: 'We started as complete beginners and now dance at every party. Her classes are joyful, professional, and genuinely fun.', rating: 5 },
];
