import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Transformation Stories", href: "#stories" },
  { label: "Retreats & Summits",     href: "#retreats" },
  { label: "Endorsements",           href: "#endorsements" },
  { label: "About Radhika",          href: "#about" },
  { label: "Take the Scorecard",     href: "/scorecard" },
];

const CONNECT_LINKS = [
  { label: "Book a Discovery Call", href: "#" },
  { label: "WhatsApp Us",           href: "#" },
  { label: "Email Us",              href: "#" },
  { label: "LinkedIn",              href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#3A0808]">

      {/* ── Main Footer ── */}
      <div className="px-12 md:px-20 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <p className="text-[11px] font-bold tracking-[3.5px] uppercase text-white/80 mb-4">
            CXO Incubator
          </p>
          <p className="text-[11.5px] text-white/30 leading-relaxed max-w-xs">
            A leadership coaching program for senior executives and business
            owners ready to step fully into their C-suite potential. 18 batches.
            250+ leaders. 6 countries. 4 years of transformation.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p className="text-[9px] font-bold tracking-[3px] uppercase text-[#C49A3C]/70 mb-5">
            Navigate
          </p>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-[12px] text-white/35 hover:text-white/70 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <p className="text-[9px] font-bold tracking-[3px] uppercase text-[#C49A3C]/70 mb-5">
            Connect
          </p>
          <ul className="flex flex-col gap-3">
            {CONNECT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[12px] text-white/35 hover:text-white/70 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/08 px-12 md:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[10px] text-white/20">
          © 2025 CXO Incubator · Wevolve Labs · All rights reserved
        </p>
        <p className="text-[10px] italic text-[#C49A3C]/35">
          "The leader you already are."
        </p>
      </div>

    </footer>
  );
}