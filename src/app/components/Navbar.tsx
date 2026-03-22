import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { Menu, X, Heart, Baby } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/videos", label: "Videos" },
  { to: "/guide", label: "Guide" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)",
        boxShadow: scrolled ? "0 4px 24px rgba(219,112,147,0.12)" : "0 2px 12px rgba(219,112,147,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }}
            >
              <Baby className="w-5 h-5 text-white" />
            </div>
            <div>
              <span
                className="block text-sm leading-none"
                style={{ color: "#C084FC", fontWeight: 700, letterSpacing: "0.05em" }}
              >
                Baby
              </span>
              <span
                className="block text-xs leading-none"
                style={{ color: "#EC4899", fontWeight: 600, letterSpacing: "0.08em" }}
              >
                Hypothermia
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-gray-600 hover:text-pink-500"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }
                    : {}
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
            >
              <Heart className="w-3.5 h-3.5" />
              Learn More
            </a>
            <button
              className="md:hidden p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-pink-100"
            style={{ background: "rgba(255,255,255,0.97)" }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }
                      : {}
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
