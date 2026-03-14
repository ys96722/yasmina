export default function GirlfriendTutoringSiteMockup() {
  return (
    <div className="min-h-screen bg-[#fffdf8] text-neutral-800">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#f6e7b2]/30 blur-3xl" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#f0d77c]/20 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-[#e7d7a5]/50 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <div className="text-2xl font-serif tracking-wide text-[#8f6b00]">Lucía Studio</div>
            <div className="text-sm text-neutral-500">Spanish • Tutoring • Bachata</div>
          </div>
          <nav className="hidden gap-8 text-sm md:flex text-neutral-600">
            <a href="#services" className="hover:text-[#8f6b00] transition">Services</a>
            <a href="#calendar" className="hover:text-[#8f6b00] transition">Book</a>
            <a href="#about" className="hover:text-[#8f6b00] transition">About</a>
            <a href="#reviews" className="hover:text-[#8f6b00] transition">Reviews</a>
          </nav>
          <button className="rounded-full border border-[#caa63d] bg-[#d4af37] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:scale-[1.02]">
            Book a Session
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-[#ead9a1] bg-white px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[#9a7600] shadow-sm">
              Warm • Elegant • Professional
            </div>
            <h1 className="max-w-xl text-5xl font-serif leading-tight text-neutral-900 lg:text-6xl">
              A graceful website for a teacher students and parents instantly trust.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              Designed for Spanish lessons, tutoring, and bachata classes — with announcements, availability, and a seamless pay-to-book flow connected to her calendar.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-[#d4af37] px-6 py-3 font-medium text-white shadow-lg shadow-[#d4af37]/20 transition hover:scale-[1.02]">
                View Availability
              </button>
              <button className="rounded-full border border-[#d8c27a] bg-white px-6 py-3 font-medium text-[#8f6b00] transition hover:bg-[#fff8df]">
                Explore Services
              </button>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                ['1:1 Tutoring', 'Kids & teens'],
                ['Spanish Lessons', 'Beginner to advanced'],
                ['Bachata Classes', 'Evening sessions'],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-2xl border border-[#ebdfb9] bg-white/90 p-4 shadow-sm">
                  <div className="text-sm font-semibold text-[#8f6b00]">{title}</div>
                  <div className="mt-1 text-xs leading-5 text-neutral-500">{subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#f5e5a8]/50 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#ecdca8] bg-white shadow-2xl">
              <div className="border-b border-[#f0e4bf] bg-[#fffaf0] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-neutral-800">Upcoming Sessions</div>
                    <div className="text-sm text-neutral-500">Synced with Google Calendar</div>
                  </div>
                  <div className="rounded-full bg-[#f5e6b3] px-3 py-1 text-xs font-medium text-[#8f6b00]">Live Booking</div>
                </div>
              </div>

              <div className="grid gap-4 p-5">
                {[
                  {
                    day: 'Monday, 4:00 PM',
                    title: 'Spanish Tutoring — Sofia R.',
                    status: 'Paid & booked',
                  },
                  {
                    day: 'Tuesday, 6:30 PM',
                    title: 'Bachata Private Lesson',
                    status: 'Available',
                  },
                  {
                    day: 'Thursday, 5:00 PM',
                    title: 'Homework Help Session',
                    status: 'Awaiting payment',
                  },
                ].map((card) => (
                  <div key={card.title} className="rounded-2xl border border-[#eee3c0] bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-[#9a7600]">{card.day}</div>
                        <div className="mt-1 text-base font-semibold text-neutral-900">{card.title}</div>
                      </div>
                      <div className={`rounded-full px-3 py-1 text-xs font-medium ${card.status === 'Paid & booked' ? 'bg-[#ecf8ef] text-[#2e7d4f]' : card.status === 'Available' ? 'bg-[#fff4d6] text-[#8f6b00]' : 'bg-[#fff1f1] text-[#b45454]'}`}>
                        {card.status}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-neutral-500">30–60 min session</div>
                      <button className="rounded-full border border-[#d8c27a] px-4 py-2 text-sm font-medium text-[#8f6b00] hover:bg-[#fff8e1]">
                        Pay & Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Services</div>
              <h2 className="mt-3 text-3xl font-serif text-neutral-900 lg:text-4xl">Beautifully organized offerings for parents and students</h2>
            </div>
            <div className="hidden max-w-md text-right text-neutral-500 lg:block">
              Clear options make booking easier and reduce back-and-forth messages.
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Spanish Tutoring',
                text: 'Homework help, conversation practice, test prep, and long-term support for students.',
              },
              {
                title: 'Private Lessons',
                text: 'One-on-one sessions with a polished booking flow, payment tracking, and automatic confirmation.',
              },
              {
                title: 'Bachata Nights',
                text: 'A softer, more expressive section for dance lessons that still feels part of the same brand.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-[#eadcb2] bg-white p-6 shadow-sm">
                <div className="mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-[#f8edc7] to-[#d4af37]/20" />
                <h3 className="text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{item.text}</p>
                <div className="mt-6 text-sm font-medium text-[#8f6b00]">Learn more →</div>
              </div>
            ))}
          </div>
        </section>

        <section id="calendar" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-[#eadcb2] bg-white p-6 shadow-sm lg:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Calendar</div>
                  <h2 className="mt-3 text-3xl font-serif text-neutral-900">Parents pick a time, pay, and instantly confirm the booking</h2>
                </div>
                <div className="hidden rounded-full border border-[#ebddaf] px-4 py-2 text-sm text-neutral-500 md:block">Embedded Calendar</div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#dcc680] bg-[#fffaf0] p-5">
                <div className="grid grid-cols-7 gap-3 text-center text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d}>{d}</div>)}
                </div>
                <div className="mt-3 grid grid-cols-7 gap-3 text-sm">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const highlighted = [8, 10, 13, 17, 21, 24].includes(i);
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-2xl border flex items-center justify-center ${highlighted ? 'border-[#d4af37] bg-[#fff1bf] text-[#7c5f00] font-semibold shadow-sm' : 'border-[#f0e6c7] bg-white text-neutral-600'}`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadcb2] bg-gradient-to-b from-[#fffdf7] to-[#fff8e9] p-6 shadow-sm lg:p-8">
              <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Flow</div>
              <h3 className="mt-3 text-2xl font-serif text-neutral-900">The exact experience she needs</h3>
              <div className="mt-6 space-y-4">
                {[
                  'Parent or student opens the site and sees available times.',
                  'They choose a session type and pay online in one step.',
                  'The paid session is added to Google Calendar automatically.',
                  'Announcements and reminders live on the same elegant homepage.',
                ].map((step, idx) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-[#eadcb2] bg-white/90 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-sm font-semibold text-white">{idx + 1}</div>
                    <div className="text-neutral-700">{step}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-[#eadcb2] bg-white p-5">
                <div className="text-sm font-semibold text-neutral-800">Announcements</div>
                <div className="mt-3 rounded-2xl bg-[#fff7dd] p-4 text-sm leading-6 text-neutral-700">
                  Spring break schedule is now open. Evening bachata slots fill quickly, so early booking is encouraged.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#eadcb2] bg-white p-8 shadow-sm">
              <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">About her</div>
              <h2 className="mt-3 text-3xl font-serif text-neutral-900">Warm, accomplished, and deeply personal</h2>
              <p className="mt-5 max-w-2xl leading-8 text-neutral-600">
                The site should feel less like a generic booking app and more like an inviting personal studio. The design balances trust for parents, clarity for scheduling, and charm for marketing.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Trusted by families', 'Calendar-linked booking', 'Payment visibility', 'Elegant bilingual brand'].map((pill) => (
                  <div key={pill} className="rounded-2xl border border-[#efe2bc] bg-[#fffaf0] px-4 py-3 text-sm text-neutral-700">
                    {pill}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadcb2] bg-[#f9f4e6] p-8 shadow-sm">
              <div className="h-full rounded-[1.5rem] border border-[#e4d39b] bg-white p-6">
                <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Visual style</div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    ['#fffdf8', 'Ivory'],
                    ['#f6e7b2', 'Soft Gold'],
                    ['#d4af37', 'Classic Gold'],
                    ['#8f6b00', 'Deep Gold'],
                  ].map(([hex, name]) => (
                    <div key={hex} className="rounded-2xl border border-[#eadcb2] bg-white p-4">
                      <div className="h-16 rounded-xl border border-neutral-200" style={{ backgroundColor: hex }} />
                      <div className="mt-3 text-sm font-medium text-neutral-800">{name}</div>
                      <div className="text-xs text-neutral-500">{hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="rounded-[2rem] border border-[#eadcb2] bg-white p-8 shadow-sm lg:p-10">
            <div className="text-sm uppercase tracking-[0.25em] text-[#9a7600]">Testimonials</div>
            <h2 className="mt-3 text-3xl font-serif text-neutral-900">A page that markets her naturally</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                'She makes Spanish feel approachable and fun. Booking has become so much easier for our family.',
                'The site feels polished and trustworthy, and paying for sessions is finally straightforward.',
                'The dance and tutoring sides both feel true to her personality — warm, graceful, and organized.',
              ].map((quote, i) => (
                <div key={i} className="rounded-[1.5rem] border border-[#efe2bc] bg-[#fffaf1] p-6">
                  <div className="text-4xl leading-none text-[#d4af37]">“</div>
                  <p className="mt-3 leading-7 text-neutral-700">{quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e8dbae] bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-neutral-500 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <span className="font-serif text-lg text-[#8f6b00]">Lucía Studio</span> — Spanish lessons, tutoring, and bachata.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#8f6b00]">Instagram</a>
            <a href="#" className="hover:text-[#8f6b00]">Calendar</a>
            <a href="#" className="hover:text-[#8f6b00]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
