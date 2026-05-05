import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Transformation Stories', href: '#stories' },
  { label: 'Retreats & Summits', href: '#retreats' },
  { label: 'Endorsements', href: '#endorsements' },
  { label: 'About Radhika', href: '#about' },
  { label: 'Take the Scorecard', href: '/scorecard', isRoute: true },
];

const CONNECT_LINKS = [
  { label: 'Book a Discovery Call', href: 'https://calendly.com/cxoincubator/discovery-call', external: true },
  { label: 'WhatsApp Us', href: 'https://wa.me/919999999999', external: true },
  { label: 'Email Us', href: 'mailto:hello@cxoincubator.com' },
  { label: 'LinkedIn', href: '#', external: true },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="pt-16 pb-8 px-6 md:px-12" style={{ background: 'var(--maroon-deep)' }}>
      <div className="max-w-[1160px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-maroon)' }}>
                <span className="font-display text-sm text-[var(--gold-light)]">C</span>
              </div>
              <div>
                <div className="font-display text-sm tracking-[3px] text-[var(--gold-light)]">CXO INCUBATOR</div>
              </div>
            </div>
            <p className="text-[0.8rem] text-white/40 leading-[1.8] max-w-[280px]">
              A leadership coaching program for senior executives and business owners ready to step fully into their C-suite potential. 18 batches. 250+ leaders. 6 countries. 4 years of transformation.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <div className="text-[0.62rem] font-bold tracking-[2.5px] uppercase text-[var(--gold)] mb-4">Navigate</div>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-[0.78rem] text-white/40 hover:text-[var(--gold-light)] transition-colors duration-200">
                      {link.label}
                    </Link>
                  ) : (
                    <button onClick={() => scrollTo(link.href)}
                      className="text-[0.78rem] text-white/40 hover:text-[var(--gold-light)] transition-colors duration-200 text-left">
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-[0.62rem] font-bold tracking-[2.5px] uppercase text-[var(--gold)] mb-4">Connect</div>
            <ul className="flex flex-col gap-2">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[0.78rem] text-white/40 hover:text-[var(--gold-light)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-white/[0.06]">
          <p className="text-[0.68rem] text-white/20">© 2025 CXO Incubator · Wevolve Labs · All rights reserved</p>
          <p className="font-serif text-[0.9rem] italic text-white/20">"The leader you already are."</p>
        </div>
      </div>
    </footer>
  );
}
