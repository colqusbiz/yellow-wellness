import { useState, useEffect } from "react";

const COLORS = `
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
    --bg3: #0d0b00;
  }
`;

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ${COLORS}
  html { scroll-behavior: smooth; }
  body { font-family: 'Jost', sans-serif; background: var(--bg); color: var(--cream); overflow-x: hidden; }
  h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; font-weight: 300; }

  /* NAV */
  nav { position: fixed; top: 0; width: 100%; z-index: 100; padding: 1.2rem 3rem; display: flex; justify-content: space-between; align-items: center; background: rgba(15,13,0,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(201,168,0,0.15); }
  .logo { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; letter-spacing: 0.15em; color: var(--gold-light); font-style: italic; cursor: pointer; }
  .nav-links { display: flex; gap: 2rem; list-style: none; align-items: center; }
  .nav-links button { background: none; border: none; color: var(--warm); font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: color 0.3s; padding: 0; }
  .nav-links button:hover, .nav-links button.active { color: var(--gold-light); }
  .nav-book { background: var(--gold) !important; color: var(--ink) !important; padding: 0.5rem 1.2rem !important; font-weight: 600 !important; transition: background 0.3s !important; }
  .nav-book:hover { background: var(--gold-light) !important; }

  /* BUTTONS */
  .btn-gold { padding: 0.85rem 2.5rem; background: var(--gold); color: var(--ink); border: none; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; transition: background 0.3s, transform 0.2s; text-decoration: none; display: inline-block; }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-outline { padding: 0.85rem 2.5rem; background: transparent; color: var(--cream); border: 1px solid rgba(201,168,0,0.4); cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400; transition: border-color 0.3s, color 0.3s; text-decoration: none; display: inline-block; }
  .btn-outline:hover { border-color: var(--gold-light); color: var(--gold-light); }

  /* LABELS */
  .section-label { font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; display: block; }
  .section-title { font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 1rem; }
  .section-desc { color: var(--stone); font-size: 0.95rem; line-height: 1.8; font-weight: 300; }

  /* PAGE WRAPPER */
  .page { padding-top: 80px; min-height: 100vh; animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  /* HERO */
  .hero { min-height: calc(100vh - 80px); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 4rem 2rem; position: relative; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; z-index: 0; background-image: url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80'); background-size: cover; background-position: center; filter: brightness(0.2) sepia(0.4); }
  .hero-bg::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,0,0.12) 0%, transparent 70%); }
  .hero > * { position: relative; z-index: 1; }
  .hero-eyebrow { font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1.5rem; animation: fadeUp 0.8s ease both; }
  .hero h1 { font-size: clamp(3.5rem, 9vw, 7rem); line-height: 1.05; color: var(--cream); animation: fadeUp 0.9s 0.1s ease both; }
  .hero h1 em { color: var(--gold-light); font-style: italic; }
  .hero-sub { margin-top: 1.5rem; font-size: 1rem; color: rgba(254,249,215,0.75); font-weight: 300; max-width: 560px; line-height: 1.9; animation: fadeUp 1s 0.2s ease both; }
  .hero-cta { margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; animation: fadeUp 1s 0.35s ease both; }

  /* PHOTO STRIP */
  .photo-strip { display: grid; grid-template-columns: repeat(3, 1fr); height: 320px; overflow: hidden; }
  .photo-strip-item { position: relative; overflow: hidden; }
  .photo-strip-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.65) sepia(0.15); transition: transform 0.6s, filter 0.6s; }
  .photo-strip-item:hover img { transform: scale(1.05); filter: brightness(0.85); }
  .photo-strip-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,13,0,0.7), transparent 60%); }
  .photo-caption { position: absolute; bottom: 1rem; left: 1.2rem; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--gold-light); font-style: italic; }
  @media (max-width: 600px) { .photo-strip { grid-template-columns: 1fr; height: auto; } .photo-strip-item { height: 200px; } }

  /* HOME INTRO */
  .home-intro { max-width: 1100px; margin: 0 auto; padding: 6rem 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  @media (max-width: 768px) { .home-intro { grid-template-columns: 1fr; gap: 2rem; } }
  .home-intro-img { position: relative; height: 420px; overflow: hidden; }
  .home-intro-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8) sepia(0.1); }
  .home-intro-img::before { content: ''; position: absolute; inset: -8px; border: 1px solid rgba(201,168,0,0.2); z-index: 1; pointer-events: none; }

  /* SERVICE PREVIEW CARDS */
  .preview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5px; background: rgba(201,168,0,0.1); margin-top: 2rem; }
  .preview-card { background: #130f00; padding: 2rem; cursor: pointer; transition: background 0.3s; position: relative; }
  .preview-card:hover { background: #1e1800; }
  .preview-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, var(--gold), transparent); opacity: 0; transition: opacity 0.3s; }
  .preview-card:hover::after { opacity: 1; }
  .preview-card h4 { font-size: 1.3rem; color: var(--cream); margin-bottom: 0.5rem; }
  .preview-card p { font-size: 0.8rem; color: var(--stone); line-height: 1.6; margin-bottom: 1rem; font-weight: 300; }
  .preview-card-price { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: var(--gold); }

  /* SERVICES PAGE */
  .services-page { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
  .services-hero-img { width: 100%; height: 280px; object-fit: cover; filter: brightness(0.6) sepia(0.2); margin-bottom: 4rem; }
  .services-category { margin-bottom: 4rem; }
  .services-category-label { font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
  .services-category-label::after { content: ''; flex: 1; height: 1px; background: rgba(201,168,0,0.2); }
  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5px; background: rgba(201,168,0,0.1); }
  .service-card { background: #130f00; padding: 2rem 2.5rem; position: relative; overflow: hidden; transition: background 0.3s; }
  .service-card:hover { background: #1e1800; }
  .service-card h3 { font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--cream); }
  .service-card p { font-size: 0.83rem; color: var(--stone); line-height: 1.7; font-weight: 300; margin-bottom: 1.2rem; }
  .price-rows { display: flex; flex-direction: column; gap: 0.4rem; }
  .price-row { display: flex; justify-content: space-between; align-items: baseline; }
  .price-duration { font-size: 0.78rem; color: var(--stone); font-weight: 300; }
  .price-amount { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold); }
  .addon-tag { display: inline-block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; background: rgba(201,168,0,0.12); color: var(--gold); padding: 0.25rem 0.6rem; margin-bottom: 0.8rem; }

  /* ABOUT PAGE */
  .about-page { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
  .about-bio { display: grid; grid-template-columns: 1fr 1.4fr; gap: 5rem; align-items: start; margin-bottom: 5rem; }
  @media (max-width: 768px) { .about-bio { grid-template-columns: 1fr; } }
  .about-img { position: relative; height: 500px; overflow: hidden; }
  .about-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8) sepia(0.1); }
  .about-img::before { content: ''; position: absolute; inset: -8px; border: 1px solid rgba(201,168,0,0.2); z-index: 1; pointer-events: none; }
  .about-text p { color: var(--stone); font-size: 0.95rem; line-height: 1.9; font-weight: 300; margin-bottom: 1.2rem; }
  .cert-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(201,168,0,0.08); border: 1px solid rgba(201,168,0,0.2); padding: 0.5rem 1rem; font-size: 0.75rem; color: var(--gold); letter-spacing: 0.1em; margin-top: 1rem; }
  .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5px; background: rgba(201,168,0,0.1); margin-top: 3rem; }
  .value-card { background: #130f00; padding: 2rem; }
  .value-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .value-card h4 { font-size: 1.2rem; color: var(--cream); margin-bottom: 0.5rem; }
  .value-card p { font-size: 0.8rem; color: var(--stone); line-height: 1.6; font-weight: 300; }

  /* BOOKING PAGE */
  .booking-page { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
  .booking-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; margin-top: 3rem; }
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
  .calendly-wrap { border: 1px solid rgba(201,168,0,0.2); overflow: hidden; background: #fff; }
  .calendly-locked { padding: 3rem 2rem; border: 1px solid rgba(201,168,0,0.15); color: var(--stone); font-size: 0.85rem; line-height: 1.7; text-align: center; }

  /* FEEDBACK PAGE */
  .feedback-page { max-width: 700px; margin: 0 auto; padding: 5rem 2rem; }
  .star-group { margin-bottom: 2rem; }
  .star-group label { display: block; font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
  .stars { display: flex; gap: 0.5rem; }
  .star { font-size: 2rem; cursor: pointer; color: rgba(201,168,0,0.2); transition: color 0.2s; user-select: none; }
  .star.active { color: var(--gold-light); }
  .star:hover { color: var(--gold); }

  /* CONTACT PAGE */
  .contact-page { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
  .contact-detail { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; }
  .contact-detail-icon { font-size: 1.2rem; margin-top: 2px; }
  .contact-detail-text { font-size: 0.88rem; color: var(--stone); line-height: 1.6; }
  .contact-detail-text strong { color: var(--cream); display: block; font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 300; margin-bottom: 0.2rem; }
  .whatsapp-btn { display: inline-flex; align-items: center; gap: 0.6rem; background: #25D366; color: #fff; padding: 0.85rem 1.8rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; text-decoration: none; transition: background 0.3s, transform 0.2s; margin-top: 1.5rem; border: none; cursor: pointer; }
  .whatsapp-btn:hover { background: #1ebe5d; transform: translateY(-2px); }

  /* FOOTER */
  footer { border-top: 1px solid rgba(201,168,0,0.1); padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.7rem; color: var(--stone); letter-spacing: 0.1em; }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { gap: 1rem; }
    .nav-links button { font-size: 0.65rem; }
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

const FEEDBACK_QUESTIONS = [
  { id: "treatment", label: "How was your overall treatment?" },
  { id: "therapist", label: "How was your therapist?" },
  { id: "ambiance", label: "How was the ambiance?" },
  { id: "relaxed", label: "How relaxed did you feel afterwards?" },
  { id: "value", label: "How would you rate the value for money?" },
];

const ServiceCard = ({ service }) => (
  <div className="service-card">
    {service.isAddon && <span className="addon-tag">Add-On</span>}
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

const StarRating = ({ value, onChange }) => (
  <div className="stars">
    {[1,2,3,4,5].map(n => (
      <span key={n} className={`star${value >= n ? " active" : ""}`} onClick={() => onChange(n)}>★</span>
    ))}
  </div>
);

export default function App() {
  const WA_NUMBER = "447394863714";
  const [page, setPage] = useState("home");
  const [bookingType, setBookingType] = useState(null);
  const [newForm, setNewForm] = useState({ name: "", email: "", phone: "", treatment: "", datetime: "", pressure: "", areas: [], allergies: "", conditions: [], notes: "", agreeHealth: false, agreeTC: false });
  const [retForm, setRetForm] = useState({ name: "", treatment: "", datetime: "", notes: "" });
  const [newFormError, setNewFormError] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactDone, setContactDone] = useState(false);
  const [ratings, setRatings] = useState({ treatment: 0, therapist: 0, ambiance: 0, relaxed: 0, value: 0 });
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackDone, setFeedbackDone] = useState(false);

  const updateNew = (k, v) => setNewForm(f => ({ ...f, [k]: v }));
  const updateRet = (k, v) => setRetForm(f => ({ ...f, [k]: v }));
  const updateContact = (k, v) => setContactForm(f => ({ ...f, [k]: v }));
  const navigate = (p) => { setPage(p); setBookingType(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const validateNew = () => {
    if (!newForm.name || !newForm.email || !newForm.treatment) { setNewFormError("Please fill in your name, email and preferred treatment."); return false; }
    if (!newForm.agreeHealth || !newForm.agreeTC) { setNewFormError("Please confirm both acknowledgements before sending."); return false; }
    setNewFormError(""); return true;
  };

  const buildWhatsAppNew = () => {
    const msg = `*NEW CLIENT CONSULTATION — Yellow Wellness*\n\n*Name:* ${newForm.name}\n*Email:* ${newForm.email}\n*Phone:* ${newForm.phone || "Not provided"}\n*Treatment:* ${newForm.treatment}\n*Preferred Date/Time:* ${newForm.datetime || "Flexible"}\n*Pressure Preference:* ${newForm.pressure || "Not specified"}\n*Problem Areas:* ${newForm.areas.length ? newForm.areas.join(", ") : "None specified"}\n*Allergies:* ${newForm.allergies || "None"}\n*Health Conditions:* ${newForm.conditions.length ? newForm.conditions.join(", ") : "None"}\n*Additional Notes:* ${newForm.notes || "None"}\n\n✅ Health information confirmed accurate\n✅ Terms & Conditions agreed`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const buildWhatsAppReturning = () => {
    const msg = `*RETURNING CLIENT BOOKING — Yellow Wellness*\n\n*Name:* ${retForm.name}\n*Treatment:* ${retForm.treatment}\n*Preferred Date/Time:* ${retForm.datetime || "Flexible"}\n*Health Changes Since Last Visit:* ${retForm.notes || "None"}`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleContact = () => { if (!contactForm.name || !contactForm.email || !contactForm.message) return; setContactDone(true); };
  const handleFeedback = () => { setFeedbackDone(true); };

  return (
    <>
      <style>{style}</style>

      <nav>
        <div className="logo" onClick={() => navigate("home")}>Yellow Wellness</div>
        <ul className="nav-links">
          <li><button onClick={() => navigate("home")} className={page === "home" ? "active" : ""}>Home</button></li>
          <li><button onClick={() => navigate("services")} className={page === "services" ? "active" : ""}>Services</button></li>
          <li><button onClick={() => navigate("about")} className={page === "about" ? "active" : ""}>About</button></li>
          <li><button onClick={() => navigate("feedback")} className={page === "feedback" ? "active" : ""}>Reviews</button></li>
          <li><button onClick={() => navigate("contact")} className={page === "contact" ? "active" : ""}>Contact</button></li>
          <li><button onClick={() => navigate("book")} className={`nav-book${page === "book" ? " active" : ""}`}>Book Now</button></li>
        </ul>
      </nav>

      {/* HOME PAGE */}
      {page === "home" && (
        <div className="page">
          <div className="hero">
            <div className="hero-bg" />
            <span className="hero-eyebrow">Home-Based Massage Therapy · Wolverhampton</span>
            <h1>Restore.<br /><em>Revive.</em><br />Renew.</h1>
            <p className="hero-sub">Welcome to Yellow Wellness — a warm, professional sanctuary where expert therapeutic massage helps you melt away stress, ease pain, and find your calm.</p>
            <div className="hero-cta">
              <button className="btn-gold" onClick={() => navigate("book")}>Book a Session</button>
              <button className="btn-outline" onClick={() => navigate("services")}>View Treatments</button>
            </div>
          </div>

          <div className="photo-strip">
            <div className="photo-strip-item">
              <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=700&q=80" alt="Treatment room" />
              <span className="photo-caption">Your treatment space</span>
            </div>
            <div className="photo-strip-item">
              <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=80" alt="Essential oils" />
              <span className="photo-caption">Premium oils &amp; blends</span>
            </div>
            <div className="photo-strip-item">
              <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=700&q=80" alt="Relaxation" />
              <span className="photo-caption">Pure relaxation</span>
            </div>
          </div>

          <div className="home-intro">
            <div className="home-intro-img">
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80" alt="Sash therapist" />
            </div>
            <div>
              <span className="section-label">Welcome</span>
              <h2 className="section-title">Hi, I'm Sash</h2>
              <p className="section-desc" style={{ marginBottom: "1.2rem" }}>I'm a certified holistic therapist based in Wolverhampton, and I created Yellow Wellness because I believe everyone deserves a space to truly unwind — without the spa price tag.</p>
              <p className="section-desc" style={{ marginBottom: "1.2rem" }}>Whether you're carrying the weight of a stressful week, dealing with persistent muscle tension, or simply craving some time for yourself, I'm here to help. Every treatment is tailored to you, delivered with care, and rooted in professional practice.</p>
              <p className="section-desc" style={{ marginBottom: "2rem" }}>Yellow Wellness is a home-based service — calm, private, and entirely focused on your wellbeing.</p>
              <button className="btn-outline" onClick={() => navigate("about")}>More About Me →</button>
            </div>
          </div>

          <div style={{ background: "var(--bg3)", borderTop: "1px solid rgba(201,168,0,0.1)", borderBottom: "1px solid rgba(201,168,0,0.1)", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <span className="section-label">A Taste of What's on Offer</span>
              <h2 className="section-title">Our Treatments</h2>
              <p className="section-desc">From full body aromatherapy to targeted deep tissue work — every session is designed to leave you feeling lighter, calmer, and restored.</p>
              <div className="preview-grid">
                {[
                  { title: "Aromatherapy Massage", desc: "Essential oil blends for body and mind", price: "From £40" },
                  { title: "Swedish Massage", desc: "Classic relaxation for the whole body", price: "From £30" },
                  { title: "Deep Tissue Massage", desc: "Targeted relief for deeper tension", price: "From £35" },
                  { title: "Foot Reflexology", desc: "Therapeutic add-on for full relaxation", price: "From £15" },
                ].map((s, i) => (
                  <div className="preview-card" key={i} onClick={() => navigate("services")}>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                    <div className="preview-card-price">{s.price}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
                <button className="btn-gold" onClick={() => navigate("services")}>View All Treatments &amp; Pricing</button>
              </div>
            </div>
          </div>

          <div style={{ padding: "5rem 2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <span className="section-label">Ready to Unwind?</span>
            <h2 className="section-title">Book Your Session Today</h2>
            <p className="section-desc" style={{ margin: "0 auto 2rem" }}>Available daily, 11am–8pm. A consultation form and live booking calendar make it simple to secure your slot.</p>
            <button className="btn-gold" onClick={() => navigate("book")}>Book Now</button>
          </div>
        </div>
      )}

      {/* SERVICES PAGE */}
      {page === "services" && (
        <div className="page">
          <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1400&q=80" alt="Services" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) sepia(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <span className="section-label">What We Offer</span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--cream)" }}>Our Treatments</h1>
            </div>
          </div>

          <div className="services-page">
            <p className="section-desc" style={{ marginBottom: "4rem", maxWidth: "680px" }}>Every session at Yellow Wellness is tailored to your needs. Full body treatments are available to female clients. Back, neck and shoulder treatments are open to all clients. For male clients, massage is focused on the back, neck and shoulder area.</p>

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
                {SERVICES.addOn.map((s, i) => <ServiceCard key={i} service={s} />)}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <button className="btn-gold" onClick={() => navigate("book")}>Book a Treatment</button>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT PAGE */}
      {page === "about" && (
        <div className="page">
          <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1400&q=80" alt="About" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) sepia(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <span className="section-label">The Therapist</span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--cream)" }}>About Me</h1>
            </div>
          </div>

          <div className="about-page">
            <div className="about-bio">
              <div className="about-img">
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80" alt="Sash" />
              </div>
              <div className="about-text">
                <span className="section-label">Hello, I'm Sash</span>
                <h2 className="section-title">Certified Holistic Therapist</h2>
                <p>I know what it feels like to carry too much — the tension that builds in your shoulders after a long week, the aches that never quite go away, the mental load that follows you even when you try to rest. That's exactly why I created Yellow Wellness.</p>
                <p>As a certified holistic therapist, I believe that true wellbeing goes beyond just the physical. Every treatment I offer is designed to work on body and mind together — helping you melt away stress, ease pain, improve circulation, and leave feeling genuinely restored.</p>
                <p>Yellow Wellness is a home-based service right here in Wolverhampton. My treatment space is calm, private, and entirely designed around your comfort. There's no rush, no clinical atmosphere — just a warm, professional environment where you can truly switch off.</p>
                <p>Whether you're coming for your first ever massage or you're a regular looking for a trusted local therapist, I'd love to welcome you. Every client is treated as an individual, and every session is tailored specifically to you.</p>
                <div className="cert-badge">✦ &nbsp; Certified Holistic Therapist</div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(201,168,0,0.1)", paddingTop: "4rem" }}>
              <span className="section-label">What Sets Us Apart</span>
              <h2 className="section-title">The Yellow Wellness Difference</h2>
              <div className="values-grid">
                {[
                  { icon: "🌿", title: "Holistic Approach", desc: "Every treatment considers your whole wellbeing — body, mind, and mood." },
                  { icon: "🔒", title: "Safe & Professional", desc: "Clear service boundaries, a pre-treatment consultation, and a fully professional environment every time." },
                  { icon: "✨", title: "Tailored to You", desc: "No two sessions are the same. Your treatment is adapted to your body and your needs on the day." },
                  { icon: "🏠", title: "Home-Based Comfort", desc: "A calm, private setting in Wolverhampton — with mobile visits available on request." },
                ].map((v, i) => (
                  <div className="value-card" key={i}>
                    <div className="value-icon">{v.icon}</div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <button className="btn-gold" onClick={() => navigate("book")}>Book a Session with Sash</button>
            </div>
          </div>
        </div>
      )}

      {/* BOOK PAGE */}
      {page === "book" && (
        <div className="page">
          <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1400&q=80" alt="Book" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) sepia(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <span className="section-label">Reserve Your Time</span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--cream)" }}>Book a Session</h1>
            </div>
          </div>

          <div className="booking-page">
            <p className="section-desc" style={{ marginBottom: "2.5rem" }}>
              To book with Yellow Wellness, simply complete the form below and send it via WhatsApp. Sash will confirm your appointment within a few hours during business hours (11am–8pm daily).
            </p>

            {!bookingType && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                <span className="section-label">Are you a new or returning client?</span>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                  <button className="btn-gold" onClick={() => setBookingType("new")}>New Client</button>
                  <button className="btn-outline" onClick={() => setBookingType("returning")}>Returning Client</button>
                </div>
              </div>
            )}

            {bookingType === "new" && (
              <div style={{ maxWidth: "700px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                  <span className="section-label" style={{ margin: 0 }}>New Client Consultation Form</span>
                  <button onClick={() => setBookingType(null)} style={{ background: "none", border: "none", color: "var(--stone)", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.1em" }}>← Change</button>
                </div>

                <div className="form-group"><label>Full Name *</label><input value={newForm.name} onChange={e => updateNew("name", e.target.value)} placeholder="Your full name" /></div>
                <div className="form-group"><label>Email Address *</label><input type="email" value={newForm.email} onChange={e => updateNew("email", e.target.value)} placeholder="email@example.com" /></div>
                <div className="form-group"><label>Phone Number</label><input value={newForm.phone} onChange={e => updateNew("phone", e.target.value)} placeholder="07..." /></div>

                <div className="form-group">
                  <label>Preferred Treatment *</label>
                  <select value={newForm.treatment} onChange={e => updateNew("treatment", e.target.value)}>
                    <option value="">— Select a treatment —</option>
                    <optgroup label="Full Body — Female Clients">
                      <option>Aromatherapy Massage — 60 min £40</option>
                      <option>Aromatherapy Massage — 90 min £60</option>
                      <option>Swedish Massage (Full Body) — 60 min £40</option>
                      <option>Swedish Massage (Full Body) — 90 min £60</option>
                      <option>Deep Tissue (Full Body) — 60 min £50</option>
                      <option>Deep Tissue (Full Body) — 90 min £75</option>
                    </optgroup>
                    <optgroup label="Back, Neck & Shoulder — All Clients">
                      <option>Swedish Massage (Back, Neck & Shoulder) — 30 min £30</option>
                      <option>Swedish Massage (Back, Neck & Shoulder) — 60 min £45</option>
                      <option>Deep Tissue (Back, Neck & Shoulder) — 30 min £35</option>
                      <option>Deep Tissue (Back, Neck & Shoulder) — 60 min £50</option>
                    </optgroup>
                    <optgroup label="Add-Ons">
                      <option>Foot Reflexology Add-On — 15 min £15</option>
                      <option>Foot Reflexology Add-On — 30 min £30</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group"><label>Preferred Date &amp; Time</label><input value={newForm.datetime} onChange={e => updateNew("datetime", e.target.value)} placeholder="e.g. Saturday 7 June, afternoon" /></div>

                <div className="form-group">
                  <label>Massage Pressure Preference</label>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                    {["Light", "Medium", "Firm"].map(p => (
                      <button key={p} onClick={() => updateNew("pressure", p)} style={{ padding: "0.5rem 1.5rem", background: newForm.pressure === p ? "var(--gold)" : "rgba(201,168,0,0.06)", border: "1px solid rgba(201,168,0,0.3)", color: newForm.pressure === p ? "var(--ink)" : "var(--cream)", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", transition: "all 0.2s" }}>{p}</button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Problem Areas / Focus Areas</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {["Upper back", "Lower back", "Neck", "Shoulders", "Legs", "Feet", "Arms", "Full body"].map(area => (
                      <div key={area} className="checkbox-item">
                        <input type="checkbox" checked={newForm.areas.includes(area)} onChange={e => updateNew("areas", e.target.checked ? [...newForm.areas, area] : newForm.areas.filter(a => a !== area))} />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Known Allergies (oils, nuts, latex, scents)</label>
                  <input value={newForm.allergies} onChange={e => updateNew("allergies", e.target.value)} placeholder="e.g. nut oils, lavender, latex — or none" />
                </div>

                <div className="form-group">
                  <label>Health Conditions — please tick any that apply</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {["High blood pressure", "Low blood pressure", "Diabetes", "Heart condition", "Cancer / chemotherapy", "Epilepsy", "Osteoporosis", "Blood clots / DVT", "Varicose veins", "Recent surgery", "Skin conditions", "Pregnancy", "Acute injury / inflammation", "Infectious condition", "None of the above"].map(c => (
                      <div key={c} className="checkbox-item">
                        <input type="checkbox" checked={newForm.conditions.includes(c)} onChange={e => updateNew("conditions", e.target.checked ? [...newForm.conditions, c] : newForm.conditions.filter(x => x !== c))} />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Anything else we should know?</label>
                  <textarea value={newForm.notes} onChange={e => updateNew("notes", e.target.value)} placeholder="Any other information that might help us tailor your treatment..." />
                </div>

                <div className="policy-box">
                  <strong>Terms &amp; Conditions</strong>
                  Yellow Wellness provides therapeutic massage services only. All sessions are strictly non-sexual in nature. Any behaviour or request outside the agreed scope will result in immediate termination of the session at full charge. Cancellations must be made at least 24 hours in advance. Late cancellations may incur a 50% charge. No-shows will be charged in full.
                </div>

                <div className="form-group">
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input type="checkbox" checked={newForm.agreeHealth} onChange={e => updateNew("agreeHealth", e.target.checked)} />
                      <span>I confirm the health information I have provided is accurate and may be used to tailor my treatment safely.</span>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" checked={newForm.agreeTC} onChange={e => updateNew("agreeTC", e.target.checked)} />
                      <span>I have read and agree to the Terms &amp; Conditions above.</span>
                    </div>
                  </div>
                </div>

                {newFormError && <p style={{ color: "#c0614a", fontSize: "0.8rem", marginBottom: "1rem" }}>{newFormError}</p>}

                <a href={buildWhatsAppNew()} onClick={e => { if (!validateNew()) { e.preventDefault(); } }} className="whatsapp-btn" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#25D366", color: "#fff", padding: "0.85rem 1.8rem", fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "background 0.3s", marginTop: "0.5rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Send Consultation via WhatsApp
                </a>
              </div>
            )}

            {bookingType === "returning" && (
              <div style={{ maxWidth: "700px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                  <span className="section-label" style={{ margin: 0 }}>Welcome Back!</span>
                  <button onClick={() => setBookingType(null)} style={{ background: "none", border: "none", color: "var(--stone)", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.1em" }}>← Change</button>
                </div>

                <p className="section-desc" style={{ marginBottom: "2rem" }}>As a returning client you don't need to complete the full consultation again. Just let us know what you'd like and when!</p>

                <div className="form-group"><label>Your Name *</label><input value={retForm.name} onChange={e => updateRet("name", e.target.value)} placeholder="Your name" /></div>
                <div className="form-group">
                  <label>Preferred Treatment *</label>
                  <select value={retForm.treatment} onChange={e => updateRet("treatment", e.target.value)}>
                    <option value="">— Select a treatment —</option>
                    <optgroup label="Full Body — Female Clients">
                      <option>Aromatherapy Massage — 60 min £40</option>
                      <option>Aromatherapy Massage — 90 min £60</option>
                      <option>Swedish Massage (Full Body) — 60 min £40</option>
                      <option>Swedish Massage (Full Body) — 90 min £60</option>
                      <option>Deep Tissue (Full Body) — 60 min £50</option>
                      <option>Deep Tissue (Full Body) — 90 min £75</option>
                    </optgroup>
                    <optgroup label="Back, Neck & Shoulder — All Clients">
                      <option>Swedish Massage (Back, Neck & Shoulder) — 30 min £30</option>
                      <option>Swedish Massage (Back, Neck & Shoulder) — 60 min £45</option>
                      <option>Deep Tissue (Back, Neck & Shoulder) — 30 min £35</option>
                      <option>Deep Tissue (Back, Neck & Shoulder) — 60 min £50</option>
                    </optgroup>
                    <optgroup label="Add-Ons">
                      <option>Foot Reflexology Add-On — 15 min £15</option>
                      <option>Foot Reflexology Add-On — 30 min £30</option>
                    </optgroup>
                  </select>
                </div>
                <div className="form-group"><label>Preferred Date &amp; Time</label><input value={retForm.datetime} onChange={e => updateRet("datetime", e.target.value)} placeholder="e.g. Saturday 7 June, afternoon" /></div>
                <div className="form-group"><label>Any changes to your health since your last visit?</label><textarea value={retForm.notes} onChange={e => updateRet("notes", e.target.value)} placeholder="e.g. new medication, recent injury, or anything else we should know..." /></div>

                <a href={buildWhatsAppReturning()} className="whatsapp-btn" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#25D366", color: "#fff", padding: "0.85rem 1.8rem", fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "background 0.3s", marginTop: "0.5rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Send Booking via WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {page === "feedback" && (
        <div className="page">
          <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1400&q=80" alt="Feedback" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) sepia(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <span className="section-label">Share Your Experience</span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--cream)" }}>Leave a Review</h1>
            </div>
          </div>

          <div className="feedback-page">
            <p className="section-desc" style={{ marginBottom: "3rem" }}>Your feedback means the world and helps us continue to deliver the best possible experience. Please take a moment to rate your visit.</p>

            {!feedbackDone ? (
              <>
                {FEEDBACK_QUESTIONS.map(q => (
                  <div className="star-group" key={q.id}>
                    <label>{q.label}</label>
                    <StarRating value={ratings[q.id]} onChange={v => setRatings(r => ({ ...r, [q.id]: v }))} />
                  </div>
                ))}

                <div className="form-group" style={{ marginTop: "2rem" }}>
                  <label>Anything else you'd like to share?</label>
                  <textarea rows={5} value={feedbackComment} onChange={e => setFeedbackComment(e.target.value)} placeholder="Tell us about your experience — what you loved, what could be improved, or anything else on your mind..." />
                </div>

                <button className="btn-gold" onClick={handleFeedback}>Submit Review</button>
              </>
            ) : (
              <div className="success-msg" style={{ fontSize: "1rem", padding: "2rem" }}>
                ✦ &nbsp; Thank you so much for your review! Your feedback is incredibly valuable and helps Yellow Wellness grow. We hope to welcome you back very soon.
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTACT PAGE */}
      {page === "contact" && (
        <div className="page">
          <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80" alt="Contact" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) sepia(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <span className="section-label">We'd Love to Hear From You</span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--cream)" }}>Get in Touch</h1>
            </div>
          </div>

          <div className="contact-page">
            <div className="contact-grid">
              <div>
                <span className="section-label">Contact Details</span>
                <h2 className="section-title">Say Hello</h2>
                <p className="section-desc" style={{ marginBottom: "2.5rem" }}>Have a question before booking? Not sure which treatment is right for you? Get in touch — I'm happy to help.</p>

                <div className="contact-detail">
                  <span className="contact-detail-icon">📍</span>
                  <div className="contact-detail-text">
                    <strong>Location</strong>
                    Wolverhampton — exact address provided upon booking confirmation
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-detail-icon">📧</span>
                  <div className="contact-detail-text">
                    <strong>Email</strong>
                    hello@yellowwellness.co.uk
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-detail-icon">🕐</span>
                  <div className="contact-detail-text">
                    <strong>Hours</strong>
                    Available daily, 11am–8pm (hours vary by day)
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-detail-icon">🚗</span>
                  <div className="contact-detail-text">
                    <strong>Mobile Services</strong>
                    Available on request — subject to ground floor access and parking availability
                  </div>
                </div>

                <a href="https://wa.me/447394863714" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <span className="section-label">Send a Message</span>
                <h2 className="section-title" style={{ marginBottom: "2rem" }}>Drop Us a Line</h2>
                {!contactDone ? (
                  <>
                    <div className="form-group"><label>Your Name</label><input value={contactForm.name} onChange={e => updateContact("name", e.target.value)} placeholder="Name" /></div>
                    <div className="form-group"><label>Email Address</label><input type="email" value={contactForm.email} onChange={e => updateContact("email", e.target.value)} placeholder="email@example.com" /></div>
                    <div className="form-group"><label>Message</label><textarea rows={6} value={contactForm.message} onChange={e => updateContact("message", e.target.value)} placeholder="Your question or message..." /></div>
                    <button className="btn-gold" onClick={handleContact}>Send Message</button>
                  </>
                ) : (
                  <div className="success-msg">✓ &nbsp; Message received! We will be in touch shortly at {contactForm.email}.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--gold-light)", fontSize: "1rem" }}>Yellow Wellness</span>
        <span>© 2025 · Home-Based Massage Therapy · Wolverhampton</span>
        <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("feedback")}>Leave a Review</span>
      </footer>
    </>
  );
}
