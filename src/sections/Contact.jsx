import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitle from '../components/AnimatedTitle';

/* Instagram SVG with official gradient */
function IgIcon() {
  return (
    <svg viewBox="0 0 512 512" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%"  stopColor="#ffd600" />
          <stop offset="25%" stopColor="#ff6930" />
          <stop offset="50%" stopColor="#fe3b92" />
          <stop offset="75%" stopColor="#c533bb" />
          <stop offset="100%" stopColor="#4f23a5" />
        </radialGradient>
      </defs>
      <rect width="512" height="512" rx="115" fill="url(#ig-grad)" />
      {/* Outer ring */}
      <rect x="86" y="86" width="340" height="340" rx="95" fill="none" stroke="#fff" strokeWidth="36" />
      {/* Lens */}
      <circle cx="256" cy="256" r="100" fill="none" stroke="#fff" strokeWidth="36" />
      {/* Dot */}
      <circle cx="371" cy="141" r="26" fill="#fff" />
    </svg>
  );
}

/* Email SVG — envelope icon */
function MailIcon() {
  return (
    <svg viewBox="0 0 512 512" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="90" fill="#1a1a1a" />
      {/* Envelope body */}
      <rect x="60" y="140" width="392" height="232" rx="18" fill="#1a1a1a" stroke="#fff" strokeWidth="28" />
      {/* V flap */}
      <polyline
        points="60,140 256,292 452,140"
        fill="none"
        stroke="#fff"
        strokeWidth="28"
        strokeLinejoin="round"
      />
      {/* Bottom-left diagonal */}
      <line x1="60" y1="372" x2="190" y2="252" stroke="#fff" strokeWidth="24" strokeLinecap="round" />
      {/* Bottom-right diagonal */}
      <line x1="452" y1="372" x2="322" y2="252" stroke="#fff" strokeWidth="24" strokeLinecap="round" />
    </svg>
  );
}

/* GitHub SVG — official Octocat mark */
function GhIcon() {
  return (
    <svg viewBox="0 0 512 512" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="256" fill="#1a1a1a" />
      <path
        fill="#fff"
        d="M256 56C145 56 55 146.2 55 257.5c0 89.1 57.6 164.7 137.5 191.4 10 1.8 13.7-4.4 13.7-9.7 0-4.8-.2-20.6-.2-37.4-56 12.2-67.7-24.1-67.7-24.1-9.2-23.3-22.4-29.5-22.4-29.5-18.3-12.5 1.4-12.3 1.4-12.3 20.2 1.4 30.9 20.8 30.9 20.8 18 30.8 47.2 21.9 58.7 16.7 1.8-13 7-21.9 12.7-27-44.7-5.1-91.6-22.4-91.6-99.7 0-22 7.8-40 20.7-54.2-2.1-5.1-9-25.6 2-53.4 0 0 16.9-5.4 55.3 20.7 16-4.5 33.2-6.7 50.3-6.8 17 .1 34.3 2.3 50.3 6.8 38.4-26.1 55.2-20.7 55.2-20.7 11 27.8 4.1 48.3 2 53.4 12.9 14.2 20.7 32.2 20.7 54.2 0 77.5-47 94.5-91.8 99.5 7.2 6.2 13.6 18.5 13.6 37.3 0 26.9-.2 48.6-.2 55.2 0 5.4 3.6 11.6 13.8 9.7C399.5 422.1 457 346.6 457 257.5 457 146.2 367 56 256 56z"
      />
    </svg>
  );
}

/* WhatsApp SVG with official green */
function WaIcon() {
  return (
    <svg viewBox="0 0 512 512" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wa-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#25d366" />
          <stop offset="100%" stopColor="#60e87a" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="115" fill="url(#wa-grad)" />
      {/* Speech bubble + phone path — official shape */}
      <path
        fill="#fff"
        d="M256 96C165.9 96 93 168.9 93 259c0 32.4 9.3 62.6 25.4 88.2L96 416l71.1-22.7C191.4 407 223 416 256 416c90.1 0 163-72.9 163-163S346.1 96 256 96zm83.7 231.5c-3.5 9.8-20.4 18.8-28.3 19.9-7.2 1-16.3 1.4-26.3-2.1-6.1-2.1-13.9-4.9-23.9-9.6-42.1-19.7-69.6-62.5-71.7-65.4-2.1-2.9-17.1-22.7-17.1-43.4s10.8-30.8 14.6-35c3.8-4.2 8.3-5.3 11.1-5.3 2.8 0 5.6.03 8 .14 2.6.13 6-.98 9.4 7.2 3.5 8.4 11.8 29.1 12.9 31.2 1 2.1 1.7 4.6.3 7.4-1.4 2.8-2.1 4.6-4.2 7-2.1 2.4-4.4 5.4-6.3 7.2-2.1 2-4.3 4.2-1.8 8.2 2.4 4 10.9 18 23.4 29.2 16.1 14.4 29.7 18.9 33.9 21 4.2 2.1 6.6 1.7 9-1 2.4-2.8 10.5-12.2 13.3-16.4 2.8-4.2 5.6-3.5 9.4-2.1 3.8 1.4 24.3 11.5 28.5 13.6 4.2 2.1 7 3.1 8 4.9 1 1.7 1 10.1-2.5 19.9z"
      />
    </svg>
  );
}

const CONTACT_LINKS = [
  { icon: <MailIcon />, label: 'Email',     value: 'v3shn@yahoo.com',  href: 'mailto:v3shn@yahoo.com' },
  { icon: <GhIcon />, label: 'GitHub',    value: 'github.com/v3shn', href: 'https://github.com/v3shn' },
  { icon: <IgIcon />, label: 'Instagram', value: '@v3shn',           href: 'https://instagram.com/v3shn' },
  { icon: <WaIcon />, label: 'WhatsApp',  value: '+91 88848 77781',  href: 'https://wa.me/918884877781' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields!');
      return;
    }
    console.log('Form data:', form);
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="comic-section section-contact" id="contact">
      <div className="action-lines" />
      <div className="comic-section-inner">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <span className="section-eyebrow" style={{ color: 'var(--yellow-bright)' }}>
            📡 Signal Received?
          </span>
          <AnimatedTitle
            text="LET'S TEAM UP!"
            palette="teal"
            baseColor="#ffffff"
            shadow="4px 4px 0 #1a1a1a"
            underlineGradient="linear-gradient(90deg, #fde047, #0d9488, #a5f3fc)"
            burstWord="ZAP!"
            className="contact-headline"
            particles={[
              { x: -30, y: -22, char: '📡', size: '1rem',   delay: 0    },
              { x: 20,  y: -28, char: '⚡', size: '0.85rem',delay: 0.06 },
              { x: -18, y: 52,  char: '✦', size: '0.9rem', delay: 0.1  },
              { x: 110, y: 44,  char: '🤝', size: '0.85rem',delay: 0.04 },
            ]}
          />
        </motion.div>

        <div className="mt-6 contact-grid">
          {/* Left — speech bubble contact list */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
          >
            <div className="comic-panel" style={{ padding: '1.5rem', background: 'var(--white)' }}>
              <div className="comic-panel-accent" />
              <div
                style={{
                  fontFamily: 'var(--font-comic)',
                  fontSize: '1.2rem',
                  letterSpacing: 2,
                  marginBottom: '1.25rem',
                  color: 'var(--ink)',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid var(--ink)',
                  paddingBottom: '0.5rem',
                }}
              >
                Find Me At:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                {CONTACT_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="contact-link-item"
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={(e) => { if (link.href === '#') { e.preventDefault(); alert(`Connect: ${link.value}`); }}}
                  >
                    <span className="contact-link-icon" style={{ display: 'flex', alignItems: 'center' }}>{link.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-comic)', fontSize: '0.85rem', letterSpacing: 1, opacity: 0.6 }}>
                        {link.label}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>


            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
          >
            <div className="comic-panel" style={{ padding: '1.5rem', background: 'var(--white)' }}>
              <div className="comic-panel-accent" />

              <div
                style={{
                  fontFamily: 'var(--font-comic)',
                  fontSize: '1.2rem',
                  letterSpacing: 2,
                  marginBottom: '1.25rem',
                  color: 'var(--ink)',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid var(--ink)',
                  paddingBottom: '0.5rem',
                }}
              >
                Drop a Message:
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="contact-name" className="comic-label">Your Name / Handle</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="comic-input"
                    placeholder="e.g. Bruce Wayne / @batman"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="comic-label">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="comic-input"
                    placeholder="you@fortress.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="comic-label">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="comic-input"
                    placeholder="'Hey Vishnu, I have a mission for you...'"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    style={{ resize: 'vertical', minHeight: 100 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-comic btn-primary"
                  whileHover={{ scale: 1.04, rotate: -1 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ justifyContent: 'center', fontSize: '1.1rem', letterSpacing: 2 }}
                >
                  ⚡ SEND TRANSMISSION
                </motion.button>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="speech-bubble"
                    style={{ background: 'var(--green)', color: 'var(--white)', border: '3px solid var(--ink)' }}
                  >
                    ✅ Message received! I'll respond faster than a page turn.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer credit */}
        <motion.div
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            fontFamily: 'var(--font-hand)',
            fontSize: '1rem',
            color: 'var(--ink)',
            opacity: 0.6,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Crafted with ☕ + React + Three.js · © 2026 Vishnu Prasad
        </motion.div>
      </div>
    </section>
  );
}
