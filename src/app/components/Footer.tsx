import { NavLink } from "react-router";
import { Baby, Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="mt-auto border-t border-pink-100"
      style={{ background: "linear-gradient(135deg, #FDF2F8, #F3E8FF)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }}
              >
                <Baby className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-sm leading-none" style={{ color: "#C084FC", fontWeight: 700 }}>
                  Baby
                </span>
                <span className="block text-xs leading-none" style={{ color: "#EC4899", fontWeight: 600 }}>
                  Hypothermia
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              A multidisciplinary initiative dedicated to reducing neonatal hypothermia through
              education, research, and community outreach.
            </p>
            <div className="flex gap-2">
              {[
                {
                  href: "https://www.facebook.com/sirine.202512",
                  label: "Facebook",
                  Icon: Facebook,
                },
                {
                  href: "https://www.instagram.com/sirine_louhichii/",
                  label: "Instagram",
                  Icon: Instagram,
                },
                {
                  href: "https://www.youtube.com/@SirineLouhichi-2026",
                  label: "YouTube",
                  Icon: Youtube,
                },
                {
                  href: "https://www.linkedin.com/in/sirine-louhichi-372270384/",
                  label: "LinkedIn",
                  Icon: Linkedin,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-pink-200 text-pink-400 hover:bg-pink-100 hover:text-pink-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/members", label: "Members" },
                { to: "/videos", label: "Videos" },
                { to: "/guide", label: "Guide" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className="text-xs text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "WHO Thermal Care Guide",
                "Kangaroo Care Manual",
                "Clinical Protocols",
                "Family Guides",
                "Research Papers",
                "Training Slides",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/guide"
                    className="text-xs text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#F9A8D4" }} />
                <span className="text-xs text-gray-500">+216 28184654</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#C4B5FD" }} />
                <span className="text-xs text-gray-500">louhichisirine50@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#86EFAC" }} />
                <span className="text-xs text-gray-500">
                  4031 Av. IBN EL Jazzar<br />Sousse, Tunisia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Baby Hypothermia. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            Made with{" "}
            <Heart className="w-3 h-3 mx-1" style={{ color: "#EC4899" }} /> for newborn health
          </div>
          <div className="flex gap-4">
            <NavLink to="/privacy" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">
              Terms of Use
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
