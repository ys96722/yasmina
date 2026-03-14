'use client';

import { useState } from 'react';
import { X, ChevronRight, CreditCard, Check, Calendar, Clock } from 'lucide-react';
import { Session } from '@/lib/mock';

interface Props {
  session: Session;
  onClose: () => void;
}

type Step = 'review' | 'info' | 'payment' | 'success';

const TYPE_META: Record<string, { bg: string; text: string; label: string }> = {
  tutoring: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Tutoring' },
  bachata: { bg: 'bg-rose-50', text: 'text-rose-700', label: 'Bachata' },
  group: { bg: 'bg-violet-50', text: 'text-violet-700', label: 'Group Class' },
};

const STEPS: Step[] = ['review', 'info', 'payment', 'success'];
const STEP_LABELS: Record<Step, string> = {
  review: 'Review',
  info: 'Your Info',
  payment: 'Payment',
  success: 'Done',
};

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function fmtCard(v: string) {
  return v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
}

function fmtExpiry(v: string) {
  return v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);
}

export default function BookingModal({ session, onClose }: Props) {
  const [step, setStep] = useState<Step>('review');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    studentName: '',
    notes: '',
    card: '',
    expiry: '',
    cvc: '',
  });

  const meta = TYPE_META[session.type];

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handlePay = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setStep('success');
  };

  const inputCls =
    'w-full rounded-xl border border-[#e5d9b3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20';

  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="animate-modal-in relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-[#f0e4bf] bg-[#fffaf0] px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-serif text-xl text-neutral-900">
                {step === 'success' ? "You're all set!" : 'Reserve Your Session'}
              </div>
              {step !== 'success' && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-400">
                  {(['review', 'info', 'payment'] as Step[]).map((s, i) => (
                    <span key={s} className="flex items-center gap-1.5">
                      {i > 0 && <span>›</span>}
                      <span className={stepIdx >= i ? 'font-medium text-[#8f6b00]' : ''}>
                        {STEP_LABELS[s]}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition hover:bg-[#f6e7b2]"
            >
              <X size={17} className="text-neutral-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* ── Step 1: Review ── */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#eee3c0] bg-[#fffaf1] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.bg} ${meta.text}`}>
                    {meta.label}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold text-neutral-900">{session.title}</div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-neutral-500">
                      <Calendar size={13} />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-sm text-neutral-500">
                      <Clock size={13} />
                      <span>
                        {session.time} – {session.endTime}
                      </span>
                    </div>
                    {session.spotsLeft && (
                      <div className="mt-2 rounded-lg bg-amber-50 px-2.5 py-1 text-xs text-amber-700">
                        Only {session.spotsLeft} spots remaining
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-2xl font-semibold text-[#8f6b00]">${session.price}</div>
                    <div className="text-xs text-neutral-400">per session</div>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-6 text-neutral-500">
                Payment is processed securely. You'll receive an email confirmation, and the session will appear on the
                calendar immediately.
              </p>
              <button
                onClick={() => setStep('info')}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d4af37] py-3.5 font-medium text-white shadow-sm transition hover:bg-[#c49a1a]"
              >
                Continue <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── Step 2: Info ── */}
          {step === 'info' && (
            <div className="space-y-4">
              <div className="grid gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Your Name
                  </label>
                  <input value={form.name} onChange={set('name')} placeholder="Full name" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Email
                  </label>
                  <input
                    value={form.email}
                    onChange={set('email')}
                    type="email"
                    placeholder="your@email.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Phone
                  </label>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    type="tel"
                    placeholder="(555) 000-0000"
                    className={inputCls}
                  />
                </div>
                {session.type === 'tutoring' && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                      Student's Name
                    </label>
                    <input
                      value={form.studentName}
                      onChange={set('studentName')}
                      placeholder="Student's full name"
                      className={inputCls}
                    />
                  </div>
                )}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={set('notes')}
                    placeholder="Any questions or special requests…"
                    rows={2}
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('review')}
                  className="flex-1 rounded-full border border-[#d8c27a] py-3 text-sm font-medium text-[#8f6b00] transition hover:bg-[#fff8e1]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('payment')}
                  disabled={!form.name || !form.email}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#d4af37] py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#c49a1a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Payment ── */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-[#eee3c0] bg-[#fffaf1] px-4 py-3">
                <div>
                  <div className="text-sm font-medium text-neutral-800">{session.title}</div>
                  <div className="text-xs text-neutral-400">
                    {session.date} · {session.time}
                  </div>
                </div>
                <div className="font-serif text-xl font-semibold text-[#8f6b00]">${session.price}</div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      value={form.card}
                      onChange={(e) => setForm((f) => ({ ...f, card: fmtCard(e.target.value) }))}
                      placeholder="1234 5678 9012 3456"
                      className={`${inputCls} pr-12 font-mono`}
                    />
                    <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                      Expiry
                    </label>
                    <input
                      value={form.expiry}
                      onChange={(e) => setForm((f) => ({ ...f, expiry: fmtExpiry(e.target.value) }))}
                      placeholder="MM / YY"
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                      CVC
                    </label>
                    <input
                      value={form.cvc}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))
                      }
                      placeholder="123"
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center text-xs text-neutral-400">
                🔒 Payments processed securely
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('info')}
                  className="flex-1 rounded-full border border-[#d8c27a] py-3 text-sm font-medium text-[#8f6b00] transition hover:bg-[#fff8e1]"
                >
                  Back
                </button>
                <button
                  onClick={handlePay}
                  disabled={loading || !form.card || !form.expiry || !form.cvc}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#d4af37] py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#c49a1a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing…
                    </>
                  ) : (
                    <>
                      Pay ${session.price} <ChevronRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Success ── */}
          {step === 'success' && (
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ecf8ef]">
                <Check size={36} className="text-[#2e7d4f]" />
              </div>
              <div>
                <div className="font-serif text-2xl text-neutral-900">Booking confirmed!</div>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  You'll receive a confirmation email shortly. The session is now visible on the calendar.
                </p>
              </div>
              <div className="rounded-2xl border border-[#eee3c0] bg-[#fffaf1] p-4 text-left">
                <div className="text-sm font-semibold text-neutral-800">{session.title}</div>
                <div className="mt-0.5 text-xs text-neutral-500">
                  {formatDate(session.date)} · {session.time} – {session.endTime}
                </div>
                <div className="mt-2">
                  <span className="rounded-full bg-[#ecf8ef] px-3 py-1 text-xs font-medium text-[#2e7d4f]">
                    Paid & Confirmed
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <button className="w-full rounded-full border border-[#d8c27a] py-3 text-sm font-medium text-[#8f6b00] transition hover:bg-[#fff8e1]">
                  + Add to My Calendar
                </button>
                <button
                  onClick={onClose}
                  className="w-full rounded-full bg-[#d4af37] py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#c49a1a]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
