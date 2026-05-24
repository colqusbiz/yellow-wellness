import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1008;
    --cream: #fffdf0;
    --warm: #fef9d7;
    --gold: #c9a800;
    --gold-light: #f0cc00;
    --stone: #7a7050;
    --rust: #b07d00;
    --bg: #0f0d00;
    --bg2: #1a1600;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Jost', sans-serif; background: var(--bg); color: var(--cream); overflow-x: hidden; }
  h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 300; }

  nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    padding: 1.2rem 3rem;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(15,13,0,0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(201,168,0,0.15);
  }
  .logo { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; letter-spacing: 0.15em; color: var(--gold-light); font-style: italic; }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a { color: var(--warm); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; transition: color 0.3s; }
  .nav-links a:hover { color: var(--gold-light); }

  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    text-align: center; padding: 6rem 2rem 4rem;
    position: relative; overflow: hidden; background: var(--bg);
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background-image: url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80');
    background-size: cover; background-position: center;
    filter: brightness(0.2) sepia(0.5);
  }
  .hero-bg::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,0,0.12) 0%, transparent 70%); }
  .hero > * { position: relative; z-index: 1; }
  .hero-eyebrow { font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1.5rem; animation: fadeUp 0.8s ease both; }
  .hero h1 { font-size: clamp(3.5rem, 9vw, 7rem); line-height: 1.05; color: var(--cream); animation: fadeUp 0.9s 0.1s ease both; }
  .hero h1 em { color: var(--gold-light); font-style: italic; }
  .hero-sub { margin-top: 1.5rem; font-size: 1rem; color: rgba(254,249,215,0.75); letter-spacing: 0.06em; font-weight: 300; max-width: 540px; line-height: 1.8; animation: fadeUp 1s 0.2s ease both; }
  .hero-cta { margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; animation: fadeUp 1s 0.35s ease both; }

  .btn-gold { padding: 0.85rem 2.5rem; background: var(--gold); color: var(--ink); border: none; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; transition: background 0.3s, transform 0.2s; text-decoration: none; display: inline-block; }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-outline { padding: 0.85rem 2.5rem; background: transparent; color: var(--cream); border: 1px solid rgba(201,168,0,0.4); cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400; transition: border-color 0.3s, color 0.3s; text-decoration: none; display: inline-block; }
  .btn-outline:hover { border-color: var(--gold-light); color: var(--gold-light); }

  .photo-strip { display: grid; grid-template-columns: 1fr 1fr; height: 380px; overflow: hidden; }
  .photo-strip-item { position: relative; overflow: hidden; }
  .photo-strip-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7) sepia(0.15); transition: transform 0.6s ease, filter 0.6s ease; }
  .photo-strip-item:hover img { transform: scale(1.04); filter: brightness(0.85) sepia(0.05); }
  .photo-strip-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,13,0,0.65), transparent); }
  .photo-caption { position: absolute; bottom: 1.5rem; left: 1.5rem; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--gold-light); font-style: italic; }
  @media (max-width: 600px) { .photo-strip { grid-template-columns: 1fr; height: auto; } .photo-strip-item { height: 240px; } }

  section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; display: block; }
  .section-title { font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 1rem; }
  .section-desc { color: var(--stone); font-size: 0.95rem; line-height: 1.8; max-width: 580px; font-weight: 300; }

  .services-category { margin-bottom: 4rem; }
  .services-category-label { font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
  .services-category-label::after { content: ''; flex: 1; height: 1px; background: rgba(201,168,0,0.2); }

  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5px; background: rgba(201,168,0,0.1); }
  .service-card { background: #130f00; padding: 2rem 2.5rem; position: relative; overflow: hidden; transition: background 0.3s; }
  .service-card:hover { background: #1e1800; }
  .service-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, var(--gold), transparent); opacity: 0; transition: opacity 0.3s; }
  .service-card:hover::after { opacity: 1; }
  .service-card h3 { font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--cream); }
  .service-card p { font-size: 0.83rem; color: var(--stone); line-height: 1.7; font-weight: 300; margin-bottom: 1.2rem; }
  .price-rows { display: flex; flex-direction: column; gap: 0.4rem; }
  .price-row { display: flex; justify-content: space-between; align-items: baseline; }
  .price-duration { font-size: 0.78rem; color: var(--stone); font-weight: 300; }
  .price-amount { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold); }
  .addon-tag { display: inline-block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; background: rgba(201,168,0,0.12); color: var(--gold); padding: 0.25rem 0.6rem; margin-bottom: 0.8rem; }

  .about-strip { background: #0d0b00; border-top: 1px solid rgba(201,168,0,0.1); border-bottom: 1px solid rgba(201,168,0,0.1); padding: 5rem 2rem; }
  .about-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: center; }
  @media (max-width: 768px) { .about-inner { grid-template-columns: 1fr; } }
  .about-num { font-family: 'Cormorant Garamond', serif; font-size: clamp(5rem, 12vw, 9rem); color: rgba(201,168,0,0.1); line-height: 1; user-select: none; }

  .booking-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  @media (max-width: 900px) { .booking-layout { grid-template-columns: 1fr; } }

  .form-group { margin-bottom: 1.5rem; }
  .form-group label { display: block; font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }
  .form-group input, .form-group select, .form-group textarea { width: 100%; background: rgba(201,168,0,0.04); border: 1px solid rgba(201,168,0,0.2); color: var(--cream); padding: 0.9rem 1rem; font-family: 'Jost', sans-serif; font-size: 0.9rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--gold); }
  .form-group select option { background: #1a1600; }
  .form-group textarea { resize: vertical; min-height: 100px; }

  .checkbox-group { display: flex; flex-direction: column; gap: 0.7rem; }
  .checkbox-item { display: flex; align-items: flex-start; gap: 0.75rem; }
  .checkbox-item input[type="checkbox"] { width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px; accent-color: var(--gold); cursor: pointer; }
  .checkbox-item span { font-size: 0.8rem; color: var(--stone); line-height: 1.5; font-weight: 300; }

  .policy-box { background: rgba(201,168,0,0.06); border: 1px solid rgba(201,168,0,0.2); padding: 1.2rem 1.5rem; margin-bottom: 1.5rem; font-size: 0.78rem; color: var(--stone); line-height: 1.7; }
  .policy-box strong { color: var(--cream); display: block; margin-bottom: 0.3rem; }
  .success-msg { background: rgba(201,168,0,0.08); border: 1px solid rgba(201,168,0,0.3); padding: 1.2rem 1.5rem; font-size: 0.85rem; color: var(--gold-light); line-height: 1.6; margin-top: 1rem; }

  .calendly-section { margin-top: 3rem; }
  .calendly-section-label { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; display: block; }
  .calendly-wrap { border: 1px solid rgba(201,168,0,0.2); overflow: hidden; background: #fff; }

  .faq-list { margin-top: 3rem; }
  .faq-item { border-bottom: 1px solid rgba(201,168,0,0.12); }
  .faq-question { width: 100%; background: none; border: none; color: var(--cream); text-align: left; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 300; padding: 1.4rem 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 1rem; transition: color 0.3s; }
  .faq-question:hover { color: var(--gold-light); }
  .faq-icon { color: var(--gold); font-size: 1.2rem; flex-shrink: 0; transition: transform 0.3s; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s; }
  .faq-answer.open { max-height: 300px; padding-bottom: 1.4rem; }
  .faq-answer p { font-size: 0.88rem; color: var(--stone); line-height: 1.8; font-weight: 300; }

  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }

  .contact-detail { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.82rem; color: var(--stone); }
  .contact-icon { font-size: 1.1rem; }

  .whatsapp-btn {
    display: inline-flex; align-items: center; gap: 0.6rem;
    background: #25D366; color: #fff;
    padding: 0.75rem 1.5rem; margin-top: 1rem;
    font-family: 'Jost', sans-serif; font-size: 0.75rem;
    letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500;
    text-decoration: none; transition: background 0.3s, transform 0.2s;
  }
  .whatsapp-btn:hover { background: #1ebe5d; transform: translateY(-2px); }

  footer { border-top: 1px solid rgba(201,168,0,0.1); padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.7rem; color: var(--stone); letter-spacing: 0.1em; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    footer { flex-direction: column; text-align: center; }
  }
`;

const SERVICES = {
  fullBody: [
    { name: "Aromatherapy Massage", desc: "A deeply relaxing treatment using a personalised blend of essential oils to ease tension, lift mood, and restore balance. Tailored to your emotional and physical needs.", prices: [{ duration: "60 min", amount: "£40" }, { duration: "90 min", amount: "£60" }] },
    { name: "Swedish Massage", desc: "The classic full-body massage using long, flowing strokes to improve circulation, ease muscle tension, and encourage deep relaxation throughout the whole body.", prices: [{ duration: "60 min", amount: "£40" }, { duration: "90 min", amount: "£60" }] },
    { name: "Deep Tissue Massage", desc: "A firmer, targeted treatment that works into the deeper layers of muscle to release chronic tension, break down knots, and address persistent areas of discomfort.", prices: [{ duration: "60 min", amount: "£50" }, { duration: "90 min", amount: "£75" }] },
  ],
  backNeckShoulder: [
    { name: "Swedish Massage", desc: "Gentle, flowing strokes focused on the back, neck and shoulders — ideal for stress relief, improving circulation, and releasing everyday tension.", prices: [{ duration: "30 min", amount: "£30" }, { duration: "60 min", amount: "£45" }] },
    { name: "Deep Tissue Massage", desc: "Targeted deep pressure work on the back, neck and shoulders to release stubborn knots, reduce chronic tension, and restore ease of movement.", prices: [{ duration: "30 min", amount: "£35" }, { duration: "60 min", amount: "£50" }] },
  ],
  addOn: [
    { name: "Foot Reflexology", desc: "A therapeutic foot treatment that works on reflex points to promote whole-body relaxation, improve circulation, and complement your massage session.", prices: [{ duration: "15 min", amount: "£15" }, { duration: "30 min", amount: "£30" }], isAddon: true },
  ],
};

const FAQS = [
  { q: "What areas of the body do you treat?", a: "We offer full body treatments for female clients, covering the back, legs, arms, and feet. Back, neck and shoulder treatments are available to all clients. For male clients, massage is focused on the back, neck and shoulder area." },
  { q: "Why do you focus on the back, neck and shoulders for male clients?", a: "This is a deliberate professional boundary set by the therapist, ensuring a clear, safe, and comfortable experience for everyone. All boundaries are communicated at the time of booking." },
  { q: "What should I tell you about my health before the session?", a: "Please disclose any allergies (especially to oils, scents, or latex), skin conditions, injuries, blood pressure issues, or any recent surgery. Pregnant clients should also let us know. This information is kept confidential and used only to tailor your treatment safely." },
  { q: "Do you offer mobile services?", a: "Mobile services are available on request and subject to individual circumstances. We consider factors such as whether the property is on the ground floor, whether adequate parking is available, and the overall suitability of the space. Please get in touch to discuss your situation." },
  { q: "What oils and scents do you use?", a: "We use professional-grade massage oils and essential oil blends including cedarwood, eucalyptus, peppermint, and lavender. If you have a known sensitivity or preference, please note this on your booking form and we will adjust accordingly." },
  { q: "Where are you based?", a: "Yellow Wellness is a home-based massage service in Wolverhampton. Sessions take place at our private treatment space. The exact address is provided upon booking confirmation." },
  { q: "How do I pay?", a: "Payment is due at the time of the session. We accept bank transfer, cash, and most major debit/credit cards. A deposit may be required for first-time bookings." },
  { q: "What is your cancellation policy?", a: "We ask for at least 24 hours' notice to cancel or reschedule. Cancellations with less than 24 hours' notice may incur a 50% charge. No-shows will be charged in full." },
  { q: "Do I need to bring anything?", a: "Nothing — we provide everything you need including fresh towels and linens. Just arrive in comfortable, loose clothing and take a few minutes to relax before your session begins." },
];

const ServiceCard = ({ service, isAddon }) => (
  <div className="service-card">
    {isAddon && <span className="addon-tag">Add-On</span>}
    <h3>{service.name}</h3>
    <p>{service.desc}</p>
    <div className="price-rows">
      {service.prices.map((p, i) => (
        <div className="price-row" key={i}>
          <span className="price-duration">{p.duration}</span>
          <span className="price-amount">{p.amount}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [consultForm, setConsultForm] = useState({ name: "", email: "", phone: "", allergies: "", conditions: "", agreePolicy: false, agreeScope: false });
  const [consultDone, setConsultDone] = useState(false);
  const [consultError, setConsultError] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactDone, setContactDone] = useState(false);

  const updateConsult = (k, v) => setConsultForm(f => ({ ...f, [k]: v }));
  const updateContact = (k, v) => setContactForm(f => ({ ...f, [k]: v }));

  const handleConsult = () => {
    if (!consultForm.name || !consultForm.email) { setConsultError("Please fill in your name and email."); return; }
    if (!consultForm.agreePolicy || !consultForm.agreeScope) { setConsultError("Please confirm both policy acknowledgements to continue."); return; }
    setConsultError("");
    setConsultDone(true);
    setTimeout(() => {
      const el = document.getElementById("calendly-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactDone(true);
  };

  useEffect(() => {
    if (consultDone) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [consultDone]);

  return (
    <>
      <style>{style}</style>

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

      <div className="hero">
        <div className="hero-bg" />
        <span className="hero-eyebrow">Home-Based Massage Therapy · Wolverhampton</span>
        <h1>Restore.<br /><em>Revive.</em><br />Renew.</h1>
        <p className="hero-sub">Yellow Wellness is a home-based massage service offering professional, therapeutic treatments in a calm and private setting — tailored to your body and your boundaries.</p>
        <div className="hero-cta">
          <a href="#booking" className="btn-gold">Book a Session</a>
          <a href="#services" className="btn-outline">View Services</a>
        </div>
      </div>

      <div className="photo-strip">
        <div className="photo-strip-item">
          <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80" alt="Treatment room" />
          <span className="photo-caption">Your treatment space</span>
        </div>
        <div className="photo-strip-item">
          <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80" alt="Essential oils" />
          <span className="photo-caption">Premium oils &amp; blends</span>
        </div>
      </div>

      <section id="services">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title">Our Treatments</h2>
        <p className="section-desc">Every session is tailored to you. Full body treatments are available to female clients. Back, neck and shoulder treatments are open to everyone.</p>

        <div className="services-category">
          <div className="services-category-label">Full Body Treatments — Female Clients</div>
          <div className="services-grid">{SERVICES.fullBody.map((s, i) => <ServiceCard key={i} service={s} />)}</div>
        </div>

        <div className="services-category">
          <div className="services-category-label">Back, Neck &amp; Shoulder — All Clients</div>
          <div className="services-grid">{SERVICES.backNeckShoulder.map((s, i) => <ServiceCard key={i} service={s} />)}</div>
        </div>

        <div className="services-category">
          <div className="services-category-label">Enhancements &amp; Add-Ons</div>
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 400px))" }}>
            {SERVICES.addOn.map((s, i) => <ServiceCard key={i} service={s} isAddon={s.isAddon} />)}
          </div>
        </div>
      </section>

      <div className="about-strip" id="about">
        <div className="about-inner">
          <div className="about-num">✦</div>
          <div>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title" style={{ maxWidth: 500 }}>A home-based service built on trust</h2>
            <p className="section-desc" style={{ marginTop: "1rem" }}>Yellow Wellness is a home-based massage service in Wolverhampton. We offer professional therapeutic treatments in a warm, private setting. Every client completes a short pre-treatment consultation to ensure their safety and comfort. Mobile services are available on request, subject to circumstances such as ground floor access and parking availability. We work within clearly defined service scopes and every treatment is delivered with professionalism and care.</p>
          </div>
        </div>
      </div>

      <div style={{ background: "#0d0b00", borderTop: "1px solid rgba(201,168,0,0.1)" }} id="faq">
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

      <section id="booking">
        <span className="section-label">Reserve Your Time</span>
        <h2 className="section-title">Book a Session</h2>
        <p className="section-desc" style={{ marginBottom: "3rem" }}>Complete your consultation below, then pick your appointment slot. All information is confidential.</p>

        <div className="booking-layout">
          <div>
            <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Step 1 — Your Details &amp; Consultation</span>

            {!consultDone ? (
              <>
                <div className="form-group"><label>Full Name *</label><input value={consultForm.name} onChange={e => updateConsult("name", e.target.value)} placeholder="Your name" /></div>
                <div className="form-group"><label>Email Address *</label><input type="email" value={consultForm.email} onChange={e => updateConsult("email", e.target.value)} placeholder="email@example.com" /></div>
                <div className="form-group"><label>Phone Number</label><input value={consultForm.phone} onChange={e => updateConsult("phone", e.target.value)} placeholder="+44 ..." /></div>
                <div className="form-group"><label>Known Allergies (oils, scents, latex)</label><input value={consultForm.allergies} onChange={e => updateConsult("allergies", e.target.value)} placeholder="e.g. nut oils, lavender, none" /></div>
                <div className="form-group"><label>Relevant Health Conditions</label><textarea value={consultForm.conditions} onChange={e => updateConsult("conditions", e.target.value)} placeholder="e.g. back injury, skin conditions, blood pressure, pregnancy..." /></div>
                <div className="policy-box">
                  <strong>Service Scope &amp; Professional Standards</strong>
                  Yellow Wellness provides therapeutic massage services only. All sessions are strictly non-sexual in nature. Any behaviour or request that falls outside the agreed service scope will result in immediate termination of the session. Full payment is required regardless of early termination due to policy breach.
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input type="checkbox" checked={consultForm.agreePolicy} onChange={e => updateConsult("agreePolicy", e.target.checked)} />
                      <span>I confirm the health and allergy information I have provided is accurate and may be used to tailor my treatment safely.</span>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" checked={consultForm.agreeScope} onChange={e => updateConsult("agreeScope", e.target.checked)} />
                      <span>I have read and agree to the service scope policy above. I understand this is a strictly therapeutic practice.</span>
                    </div>
                  </div>
                </div>
                {consultError && <p style={{ color: "#c0614a", fontSize: "0.8rem", marginBottom: "1rem" }}>{consultError}</p>}
                <button className="btn-gold" onClick={handleConsult}>Continue to Book →</button>
              </>
            ) : (
              <div className="success-msg">✓ &nbsp; Thank you, {consultForm.name}. Your consultation details have been saved. Please choose your appointment below.</div>
            )}
          </div>

          <div id="calendly-section">
            <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Step 2 — Choose Your Appointment</span>
            {!consultDone ? (
              <div style={{ padding: "2rem", border: "1px solid rgba(201,168,0,0.15)", color: "var(--stone)", fontSize: "0.85rem", lineHeight: "1.7" }}>
                Complete Step 1 first to unlock the booking calendar.
              </div>
            ) : (
              <div className="calendly-wrap">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/colqus-biz?hide_gdpr_banner=1&primary_color=c9a800"
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="contact" style={{ background: "#0d0b00", maxWidth: "100%", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="contact-grid">
            <div>
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title">Contact Us</h2>
              <p className="section-desc" style={{ marginBottom: "2rem" }}>Have a question before booking? We'd love to hear from you.</p>

              <div className="contact-detail"><span className="contact-icon">📍</span> Wolverhampton (address provided upon booking)</div>
              <div className="contact-detail"><span className="contact-icon">📧</span> hello@yellowwellness.co.uk</div>
              <div className="contact-detail"><span className="contact-icon">📞</span> Available daily, 11am–8pm</div>

              <a href="https://wa.me/447401722262" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>

            <div>
              {!contactDone ? (
                <>
                  <div className="form-group"><label>Your Name</label><input value={contactForm.name} onChange={e => updateContact("name", e.target.value)} placeholder="Name" /></div>
                  <div className="form-group"><label>Email Address</label><input type="email" value={contactForm.email} onChange={e => updateContact("email", e.target.value)} placeholder="email@example.com" /></div>
                  <div className="form-group"><label>Message</label><textarea rows={6} value={contactForm.message} onChange={e => updateContact("message", e.target.value)} placeholder="Your question or message..." /></div>
                  <button className="btn-gold" onClick={handleContact}>Send Message</button>
                </>
              ) : (
                <div className="success-msg">✓ &nbsp; Message received. We will be in touch shortly at {contactForm.email}.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--gold-light)", fontSize: "1rem" }}>Yellow Wellness</span>
        <span>© 2025 · Home-Based Massage Therapy · Wolverhampton</span>
        <span>All services are strictly therapeutic in nature</span>
      </footer>
    </>
  );
}
