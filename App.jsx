import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1410;
    --cream: #f5f0e8;
    --warm: #e8dcc8;
    --gold: #b8965a;
    --gold-light: #d4b07a;
    --stone: #7a6e62;
    --rust: #8b4a2f;
    --bg: #0e0b08;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--bg);
    color: var(--cream);
    overflow-x: hidden;
  }

  h1, h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    padding: 1.2rem 3rem;
    display: flex; justify-content: space-between; align-items: center;
    background: linear-gradient(to bottom, rgba(14,11,8,0.95), transparent);
    backdrop-filter: blur(2px);
  }
  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; letter-spacing: 0.15em;
    color: var(--gold); font-style: italic;
  }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    color: var(--warm); font-size: 0.75rem; letter-spacing: 0.2em;
    text-transform: uppercase; text-decoration: none;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--gold); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    text-align: center;
    padding: 6rem 2rem 4rem;
    position: relative;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(184,150,90,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 80% at 80% 60%, rgba(139,74,47,0.06) 0%, transparent 60%),
      var(--bg);
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 60px,
      rgba(184,150,90,0.015) 60px, rgba(184,150,90,0.015) 61px
    );
    pointer-events: none;
  }
  .hero-eyebrow {
    font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem;
    animation: fadeUp 0.8s ease both;
  }
  .hero h1 {
    font-size: clamp(3.5rem, 9vw, 7rem);
    line-height: 1.05; color: var(--cream);
    animation: fadeUp 0.9s 0.1s ease both;
  }
  .hero h1 em { color: var(--gold); font-style: italic; }
  .hero-sub {
    margin-top: 1.5rem; font-size: 1rem;
    color: var(--stone); letter-spacing: 0.08em; font-weight: 300;
    max-width: 480px;
    animation: fadeUp 1s 0.2s ease both;
  }
  .hero-cta {
    margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 1s 0.35s ease both;
  }
  .btn-gold {
    padding: 0.85rem 2.5rem;
    background: var(--gold); color: var(--ink);
    border: none; cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 500;
    transition: background 0.3s, transform 0.2s;
    text-decoration: none; display: inline-block;
  }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-outline {
    padding: 0.85rem 2.5rem;
    background: transparent; color: var(--cream);
    border: 1px solid rgba(245,240,232,0.3); cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 400;
    transition: border-color 0.3s, color 0.3s;
    text-decoration: none; display: inline-block;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  /* SECTIONS */
  section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }

  .section-label {
    font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.8rem; display: block;
  }
  .section-title {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    line-height: 1.1; margin-bottom: 1rem;
  }
  .section-desc {
    color: var(--stone); font-size: 0.95rem;
    line-height: 1.8; max-width: 580px; font-weight: 300;
  }

  /* SERVICES */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5px;
    margin-top: 3.5rem;
    background: rgba(184,150,90,0.15);
  }
  .service-card {
    background: #130f0b;
    padding: 2.5rem;
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .service-card:hover { background: #1a1410; }
  .service-card::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .service-card:hover::after { opacity: 1; }
  .service-tag {
    font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--rust); margin-bottom: 0.8rem; display: block;
  }
  .service-card h3 {
    font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--cream);
  }
  .service-card p {
    font-size: 0.85rem; color: var(--stone);
    line-height: 1.7; font-weight: 300; margin-bottom: 1.5rem;
  }
  .service-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; color: var(--gold);
  }
  .service-price span {
    font-size: 0.75rem; color: var(--stone);
    font-family: 'Jost', sans-serif; font-weight: 300;
  }
  .service-note {
    font-size: 0.7rem; color: rgba(122,110,98,0.7);
    margin-top: 0.3rem; font-style: italic;
  }

  /* BOOKING & CONTACT */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  @media (max-width: 768px) { .two-col { grid-template-columns: 1fr; } }

  .form-group { margin-bottom: 1.5rem; }
  .form-group label {
    display: block;
    font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.5rem;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(184,150,90,0.2);
    color: var(--cream);
    padding: 0.9rem 1rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem; font-weight: 300;
    outline: none;
    transition: border-color 0.3s;
    appearance: none;
  }
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus { border-color: var(--gold); }
  .form-group select option { background: #1a1410; }
  .form-group textarea { resize: vertical; min-height: 100px; }

  .checkbox-group { display: flex; flex-direction: column; gap: 0.7rem; }
  .checkbox-item { display: flex; align-items: flex-start; gap: 0.75rem; }
  .checkbox-item input[type="checkbox"] {
    width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px;
    accent-color: var(--gold); cursor: pointer;
  }
  .checkbox-item span {
    font-size: 0.8rem; color: var(--stone); line-height: 1.5; font-weight: 300;
  }

  .policy-box {
    background: rgba(139,74,47,0.08);
    border: 1px solid rgba(139,74,47,0.25);
    padding: 1.2rem 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.78rem; color: var(--stone); line-height: 1.7;
  }
  .policy-box strong { color: var(--cream); display: block; margin-bottom: 0.3rem; }

  .success-msg {
    background: rgba(184,150,90,0.1);
    border: 1px solid rgba(184,150,90,0.3);
    padding: 1.2rem 1.5rem;
    font-size: 0.85rem; color: var(--gold-light); line-height: 1.6;
    margin-top: 1rem;
  }

  /* ABOUT STRIP */
  .about-strip {
    background: #0c0906;
    border-top: 1px solid rgba(184,150,90,0.1);
    border-bottom: 1px solid rgba(184,150,90,0.1);
    padding: 5rem 2rem;
  }
  .about-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: center;
  }
  @media (max-width: 768px) { .about-inner { grid-template-columns: 1fr; } }
  .about-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(5rem, 12vw, 9rem);
    color: rgba(184,150,90,0.12); line-height: 1;
    user-select: none;
  }

  /* FAQ */
  .faq-list { margin-top: 3rem; }
  .faq-item { border-bottom: 1px solid rgba(184,150,90,0.15); }
  .faq-question {
    width: 100%; background: none; border: none;
    color: var(--cream); text-align: left;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-weight: 300;
    padding: 1.4rem 0;
    cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    gap: 1rem;
    transition: color 0.3s;
  }
  .faq-question:hover { color: var(--gold); }
  .faq-icon {
    color: var(--gold); font-size: 1.2rem;
    flex-shrink: 0; transition: transform 0.3s;
  }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-answer {
    max-height: 0; overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s;
  }
  .faq-answer.open { max-height: 300px; padding-bottom: 1.4rem; }
  .faq-answer p {
    font-size: 0.88rem; color: var(--stone);
    line-height: 1.8; font-weight: 300;
  }
  .faq-answer strong { color: var(--cream); }

  /* FOOTER */
  footer {
    border-top: 1px solid rgba(184,150,90,0.1);
    padding: 2rem 3rem;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
    font-size: 0.7rem; color: var(--stone); letter-spacing: 0.1em;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    footer { flex-direction: column; text-align: center; }
  }
`;

const SERVICES = [
  {
    tag: "For Women",
    name: "Full Body Massage",
    desc: "A flowing, deeply relaxing full-body treatment tailored to your needs. Includes back, legs, arms, and feet.",
    duration: "60 min",
    price: "£55",
    note: null,
  },
  {
    tag: "For Women",
    name: "Back & Shoulder Ritual",
    desc: "Targeted relief for tension held in the back, shoulders, and neck. Ideal for desk workers and busy lifestyles.",
    duration: "45 min",
    price: "£40",
    note: null,
  },
  {
    tag: "For Men",
    name: "Back Massage",
    desc: "Deep, focused work on the back — releasing tension, improving posture, and easing muscular stress.",
    duration: "30–45 min",
    price: "£35–£45",
    note: "Back only. No exceptions.",
  },
  {
    tag: "For Men",
    name: "Foot Reflexology",
    desc: "A therapeutic foot treatment drawing on reflexology principles to ease stress, improve circulation, and promote whole-body relaxation.",
    duration: "45 min",
    price: "£40",
    note: "Feet only. No exceptions.",
  },
  {
    tag: "For Women & Men",
    name: "Back + Feet Combo",
    desc: "The perfect pairing — start with back tension release, finish with a soothing reflexology foot treatment.",
    duration: "75 min",
    price: "£70",
    note: null,
  },
];

const FAQS = [
  {
    q: "What areas of the body do you treat?",
    a: "For female clients, we offer full body, back & shoulder, and foot treatments. For male clients, we provide back massage and foot reflexology only. These boundaries are firm and non-negotiable — they exist to ensure a safe and professional environment for everyone."
  },
  {
    q: "Why do you only massage the back and feet for male clients?",
    a: "This is a deliberate professional boundary set by the therapist. It ensures clarity, safety, and comfort for both the client and the practitioner. All boundaries are communicated clearly at booking and on arrival."
  },
  {
    q: "Is this a sexual service?",
    a: "Absolutely not. Yellow Wellness is a strictly therapeutic massage practice. Any request or behaviour of a sexual nature will result in the immediate termination of the session. Full payment will still be due. We ask all clients to confirm they understand this before booking."
  },
  {
    q: "What should I tell you about my health before the session?",
    a: "Please disclose any allergies (especially to oils, scents, or latex), skin conditions, injuries, blood pressure issues, or any recent surgery. Pregnant clients should also let us know. This information is kept confidential and used only to tailor your treatment safely."
  },
  {
    q: "What oils and scents do you use?",
    a: "We use professional-grade massage oils and essential oil blends including cedarwood, eucalyptus, peppermint, and lavender. If you have a known sensitivity or preference, please note this on your booking form and we will adjust accordingly."
  },
  {
    q: "Where are you based and do you travel to clients?",
    a: "We are an in-home practice based in London. Sessions take place at our private treatment space. The exact address is provided upon booking confirmation. We do not currently offer mobile visits."
  },
  {
    q: "How do I pay?",
    a: "Payment is due at the time of the session. We accept bank transfer, cash, and most major debit/credit cards. A deposit may be required for first-time bookings."
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours' notice to cancel or reschedule. Cancellations with less than 24 hours' notice may incur a 50% charge. No-shows will be charged in full."
  },
  {
    q: "Do I need to bring anything?",
    a: "Nothing — we provide everything you need including fresh towels and linens. Just arrive in comfortable, loose clothing and take a few minutes to relax before your session begins."
  },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "", email: "", phone: "", service: "",
    date: "", time: "",
    allergies: "", conditions: "",
    agreePolicy: false, agreeScope: false,
  });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const updateBooking = (k, v) => setBookingForm(f => ({ ...f, [k]: v }));
  const updateContact = (k, v) => setContactForm(f => ({ ...f, [k]: v }));

  const handleBooking = () => {
    if (!bookingForm.name || !bookingForm.email || !bookingForm.service || !bookingForm.date) {
      setBookingError("Please fill in all required fields.");
      return;
    }
    if (!bookingForm.agreePolicy || !bookingForm.agreeScope) {
      setBookingError("Please confirm both policy acknowledgements before booking.");
      return;
    }
    setBookingError("");
    setBookingDone(true);
  };

  const handleContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactDone(true);
  };

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav>
        <div className="logo">Yellow Wellness</div>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#booking">Book Now</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero">
        <span className="hero-eyebrow">In-Home Massage Therapy · London, UK</span>
        <h1>Restore.<br /><em>Revive.</em><br />Renew.</h1>
        <p className="hero-sub">
          Professional massage therapy in a calm, private setting — tailored to your body and your boundaries.
        </p>
        <div className="hero-cta">
          <a href="#booking" className="btn-gold">Book a Session</a>
          <a href="#services" className="btn-outline">View Services</a>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title">Our Treatments</h2>
        <p className="section-desc">
          Every session is professional, respectful, and clearly scoped. We believe in transparency — so all treatment boundaries are communicated upfront.
        </p>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card" key={i}>
              <span className="service-tag">{s.tag}</span>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="service-price">
                {s.price} <span>/ {s.duration}</span>
              </div>
              {s.note && <div className="service-note">⚠ {s.note}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <div className="about-strip" id="about">
        <div className="about-inner">
          <div className="about-num">✦</div>
          <div>
            <span className="section-label">Our Promise</span>
            <h2 className="section-title" style={{ maxWidth: 500 }}>
              Professional, safe, and always respectful
            </h2>
            <p className="section-desc" style={{ marginTop: "1rem" }}>
              Yellow Wellness is a private, in-home practice built on trust. Every client completes a
              short pre-treatment consultation to ensure their safety and comfort. We work within
              clearly defined service scopes — no exceptions. This practice provides therapeutic
              massage only. Any request outside of the agreed service scope will result in
              immediate termination of the session at full charge.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#0c0906", borderTop: "1px solid rgba(184,150,90,0.1)" }} id="faq">
        <section style={{ maxWidth: 800 }}>
          <span className="section-label">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">Everything you need to know before your first session.</p>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`faq-icon${openFaq === i ? " open" : ""}`}>+</span>
                </button>
                <div className={`faq-answer${openFaq === i ? " open" : ""}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* BOOKING + CONTACT */}
      <section id="booking">
        <div className="two-col">

          {/* BOOKING FORM */}
          <div>
            <span className="section-label">Reserve Your Time</span>
            <h2 className="section-title">Book a Session</h2>
            <p className="section-desc" style={{ marginBottom: "2rem" }}>
              Complete the short consultation below. All information is confidential and used only to prepare your treatment.
            </p>

            {!bookingDone ? (
              <>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input value={bookingForm.name} onChange={e => updateBooking("name", e.target.value)} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" value={bookingForm.email} onChange={e => updateBooking("email", e.target.value)} placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input value={bookingForm.phone} onChange={e => updateBooking("phone", e.target.value)} placeholder="+44 ..." />
                </div>
                <div className="form-group">
                  <label>Select Treatment *</label>
                  <select value={bookingForm.service} onChange={e => updateBooking("service", e.target.value)}>
                    <option value="">— Choose a service —</option>
                    {SERVICES.map((s, i) => (
                      <option key={i} value={s.name}>{s.name} — {s.price}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input type="date" value={bookingForm.date} onChange={e => updateBooking("date", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <input type="time" value={bookingForm.time} onChange={e => updateBooking("time", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Known Allergies (oils, scents, latex)</label>
                  <input value={bookingForm.allergies} onChange={e => updateBooking("allergies", e.target.value)} placeholder="e.g. nut oils, lavender, none" />
                </div>
                <div className="form-group">
                  <label>Relevant Health Conditions</label>
                  <textarea value={bookingForm.conditions} onChange={e => updateBooking("conditions", e.target.value)} placeholder="e.g. back injury, skin conditions, blood pressure, pregnancy..." />
                </div>

                <div className="policy-box">
                  <strong>Service Scope & Professional Standards</strong>
                  Yellow Wellness provides therapeutic massage services only. All sessions are non-sexual in nature. Any behaviour or request that falls outside the agreed service scope will result in immediate termination of the session. Full payment is required regardless of early termination due to policy breach.
                </div>

                <div className="form-group">
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input type="checkbox" id="policy" checked={bookingForm.agreePolicy} onChange={e => updateBooking("agreePolicy", e.target.checked)} />
                      <span>I confirm the health and allergy information I have provided is accurate, and I understand it will be used to personalise my treatment safely.</span>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="scope" checked={bookingForm.agreeScope} onChange={e => updateBooking("agreeScope", e.target.checked)} />
                      <span>I have read and agree to the service scope policy above. I understand this is a strictly therapeutic practice and any inappropriate conduct will result in immediate session termination at full charge.</span>
                    </div>
                  </div>
                </div>

                {bookingError && (
                  <p style={{ color: "#c0614a", fontSize: "0.8rem", marginBottom: "1rem" }}>{bookingError}</p>
                )}

                <button className="btn-gold" onClick={handleBooking}>Confirm Booking Request</button>
              </>
            ) : (
              <div className="success-msg">
                ✓ &nbsp; Thank you, {bookingForm.name}. Your booking request has been received. We'll confirm your appointment at <strong>{bookingForm.email}</strong> within 24 hours.
              </div>
            )}
          </div>

          {/* CONTACT FORM */}
          <div id="contact">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Contact Us</h2>
            <p className="section-desc" style={{ marginBottom: "2rem" }}>
              Have a question before booking? Send us a message and we'll get back to you promptly.
            </p>

            {!contactDone ? (
              <>
                <div className="form-group">
                  <label>Your Name</label>
                  <input value={contactForm.name} onChange={e => updateContact("name", e.target.value)} placeholder="Name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={contactForm.email} onChange={e => updateContact("email", e.target.value)} placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows={6} value={contactForm.message} onChange={e => updateContact("message", e.target.value)} placeholder="Your question or message..." />
                </div>
                <button className="btn-gold" onClick={handleContact}>Send Message</button>
              </>
            ) : (
              <div className="success-msg">
                ✓ &nbsp; Message received. We'll be in touch shortly at {contactForm.email}.
              </div>
            )}

            <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(184,150,90,0.15)", paddingTop: "2rem" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--stone)", lineHeight: "2", letterSpacing: "0.05em" }}>
                📍 &nbsp; London, UK (Exact address provided upon booking)<br />
                📧 &nbsp; hello@yellowwellness.co.uk<br />
                📞 &nbsp; Available Mon–Sat, 9am–7pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--gold)", fontSize: "1rem" }}>Yellow Wellness</span>
        <span>© 2025 · Professional Therapeutic Massage · London, UK</span>
        <span>All services are strictly therapeutic in nature</span>
      </footer>
    </>
  );
}
