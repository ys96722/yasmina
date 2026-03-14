'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#e7d7a5]/50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-white/80 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Brand */}
        <div>
          <div className="font-serif text-2xl tracking-wide text-[#8f6b00]">Studio Yasmina</div>
          <div className="text-xs text-neutral-400 tracking-wide">Spanish · Tutoring · Bachata</div>
        </div>

        {/* Nav */}
        <nav className="hidden gap-8 text-sm text-neutral-600 md:flex">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Book', id: 'calendar' },
            { label: 'About', id: 'about' },
            { label: 'Reviews', id: 'reviews' },
            { label: 'Contact', id: 'contact' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="transition-colors hover:text-[#8f6b00]"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollTo('calendar')}
          className="rounded-full bg-[#d4af37] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#c49a1a] hover:shadow-md active:scale-95"
        >
          Book a Session
        </button>
      </div>
    </header>
  );
}
