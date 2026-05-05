import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Transformations", href: "#stories" },
  { label: "Retreats", href: "#retreats" },
  { label: "Voices", href: "#endorsements" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (!isHome) return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top maroon border — exactly like the design */}
      <div className="fixed top-0 left-0 right-0 z-[1001] h-[3px] bg-[#6B1A1A]" />

      <nav
        className={`fixed top-[3px] left-0 right-0 z-[1000] h-[64px] bg-white border-b border-[#6B1A1A]/20 transition-shadow duration-300 ${
          scrolled ? "shadow-sm shadow-[#6B1A1A]/10" : ""
        }`}
      >
        <div className="h-full px-8 md:px-12 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* Box mark */}
            <div className="relative w-[38px] h-[38px] border border-[#6B1A1A] flex items-center justify-center">
              <span className="text-[10px] font-bold tracking-[2px] text-[#6B1A1A]">
                CX
              </span>
              {/* Top-right corner bracket */}
              <span className="absolute -top-[3px] -right-[3px] w-[9px] h-[9px] border-t-[2.5px] border-r-[2.5px] border-[#6B1A1A]" />
            </div>

            {/* Wordmark */}
            <div className="leading-none">
              <p className="text-[13px] font-bold tracking-[3px] text-[#6B1A1A] leading-none">
                CXO
              </p>
              <p className="text-[8px] tracking-[3px] text-[#6B1A1A]/40 leading-none mt-[3px]">
                INCUBATOR
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-10">
            {isHome ? (
              NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleAnchor(link.href)}
                  className="relative group text-[9.5px] font-semibold tracking-[2.5px] uppercase text-[#6B1A1A]/40 hover:text-[#6B1A1A] transition-colors duration-200"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#C49A3C] group-hover:w-full transition-all duration-300" />
                </button>
              ))
            ) : (
              <Link
                to="/"
                className="text-[9.5px] font-semibold tracking-[2.5px] uppercase text-[#6B1A1A]/40 hover:text-[#6B1A1A] transition-colors duration-200"
              >
                ← Home
              </Link>
            )}
          </div>

          {/* ── Desktop CTA ── */}
          <Link
            to="/scorecard"
            className="hidden md:block relative overflow-hidden group px-7 py-3 text-[9.5px] font-bold tracking-[2px] uppercase bg-[#6B1A1A] text-white flex-shrink-0"
          >
            <span className="relative z-10">Take the Scorecard →</span>
            <span className="absolute inset-0 bg-[#4A1010] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 ml-4"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-[#6B1A1A] transition-all duration-300 ${menuOpen ? "w-5 rotate-45 translate-y-[9px]" : "w-5"}`} />
            <span className={`block h-px bg-[#6B1A1A] transition-all duration-300 ${menuOpen ? "opacity-0 w-2" : "w-3 ml-auto"}`} />
            <span className={`block h-px bg-[#6B1A1A] transition-all duration-300 ${menuOpen ? "w-5 -rotate-45 -translate-y-[9px]" : "w-5"}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`fixed inset-0 z-[999] transition-all duration-300 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#6B1A1A]/20 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div className={`absolute top-[67px] left-0 right-0 bg-white border-b border-[#6B1A1A]/10 transition-all duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <div className="flex flex-col px-8 py-4">
            {isHome && NAV_LINKS.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleAnchor(link.href)}
                className="flex items-center gap-3 text-left py-4 text-[9.5px] font-semibold tracking-[2.5px] uppercase text-[#6B1A1A]/40 hover:text-[#6B1A1A] border-b border-[#6B1A1A]/06 transition-colors duration-200"
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              >
                <span className="w-1 h-1 rounded-full bg-[#C49A3C] flex-shrink-0" />
                {link.label}
              </button>
            ))}

            <Link
              to="/scorecard"
              onClick={() => setMenuOpen(false)}
              className="mt-5 text-center text-[9.5px] font-bold tracking-[2px] uppercase py-3.5 bg-[#6B1A1A] text-white"
            >
              Take the Free Scorecard →
            </Link>

            <div className="mt-4 h-px bg-[#C49A3C]/25" />
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[67px]" />
    </>
  );
}