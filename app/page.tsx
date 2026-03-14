'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Pin, Calendar as CalendarIcon } from 'lucide-react';
import Header from '@/components/Header';
import BookingModal from '@/components/BookingModal';
import { SESSIONS, ANNOUNCEMENTS, SERVICES, REVIEWS, Session } from '@/lib/mock';

// ─── Constants ───────────────────────────────────────────────────────────────

const TODAY = '2026-03-14';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_COLORS: Record<string, string> = {
  booked: 'bg-[#ecf8ef] text-[#2e7d4f]',
  available: 'bg-[#fff4d6] text-[#8f6b00]',
  pending: 'bg-[#fff1f1] text-[#b45454]',
};
const STATUS_LABELS: Record<string, string> = {
  booked: 'Paid & Booked',
  available: 'Available',
  pending: 'Awaiting Payment',
};
const TYPE_ICONS: Record<string, string> = { tutoring: '📚', bachata: '💃', group: '👥' };
const TYPE_LABELS: Record<string, string> = { tutoring: 'Tutoring', bachata: 'Bachata', group: 'Group Class' };

// ─── Calendar helpers ─────────────────────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, '0');
}

interface CalDay {
  date: string | null;
  day: number;
  isCurrentMonth: boolean;
}

function getCalendarDays(year: number, month: number): CalDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days: CalDay[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ date: null, day: prevMonthDays - i, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: `${year}-${pad(month + 1)}-${pad(d)}`, day: d, isCurrentMonth: true });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: null, day: d, isCurrentMonth: false });
  }
  return days;
}

function fmtDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

function fmtShort(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Page() {
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(2); // March (0-indexed)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookingSession, setBookingSession] = useState<Session | null>(null);

  const calDays = getCalendarDays(calYear, calMonth);
  const sessionDateSet = new Set(SESSIONS.map((s) => s.date));
  const availableDateSet = new Set(SESSIONS.filter((s) => s.status === 'available').map((s) => s.date));
  const selectedSessions = selectedDate ? SESSIONS.filter((s) => s.date === selectedDate) : [];

  const UPCOMING = SESSIONS.filter((s) => s.date > TODAY && s.status !== 'booked').slice(0, 3);

  const prevMonth = () => {
    setSelectedDate(null);
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    setSelectedDate(null);
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  };

  return (
    <>
      <Header />

      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#f6e7b2]/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />
        <div className="absolute bottom-40 left-1/3 h-72 w-72 rounded-full bg-[#f0d77c]/20 blur-3xl" />
      </div>

      <main className="relative z-10">
        {/* ─────────────────────────────── HERO ─────────────────────────────── */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-[#ead9a1] bg-white px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[#9a7600] shadow-sm">
              Spanish Teacher · Dance Instructor · Tutor
            </div>
            <h1 className="max-w-xl font-serif text-5xl leading-tight text-neutral-900 lg:text-6xl">
              Where Spanish feels natural, and dancing brings joy.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              Book private tutoring, Spanish lessons, or bachata classes — paid, confirmed, and synced to the calendar in one step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full bg-[#d4af37] px-6 py-3 font-medium text-white shadow-lg shadow-[#d4af37]/20 transition hover:scale-[1.02] hover:bg-[#c49a1a]"
              >
                View Open Sessions
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border border-[#d8c27a] bg-white px-6 py-3 font-medium text-[#8f6b00] transition hover:bg-[#fff8df]"
              >
                Meet Yasmina
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              {[['50+', 'Students'], ['3 yrs', 'Experience'], ['5.0 ★', 'Rating']].map(([val, label]) => (
                <div key={label}>
                  <div className="font-serif text-2xl font-semibold text-[#8f6b00]">{val}</div>
                  <div className="text-xs text-neutral-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions Card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#f5e5a8]/50 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#ecdca8] bg-white shadow-2xl">
              <div className="border-b border-[#f0e4bf] bg-[#fffaf0] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-neutral-800">Upcoming Sessions</div>
                    <div className="text-sm text-neutral-500">Synced with Google Calendar</div>
                  </div>
                  <div className="rounded-full bg-[#f5e6b3] px-3 py-1 text-xs font-medium text-[#8f6b00]">
                    Live Booking
                  </div>
                </div>
              </div>
              <div className="grid gap-4 p-5">
                {UPCOMING.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-[#eee3c0] bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-[#9a7600]">
                          {fmtShort(s.date)} · {s.time}
                        </div>
                        <div className="mt-0.5 text-base font-semibold text-neutral-900">{s.title}</div>
                      </div>
                      <div className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[s.status]}`}>
                        {STATUS_LABELS[s.status]}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-neutral-500">${s.price} / session</div>
                      {s.status === 'available' && (
                        <button
                          onClick={() => setBookingSession(s)}
                          className="rounded-full border border-[#d8c27a] px-4 py-2 text-sm font-medium text-[#8f6b00] transition hover:bg-[#fff8e1]"
                        >
                          Pay & Reserve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── ANNOUNCEMENTS ──────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
          {ANNOUNCEMENTS.filter((a) => a.pinned).map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-4 rounded-2xl border border-[#e8d89a] bg-[#fffbeb] px-5 py-4"
            >
              <Pin size={14} className="mt-0.5 shrink-0 text-[#c49a1a]" />
              <div>
                <span className="text-sm font-semibold text-[#8f6b00]">{a.title}</span>
                <span className="ml-2 text-sm text-neutral-600">{a.body}</span>
              </div>
            </div>
          ))}
        </section>

        {/* ─────────────────────────── SERVICES ─────────────────────────────── */}
        <section id="services" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Services</div>
              <h2 className="mt-3 font-serif text-3xl text-neutral-900 lg:text-4xl">
                Everything offered, clearly organized
              </h2>
            </div>
            <div className="hidden max-w-xs text-right text-sm text-neutral-400 lg:block">
              Click any service to see available times.
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="group rounded-[1.75rem] border border-[#eadcb2] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f8edc7] to-[#d4af37]/20 text-xl">
                  {svc.id === 'tutoring' ? '📚' : svc.id === 'private' ? '🎓' : '💃'}
                </div>
                <div className="text-xs font-medium uppercase tracking-wide text-[#9a7600]">{svc.subtitle}</div>
                <h3 className="mt-1 text-xl font-semibold text-neutral-900">{svc.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{svc.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {svc.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-neutral-500">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <div className="font-serif text-lg font-semibold text-[#8f6b00]">{svc.price}</div>
                  <button
                    onClick={() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })}
                    className="rounded-full border border-[#d8c27a] px-4 py-2 text-sm font-medium text-[#8f6b00] transition hover:bg-[#fff8e1]"
                  >
                    Book →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────── CALENDAR ─────────────────────────────── */}
        <section id="calendar" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="mb-8">
            <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Book a Session</div>
            <h2 className="mt-3 font-serif text-3xl text-neutral-900 lg:text-4xl">
              Pick a date. Pay once. You're confirmed.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Calendar Grid */}
            <div className="rounded-[2rem] border border-[#eadcb2] bg-white p-6 shadow-sm lg:p-8">
              {/* Month nav */}
              <div className="mb-6 flex items-center justify-between">
                <div className="font-serif text-2xl text-neutral-900">
                  {MONTHS[calMonth]} {calYear}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={prevMonth}
                    className="rounded-full p-2 transition hover:bg-[#f6e7b2]"
                  >
                    <ChevronLeft size={18} className="text-neutral-600" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="rounded-full p-2 transition hover:bg-[#f6e7b2]"
                  >
                    <ChevronRight size={18} className="text-neutral-600" />
                  </button>
                </div>
              </div>

              {/* Legend */}
              <div className="mb-4 flex gap-5 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" /> Booked / No sessions
                </span>
              </div>

              {/* Weekday headers */}
              <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium uppercase tracking-wide text-neutral-400">
                {WEEKDAYS.map((d) => <div key={d}>{d}</div>)}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {calDays.map((day, i) => {
                  if (!day.isCurrentMonth) {
                    return (
                      <div
                        key={i}
                        className="flex aspect-square items-center justify-center rounded-xl text-sm text-neutral-300"
                      >
                        {day.day}
                      </div>
                    );
                  }
                  const hasAvail = !!day.date && availableDateSet.has(day.date);
                  const hasSessions = !!day.date && sessionDateSet.has(day.date);
                  const isSelected = day.date === selectedDate;
                  const isToday = day.date === TODAY;

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (hasSessions && day.date) {
                          setSelectedDate(day.date === selectedDate ? null : day.date);
                        }
                      }}
                      disabled={!hasSessions}
                      className={[
                        'flex aspect-square items-center justify-center rounded-xl text-sm transition-all duration-150',
                        isSelected
                          ? 'scale-105 bg-[#d4af37] font-semibold text-white shadow-md'
                          : hasAvail
                          ? 'cursor-pointer border border-[#d4af37] bg-[#fff1bf] font-semibold text-[#7c5f00] hover:bg-[#d4af37] hover:text-white'
                          : hasSessions
                          ? 'border border-neutral-200 bg-neutral-50 text-neutral-400'
                          : 'cursor-default text-neutral-500',
                        isToday && !isSelected ? 'ring-2 ring-[#d4af37]/40 ring-offset-1' : '',
                      ]
                        .join(' ')
                        .trim()}
                    >
                      {day.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sessions Panel */}
            <div
              className={`rounded-[2rem] border border-[#eadcb2] p-6 shadow-sm transition-colors duration-300 lg:p-8 ${
                selectedDate ? 'bg-white' : 'bg-gradient-to-b from-[#fffdf7] to-[#fff8e9]'
              }`}
            >
              {!selectedDate ? (
                /* Empty state */
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f6e7b2]">
                    <CalendarIcon size={22} className="text-[#8f6b00]" />
                  </div>
                  <div className="font-serif text-xl text-neutral-700">Select a date</div>
                  <div className="mt-1.5 max-w-[200px] text-sm text-neutral-400">
                    Gold dates have open sessions. Click to view and book.
                  </div>

                  <div className="mt-8 w-full space-y-3 text-left">
                    {[
                      'Browse highlighted dates on the calendar',
                      'Pick a session and pay securely online',
                      'Session is instantly confirmed on the calendar',
                      'You get an email confirmation with all details',
                    ].map((step, idx) => (
                      <div key={step} className="flex gap-3 rounded-2xl border border-[#eadcb2] bg-white/80 p-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-xs font-semibold text-white">
                          {idx + 1}
                        </div>
                        <div className="text-sm text-neutral-600">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Sessions for selected date */
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wide text-[#9a7600]">
                        Sessions for
                      </div>
                      <div className="font-serif text-xl text-neutral-900">{fmtDate(selectedDate)}</div>
                    </div>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-xs text-neutral-400 underline-offset-2 transition hover:text-neutral-600 hover:underline"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedSessions.map((s) => (
                      <div key={s.id} className="rounded-2xl border border-[#eee3c0] bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 text-xl">{TYPE_ICONS[s.type]}</span>
                            <div>
                              <div className="text-sm font-semibold text-neutral-900">{s.title}</div>
                              <div className="mt-0.5 text-xs text-neutral-400">
                                {s.time} – {s.endTime}
                              </div>
                              {s.student && (
                                <div className="mt-0.5 text-xs text-neutral-400">
                                  Student: {s.student}
                                </div>
                              )}
                              {s.spotsLeft && (
                                <div className="mt-1 text-xs font-medium text-amber-600">
                                  {s.spotsLeft} spots left
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[s.status]}`}
                          >
                            {STATUS_LABELS[s.status]}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="font-serif text-lg font-semibold text-[#8f6b00]">${s.price}</div>
                          {s.status === 'available' && (
                            <button
                              onClick={() => setBookingSession(s)}
                              className="rounded-full bg-[#d4af37] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#c49a1a]"
                            >
                              Pay & Reserve
                            </button>
                          )}
                          {s.status === 'pending' && (
                            <button
                              onClick={() => setBookingSession(s)}
                              className="rounded-full border border-[#b45454] px-4 py-2 text-sm font-medium text-[#b45454] transition hover:bg-red-50"
                            >
                              Complete Payment
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Non-pinned Announcements */}
          <div className="mt-8 rounded-[2rem] border border-[#eadcb2] bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-4 text-sm uppercase tracking-[0.25em] text-[#9a7600]">Announcements</div>
            <div className="grid gap-4 md:grid-cols-2">
              {ANNOUNCEMENTS.filter((a) => !a.pinned).map((a) => (
                <div key={a.id} className="rounded-2xl bg-[#fff7dd] p-4">
                  <div className="mb-1.5 text-xs text-neutral-400">{fmtShort(a.date)}</div>
                  <div className="text-sm font-semibold text-neutral-800">{a.title}</div>
                  <div className="mt-1 text-sm leading-6 text-neutral-600">{a.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────── ABOUT ────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#eadcb2] bg-white p-8 shadow-sm">
              <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">About</div>
              <h2 className="mt-3 font-serif text-3xl text-neutral-900">
                Warm, accomplished, and genuinely passionate about teaching.
              </h2>
              <p className="mt-5 leading-8 text-neutral-600">
                Yasmina is a certified Spanish teacher with over three years of experience working with students of all
                ages. By day she's in the classroom building real fluency; by evening she teaches bachata with the same
                warmth and precision she brings to every lesson.
              </p>
              <p className="mt-3 leading-8 text-neutral-600">
                Families love that booking is simple, payments are transparent, and sessions are always confirmed — no
                more back-and-forth messages to check availability.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Bilingual (English / Spanish)',
                  'Certified educator',
                  'Bachata instructor',
                  'Available Mon – Sat',
                ].map((pill) => (
                  <div
                    key={pill}
                    className="rounded-2xl border border-[#efe2bc] bg-[#fffaf0] px-4 py-3 text-sm text-neutral-700"
                  >
                    ✦ {pill}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadcb2] bg-[#f9f4e6] p-8 shadow-sm">
              <div className="h-full rounded-[1.5rem] border border-[#e4d39b] bg-white p-6">
                <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">At a Glance</div>
                <div className="mt-6 space-y-4">
                  {[
                    { label: 'Students Taught', value: '50+' },
                    { label: 'Years Teaching Spanish', value: '3+' },
                    { label: 'Bachata Classes / Month', value: '12' },
                    { label: 'Average Student Rating', value: '5.0 ★' },
                    { label: 'Session Formats', value: '3 Types' },
                    { label: 'Online Booking', value: '24 / 7' },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-[#f0e4bf] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="text-sm text-neutral-500">{label}</div>
                      <div className="font-serif text-lg font-semibold text-[#8f6b00]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────── REVIEWS ──────────────────────────────── */}
        <section id="reviews" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="rounded-[2rem] border border-[#eadcb2] bg-white p-8 shadow-sm lg:p-10">
            <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Testimonials</div>
            <h2 className="mt-3 font-serif text-3xl text-neutral-900">What families are saying</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <div key={r.id} className="rounded-[1.5rem] border border-[#efe2bc] bg-[#fffaf1] p-6">
                  <div className="flex gap-0.5">
                    {Array(r.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />
                      ))}
                  </div>
                  <div className="mt-3 font-serif text-4xl leading-none text-[#d4af37]">"</div>
                  <p className="mt-2 leading-7 text-neutral-700">{r.quote}</p>
                  <div className="mt-5 border-t border-[#f0e4bf] pt-4">
                    <div className="text-sm font-semibold text-neutral-800">{r.name}</div>
                    <div className="text-xs text-neutral-400">{r.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────── FOOTER ───────────────────────────────── */}
      <footer id="contact" className="border-t border-[#e8dbae] bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-neutral-500 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <span className="font-serif text-lg text-[#8f6b00]">Studio Yasmina</span>
            <span className="ml-2">— Spanish lessons, tutoring, and bachata.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-[#8f6b00]">
              Instagram
            </a>
            <button
              onClick={() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })}
              className="transition hover:text-[#8f6b00]"
            >
              Book Now
            </button>
            <a href="mailto:hello@studioyasmina.com" className="transition hover:text-[#8f6b00]">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingSession && (
        <BookingModal session={bookingSession} onClose={() => setBookingSession(null)} />
      )}
    </>
  );
}
