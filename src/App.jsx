import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #fdf8f0;
    --warm-white: #fff9f0;
    --gold: #c9960a;
    --gold-light: #e8b020;
    --gold-pale: #fef3d0;
    --sage: #4a6240;
    --sage-light: #e8ede0;
    --stone: #5a5040;
    --ink: #2c2a20;
    --soft-bg: #f7f2e8;
    --border: rgba(180,150,60,0.2);
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--ink); overflow-x: hidden; }
  h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; font-weight: 400; color: var(--ink); }

  nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    padding: 0.8rem 3rem;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(253,248,240,0.97);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 2px 20px rgba(180,150,60,0.08);
  }
  .logo-img { height: 60px; width: auto; cursor: pointer; }
  .nav-links { display: flex; gap: 2rem; list-style: none; align-items: center; }
  .nav-links button { background: none; border: none; color: var(--ink); font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: color 0.3s; padding: 0; }
  .nav-links button:hover, .nav-links button.active { color: var(--gold); }
  .nav-book { background: var(--sage) !important; color: #fff !important; padding: 0.55rem 1.4rem !important; border-radius: 2px; font-weight: 500 !important; letter-spacing: 0.15em !important; transition: background 0.3s !important; }
  .nav-book:hover { background: var(--gold) !important; }

  .btn-gold { padding: 0.85rem 2.5rem; background: var(--sage); color: #fff; border: none; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; transition: background 0.3s, transform 0.2s; display: inline-block; border-radius: 2px; }
  .btn-gold:hover { background: var(--gold); transform: translateY(-2px); }
  .btn-outline { padding: 0.85rem 2.5rem; background: transparent; color: var(--ink); border: 1px solid var(--border); cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400; transition: all 0.3s; display: inline-block; border-radius: 2px; }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  .section-label { font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--sage); margin-bottom: 0.8rem; display: block; }
  .section-title { font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.15; margin-bottom: 1rem; color: var(--ink); }
  .section-desc { color: #5a5040; font-size: 0.92rem; line-height: 1.85; font-weight: 300; }

  .page { padding-top: 80px; min-height: 100vh; animation: fadeIn 0.35s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .hero {
    min-height: calc(100vh - 80px); display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
    padding: 4rem 2rem; position: relative; overflow: hidden;
    background: linear-gradient(135deg, #3a5230 0%, #4a6240 40%, #3a5230 100%);
  }
  .hero-bg { position: absolute; inset: 0; z-index: 0; background-image: url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=80'); background-size: cover; background-position: center; opacity: 0.35; }
  .hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(58,82,48,0.4), rgba(58,82,48,0.2)); }
  .hero > * { position: relative; z-index: 1; }
  .hero-eyebrow { font-size: 0.7rem; letter-spacing: 0.45em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1.2rem; animation: fadeUp 0.8s ease both; }
  .hero h1 { font-size: clamp(3rem, 8vw, 6rem); line-height: 1.05; color: #fff; animation: fadeUp 0.9s 0.1s ease both; font-style: italic; }
  .hero h1 em { color: var(--gold-light); font-style: normal; }
  .hero-sub { margin-top: 1.2rem; font-size: 0.95rem; color: rgba(255,255,255,0.9); font-weight: 300; max-width: 500px; line-height: 1.9; animation: fadeUp 1s 0.2s ease both; letter-spacing: 0.05em; }
  .hero-cta { margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; animation: fadeUp 1s 0.35s ease both; }

  .welcome-strip { background: var(--gold-pale); padding: 2.5rem 2rem; text-align: center; border-bottom: 1px solid var(--border); }
  .welcome-strip p { font-size: 0.95rem; color: var(--ink); max-width: 620px; margin: 0 auto; line-height: 1.8; }
  .welcome-strip strong { color: var(--gold); font-weight: 500; }

  .photo-strip { display: grid; grid-template-columns: repeat(3, 1fr); height: 300px; overflow: hidden; }
  .photo-strip-item { position: relative; overflow: hidden; }
  .photo-strip-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8) sepia(0.1); transition: transform 0.6s, filter 0.6s; }
  .photo-strip-item:hover img { transform: scale(1.05); filter: brightness(0.9); }
  .photo-strip-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(44,42,32,0.5), transparent 60%); }
  .photo-caption { position: absolute; bottom: 1rem; left: 1.2rem; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: #fff; font-style: italic; }

  .home-intro { max-width: 1100px; margin: 0 auto; padding: 6rem 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  @media (max-width: 768px) { .home-intro { grid-template-columns: 1fr; gap: 2.5rem; } }
  .home-intro-img { position: relative; height: 400px; overflow: hidden; border-radius: 4px; box-shadow: 0 20px 60px rgba(180,150,60,0.15); }
  .home-intro-img img { width: 100%; height: 100%; object-fit: cover; }

  .preview-section { background: var(--soft-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 5rem 2rem; }
  .preview-inner { max-width: 1100px; margin: 0 auto; }
  .preview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 2.5rem; }
  .preview-card { background: #fff; padding: 2rem; cursor: pointer; transition: all 0.3s; border: 1px solid var(--border); border-radius: 4px; text-align: center; box-shadow: 0 4px 20px rgba(180,150,60,0.06); }
  .preview-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(180,150,60,0.15); border-color: var(--gold); }
  .preview-card-icon { font-size: 2rem; margin-bottom: 1rem; }
  .preview-card h4 { font-size: 1.2rem; color: var(--ink); margin-bottom: 0.4rem; }
  .preview-card p { font-size: 0.78rem; color: var(--stone); line-height: 1.6; margin-bottom: 1rem; font-weight: 300; }
  .preview-card-price { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold); }

  .cta-strip { padding: 5rem 2rem; text-align: center; background: var(--sage); }
  .cta-strip h2 { color: #fff; font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 1rem; }
  .cta-strip p { color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-bottom: 2rem; font-weight: 300; }
  .cta-strip .btn-gold { background: var(--gold-light); color: var(--ink); }
  .cta-strip .btn-gold:hover { background: #fff; }

  .services-page { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
  .page-hero { position: relative; height: 250px; overflow: hidden; background: linear-gradient(135deg, #3a5230 0%, #4a6240 100%); }
  .page-hero img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.45) sepia(0.15); }
  .page-hero-text { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: rgba(15,10,0,0.35); }
  .page-hero-text h1 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(2.2rem, 5vw, 4rem); color: #fff; text-shadow: 0 2px 20px rgba(0,0,0,0.5); }

  .services-category { margin-bottom: 4rem; }
  .services-category-label { font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--sage); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
  .services-category-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
  .service-card { background: #fff; padding: 2rem 2.2rem; border: 1px solid var(--border); border-radius: 4px; transition: all 0.3s; box-shadow: 0 4px 20px rgba(180,150,60,0.05); }
  .service-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(180,150,60,0.12); border-color: var(--gold); }
  .service-card h3 { font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--ink); }
  .service-card p { font-size: 0.82rem; color: var(--stone); line-height: 1.7; font-weight: 300; margin-bottom: 1.2rem; }
  .price-rows { display: flex; flex-direction: column; gap: 0.4rem; border-top: 1px solid var(--border); padding-top: 1rem; }
  .price-row { display: flex; justify-content: space-between; align-items: baseline; }
  .price-duration { font-size: 0.78rem; color: var(--stone); font-weight: 300; }
  .price-amount { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: var(--gold); }
  .addon-tag { display: inline-block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; background: var(--sage-light); color: var(--sage); padding: 0.2rem 0.6rem; margin-bottom: 0.8rem; border-radius: 2px; }

  .about-page { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
  .about-bio { display: grid; grid-template-columns: 1fr 1.5fr; gap: 5rem; align-items: start; margin-bottom: 5rem; }
  @media (max-width: 768px) { .about-bio { grid-template-columns: 1fr; } }
  .about-img { border-radius: 4px; overflow: hidden; height: 480px; box-shadow: 0 20px 60px rgba(180,150,60,0.15); }
  .about-img img { width: 100%; height: 100%; object-fit: cover; }
  .about-text p { color: var(--stone); font-size: 0.92rem; line-height: 1.9; font-weight: 300; margin-bottom: 1.2rem; }
  .cert-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--sage-light); border: 1px solid rgba(107,124,92,0.3); padding: 0.6rem 1.2rem; font-size: 0.75rem; color: var(--sage); letter-spacing: 0.1em; border-radius: 2px; margin-top: 1rem; }
  .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .value-card { background: #fff9d6; padding: 2rem; border: 1px solid rgba(201,168,0,0.2); border-radius: 4px; text-align: center; box-shadow: 0 4px 20px rgba(180,150,60,0.05); }
  .value-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .value-card h4 { font-size: 1.15rem; color: var(--ink); margin-bottom: 0.5rem; }
  .value-card p { font-size: 0.8rem; color: var(--stone); line-height: 1.6; font-weight: 300; }

  .booking-page { max-width: 900px; margin: 0 auto; padding: 5rem 2rem; }
  .booking-type-btns { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; margin-top: 2rem; }
  .form-group { margin-bottom: 1.5rem; }
  .form-group label { display: block; font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--sage); margin-bottom: 0.5rem; }
  .form-group input, .form-group select, .form-group textarea { width: 100%; background: #fff; border: 1px solid var(--border); color: var(--ink); padding: 0.85rem 1rem; font-family: 'Jost', sans-serif; font-size: 0.88rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; border-radius: 2px; }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--gold); }
  .form-group textarea { resize: vertical; min-height: 100px; }
  .checkbox-group { display: flex; flex-direction: column; gap: 0.7rem; }
  .checkbox-item { display: flex; align-items: flex-start; gap: 0.75rem; }
  .checkbox-item input[type="checkbox"] { width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px; accent-color: var(--sage); cursor: pointer; }
  .checkbox-item span { font-size: 0.8rem; color: var(--stone); line-height: 1.5; font-weight: 300; }
  .checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem; }
  .policy-box { background: var(--soft-bg); border: 1px solid var(--border); padding: 1.2rem 1.5rem; margin-bottom: 1.5rem; font-size: 0.78rem; color: var(--stone); line-height: 1.7; border-radius: 2px; }
  .policy-box strong { color: var(--ink); display: block; margin-bottom: 0.3rem; }
  .success-msg { background: var(--sage-light); border: 1px solid rgba(107,124,92,0.3); padding: 1.2rem 1.5rem; font-size: 0.85rem; color: var(--sage); line-height: 1.6; margin-top: 1rem; border-radius: 2px; }
  .error-msg { color: #c0614a; font-size: 0.8rem; margin-bottom: 1rem; }
  .pressure-btns { display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap; }
  .pressure-btn { padding: 0.5rem 1.4rem; background: #fff; border: 1px solid var(--border); color: var(--stone); cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.78rem; letter-spacing: 0.1em; transition: all 0.2s; border-radius: 2px; }
  .pressure-btn.active { background: var(--sage); border-color: var(--sage); color: #fff; }
  .back-link { background: none; border: none; color: var(--stone); cursor: pointer; font-size: 0.75rem; letter-spacing: 0.1em; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.4rem; font-family: 'Jost', sans-serif; }
  .back-link:hover { color: var(--gold); }
  .wa-btn { display: inline-flex; align-items: center; gap: 0.7rem; background: #25D366; color: #fff; padding: 0.9rem 2rem; font-family: 'Jost', sans-serif; font-size: 0.78rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; text-decoration: none; transition: all 0.3s; border-radius: 2px; border: none; cursor: pointer; }
  .wa-btn:hover { background: #1da851; transform: translateY(-2px); }

  .feedback-page { max-width: 680px; margin: 0 auto; padding: 5rem 2rem; }
  .star-group { margin-bottom: 2rem; }
  .star-group label { display: block; font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--sage); margin-bottom: 0.8rem; }
  .stars { display: flex; gap: 0.4rem; }
  .star { font-size: 1.8rem; cursor: pointer; color: #ddd; transition: color 0.2s; user-select: none; }
  .star.active { color: var(--gold-light); }

  .contact-page { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
  .contact-detail { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; padding: 1.2rem; background: #fff; border: 1px solid var(--border); border-radius: 4px; }
  .contact-detail-icon { font-size: 1.3rem; }
  .contact-detail-text strong { color: var(--ink); display: block; font-family: 'Cormorant Garamond', serif; font-size: 1rem; margin-bottom: 0.2rem; }
  .contact-detail-text span { font-size: 0.85rem; color: var(--stone); font-weight: 300; }

  footer { background: var(--ink); padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-logo { height: 50px; width: auto; opacity: 0.9; }
  .footer-text { font-size: 0.7rem; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; }
  .footer-link { font-size: 0.7rem; color: rgba(255,255,255,0.4); cursor: pointer; letter-spacing: 0.1em; }
  .footer-link:hover { color: var(--gold-light); }

  @media (max-width: 768px) {
    nav { padding: 0.8rem 1.2rem; }
    .nav-links { gap: 0.8rem; }
    .nav-links button { font-size: 0.62rem; }
    .photo-strip { grid-template-columns: 1fr; height: auto; }
    .photo-strip-item { height: 200px; }
    footer { flex-direction: column; text-align: center; padding: 1.5rem; }
  }
`;

const WA = "447394863714";

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
    { name: "Foot Reflexology", desc: "A therapeutic foot treatment working on reflex points to promote whole-body relaxation, improve circulation, and complement your massage session.", prices: [{ duration: "15 min", amount: "£15" }, { duration: "30 min", amount: "£30" }], isAddon: true },
  ],
};

const FAQS = [
  { q: "What areas of the body do you treat?", a: "Full body treatments are available to female clients. Back, neck and shoulder treatments are open to all clients. For male clients, massage is focused on the back, neck and shoulder area." },
  { q: "Why do you focus on the back, neck and shoulders for male clients?", a: "This is a deliberate professional boundary set by the therapist, ensuring a clear, safe, and comfortable experience for everyone." },
  { q: "What should I tell you about my health before the session?", a: "Please disclose any allergies, skin conditions, injuries, blood pressure issues, or recent surgery. Pregnant clients should also let us know. All information is kept confidential." },
  { q: "Do you offer mobile services?", a: "Mobile services are available on request, subject to circumstances such as ground floor access and parking availability. Please get in touch to discuss." },
  { q: "What oils and scents do you use?", a: "We use professional-grade massage oils and essential oil blends. If you have a sensitivity or preference, please note this when booking." },
  { q: "Where are you based?", a: "Yellow Wellness is a home-based massage service in Wolverhampton. The exact address is provided upon booking confirmation." },
  { q: "How do I pay?", a: "Payment is due at the time of the session. We accept bank transfer, cash, and most major debit/credit cards." },
  { q: "What is your cancellation policy?", a: "We ask for at least 24 hours' notice to cancel or reschedule. Late cancellations may incur a 50% charge. No-shows will be charged in full." },
  { q: "Do I need to bring anything?", a: "Nothing — we provide fresh towels and linens. Just arrive in comfortable, loose clothing." },
];

const CONDITIONS = ["High blood pressure","Low blood pressure","Diabetes","Heart condition","Cancer / chemotherapy","Epilepsy","Osteoporosis","Blood clots / DVT","Varicose veins","Recent surgery","Skin conditions","Pregnancy","Acute injury / inflammation","Infectious condition","None of the above"];
const AREAS = ["Upper back","Lower back","Neck","Shoulders","Legs","Feet","Arms","Full body"];
const TREATMENTS = [
  { group: "Full Body — Female Clients", items: ["Aromatherapy Massage — 60 min £40","Aromatherapy Massage — 90 min £60","Swedish Massage (Full Body) — 60 min £40","Swedish Massage (Full Body) — 90 min £60","Deep Tissue (Full Body) — 60 min £50","Deep Tissue (Full Body) — 90 min £75"] },
  { group: "Back, Neck & Shoulder — All Clients", items: ["Swedish Massage (Back, Neck & Shoulder) — 30 min £30","Swedish Massage (Back, Neck & Shoulder) — 60 min £45","Deep Tissue (Back, Neck & Shoulder) — 30 min £35","Deep Tissue (Back, Neck & Shoulder) — 60 min £50"] },
  { group: "Add-Ons", items: ["Foot Reflexology — 15 min £15","Foot Reflexology — 30 min £30"] },
];

const ServiceCard = ({ s }) => (
  <div className="service-card">
    {s.isAddon && <span className="addon-tag">Add-On</span>}
    <h3>{s.name}</h3>
    <p>{s.desc}</p>
    <div className="price-rows">
      {s.prices.map((p, i) => (
        <div className="price-row" key={i}>
          <span className="price-duration">{p.duration}</span>
          <span className="price-amount">{p.amount}</span>
        </div>
      ))}
    </div>
  </div>
);

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PageHero = ({ img, label, title }) => (
  <div className="page-hero">
    <img src={img} alt={title} />
    <div className="page-hero-text">
      <span className="section-label" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
      <h1>{title}</h1>
    </div>
  </div>
);

export default function App() {
  const [page, setPage] = useState("home");
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingType, setBookingType] = useState(null);
  const [newForm, setNewForm] = useState({ name: "", email: "", phone: "", treatment: "", datetime: "", pressure: "", areas: [], allergies: "", conditions: [], notes: "", agreeHealth: false, agreeTC: false });
  const [retForm, setRetForm] = useState({ name: "", treatment: "", datetime: "", notes: "" });
  const [newError, setNewError] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactDone, setContactDone] = useState(false);
  const [ratings, setRatings] = useState({ treatment: 0, therapist: 0, ambiance: 0, relaxed: 0, value: 0 });
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackDone, setFeedbackDone] = useState(false);

  const nav = (p) => { setPage(p); setBookingType(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const uN = (k, v) => setNewForm(f => ({ ...f, [k]: v }));
  const uR = (k, v) => setRetForm(f => ({ ...f, [k]: v }));
  const uC = (k, v) => setContactForm(f => ({ ...f, [k]: v }));

  const validateNew = () => {
    if (!newForm.name || !newForm.email || !newForm.treatment) { setNewError("Please fill in your name, email and preferred treatment."); return false; }
    if (!newForm.agreeHealth || !newForm.agreeTC) { setNewError("Please confirm both acknowledgements before sending."); return false; }
    setNewError(""); return true;
  };

  const waNew = () => {
    const msg = `*NEW CLIENT — Yellow Wellness*\n\n*Name:* ${newForm.name}\n*Email:* ${newForm.email}\n*Phone:* ${newForm.phone || "Not provided"}\n*Treatment:* ${newForm.treatment}\n*Preferred Date/Time:* ${newForm.datetime || "Flexible"}\n*Pressure:* ${newForm.pressure || "Not specified"}\n*Focus Areas:* ${newForm.areas.length ? newForm.areas.join(", ") : "None specified"}\n*Allergies:* ${newForm.allergies || "None"}\n*Health Conditions:* ${newForm.conditions.length ? newForm.conditions.join(", ") : "None"}\n*Notes:* ${newForm.notes || "None"}\n\n✅ Health info confirmed\n✅ T&Cs agreed`;
    return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  };

  const waRet = () => {
    const msg = `*RETURNING CLIENT — Yellow Wellness*\n\n*Name:* ${retForm.name}\n*Treatment:* ${retForm.treatment}\n*Preferred Date/Time:* ${retForm.datetime || "Flexible"}\n*Health Changes:* ${retForm.notes || "None"}`;
    return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <style>{style}</style>

      <nav>
        <img src="/logo.png" alt="Yellow Wellness" className="logo-img" onClick={() => nav("home")} />
        <ul className="nav-links">
          {[["home","Home"],["services","Services"],["about","About"],["feedback","Reviews"],["contact","Contact"]].map(([p,l]) => (
            <li key={p}><button onClick={() => nav(p)} className={page === p ? "active" : ""}>{l}</button></li>
          ))}
          <li><button onClick={() => nav("book")} className={`nav-book${page === "book" ? " active" : ""}`}>Book Now</button></li>
        </ul>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div className="page">
          <div className="hero">
            <div className="hero-bg" />
            <span className="hero-eyebrow">Home-Based Massage Therapy · Wolverhampton</span>
            <h1>Relax. <em>Restore.</em><br />Rebalance.</h1>
            <p className="hero-sub">A warm, professional sanctuary where expert therapeutic massage helps you melt away stress, ease pain, and find your calm.</p>
            <div className="hero-cta">
              <button className="btn-gold" style={{ background: "var(--gold-light)", color: "var(--ink)" }} onClick={() => nav("book")}>Book via WhatsApp</button>
              <button className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.6)" }} onClick={() => nav("services")}>View Treatments</button>
            </div>
          </div>

          <div className="welcome-strip">
            <p>Welcome to <strong>Yellow Wellness</strong> — a home-based massage therapy service offering calm, personalised treatments by appointment only. Every session is tailored to you.</p>
          </div>

          <div className="photo-strip">
            {[
              ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80", "Expert therapy"],
              ["https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=80", "Premium oils"],
              ["https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=700&q=80", "Pure calm"],
            ].map(([src, cap]) => (
              <div className="photo-strip-item" key={cap}>
                <img src={src} alt={cap} />
                <span className="photo-caption">{cap}</span>
              </div>
            ))}
          </div>

          <div className="home-intro">
            <div className="home-intro-img">
              <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=700&q=80" alt="Treatment space" />
            </div>
            <div>
              <span className="section-label">Welcome</span>
              <h2 className="section-title">Hi, I'm Sash</h2>
              <p className="section-desc" style={{ marginBottom: "1.2rem" }}>I'm a certified holistic therapist based in Wolverhampton, and I created Yellow Wellness because I believe everyone deserves a space to truly unwind.</p>
              <p className="section-desc" style={{ marginBottom: "1.2rem" }}>Whether you're carrying the weight of a stressful week, dealing with persistent muscle tension, or simply craving some time for yourself — I'm here to help. Every treatment is tailored to you, delivered with care, and rooted in professional practice.</p>
              <p className="section-desc" style={{ marginBottom: "2rem" }}>Yellow Wellness is home-based — calm, private, and entirely focused on your wellbeing.</p>
              <button className="btn-outline" onClick={() => nav("about")}>More About Me →</button>
            </div>
          </div>

          <div className="preview-section">
            <div className="preview-inner">
              <span className="section-label" style={{ textAlign: "center", display: "block" }}>Treatments</span>
              <h2 className="section-title" style={{ textAlign: "center" }}>What We Offer</h2>
              <p className="section-desc" style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>From full body aromatherapy to targeted deep tissue — every session is designed to leave you restored.</p>
              <div className="preview-grid">
                {[
                  { icon: "🌸", title: "Aromatherapy", desc: "Essential oils for body and mind", price: "From £40" },
                  { icon: "💆", title: "Swedish Massage", desc: "Classic full-body relaxation", price: "From £30" },
                  { icon: "💪", title: "Deep Tissue", desc: "Targeted relief for deeper tension", price: "From £35" },
                  { icon: "🦶", title: "Reflexology", desc: "Therapeutic foot add-on", price: "From £15" },
                ].map((s, i) => (
                  <div className="preview-card" key={i} onClick={() => nav("services")}>
                    <div className="preview-card-icon">{s.icon}</div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                    <div className="preview-card-price">{s.price}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                <button className="btn-gold" onClick={() => nav("services")}>View All Treatments</button>
              </div>
            </div>
          </div>

          <div className="cta-strip">
            <h2>Ready to Unwind?</h2>
            <p>Available daily 11am–8pm. Message to check availability and secure your slot.</p>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I'd like to book a massage at Yellow Wellness.")}`} className="btn-gold" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
              <WaIcon /> Book via WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* SERVICES */}
      {page === "services" && (
        <div className="page">
          <PageHero img="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1400&q=80" label="What We Offer" title="Our Treatments" />
          <div className="services-page">
            <p className="section-desc" style={{ marginBottom: "4rem", maxWidth: "680px" }}>Every session is tailored to your needs. Full body treatments are available to female clients. Back, neck and shoulder treatments are open to all clients. For male clients, massage is focused on the back, neck and shoulder area.</p>
            <div className="services-category">
              <div className="services-category-label">Full Body Treatments — Female Clients</div>
              <div className="services-grid">{SERVICES.fullBody.map((s, i) => <ServiceCard key={i} s={s} />)}</div>
            </div>
            <div className="services-category">
              <div className="services-category-label">Back, Neck &amp; Shoulder — All Clients</div>
              <div className="services-grid">{SERVICES.backNeckShoulder.map((s, i) => <ServiceCard key={i} s={s} />)}</div>
            </div>
            <div className="services-category">
              <div className="services-category-label">Enhancements &amp; Add-Ons</div>
              <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 400px))" }}>
                {SERVICES.addOn.map((s, i) => <ServiceCard key={i} s={s} />)}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <button className="btn-gold" onClick={() => nav("book")}>Book a Treatment</button>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <div className="page" style={{ background: "#fffde8" }}>
          <PageHero img="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1400&q=80" label="The Therapist" title="About Me" />
          <div className="about-page">
            <div className="about-bio">
              <div className="about-img">
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80" alt="Sash" />
              </div>
              <div className="about-text">
                <span className="section-label">Hello, I'm Sash</span>
                <h2 className="section-title">Welcome to Yellow Wellness</h2>
                <p>I know what it feels like to carry too much — the tension that builds in your shoulders after a long week, the aches that never quite go away, the mental load that follows you even when you try to rest. That's exactly why I created Yellow Wellness.</p>
                <p>As a certified holistic therapist, I believe true wellbeing goes beyond just the physical. Every treatment I offer is designed to work on body and mind together — helping you melt away stress, ease pain, improve circulation, and leave feeling genuinely restored.</p>
                <p>Yellow Wellness is home-based, right here in Wolverhampton. My treatment space is calm, private, and designed around your comfort. There's no rush, no clinical atmosphere — just a warm, professional environment where you can truly switch off.</p>
                <p>Whether you're coming for your first ever massage or you're a regular looking for a trusted local therapist, I'd love to welcome you.</p>

              </div>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "4rem" }}>
              <span className="section-label">What Sets Us Apart</span>
              <h2 className="section-title">The Yellow Wellness Difference</h2>
              <div className="values-grid">
                {[
                  { icon: "🌿", title: "Holistic Approach", desc: "Every treatment considers your whole wellbeing — body, mind, and mood." },
                  { icon: "🔒", title: "Safe & Professional", desc: "Clear service boundaries, a pre-treatment consultation, and a fully professional environment every time." },
                  { icon: "✨", title: "Tailored to You", desc: "No two sessions are the same. Your treatment is adapted to your body and needs on the day." },
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
              <button className="btn-gold" onClick={() => nav("book")}>Book a Session</button>
            </div>
          </div>
        </div>
      )}

      {/* BOOK */}
      {page === "book" && (
        <div className="page">
          <PageHero img="https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1400&q=80" label="Reserve Your Time" title="Book a Session" />
          <div className="booking-page">
            <div style={{ maxWidth: "580px", margin: "0 auto", textAlign: "center" }}>
              <p className="section-desc" style={{ marginBottom: "2rem" }}>
                All appointments are arranged by WhatsApp. Simply send a message to get started — we will get back to you within business hours to confirm availability.
              </p>
              <div style={{ background: "#fffde8", border: "1px solid rgba(201,168,0,0.2)", borderRadius: "4px", padding: "1.8rem 2rem", marginBottom: "2.5rem", textAlign: "left" }}>
                <p style={{ fontSize: "0.88rem", color: "#5a5040", lineHeight: "1.8", marginBottom: "1.2rem" }}>
                  <strong style={{ color: "#2c2a20", display: "block", marginBottom: "0.3rem" }}>New clients</strong>
                  You will be asked to complete a short consultation form before your appointment is confirmed. This helps ensure your treatment is safe, suitable, and tailored to you.
                </p>
                <p style={{ fontSize: "0.88rem", color: "#5a5040", lineHeight: "1.8" }}>
                  <strong style={{ color: "#2c2a20", display: "block", marginBottom: "0.3rem" }}>Returning clients</strong>
                  Just message to let us know your preferred treatment and date — we will take it from there.
                </p>
              </div>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I'd like to book an appointment at Yellow Wellness.")}`} className="wa-btn" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", padding: "1rem 2.5rem", justifyContent: "center", display: "inline-flex" }}>
                <WaIcon /> Message on WhatsApp
              </a>
              <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#5a5040", letterSpacing: "0.05em" }}>
                Available daily · 11am–8pm · hello@yellowwellness.co.uk
              </p>
            </div>
          </div>
        </div>
      )}


      {/* REVIEWS */}
      {page === "feedback" && (
        <div className="page">
          <PageHero img="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1400&q=80" label="Share Your Experience" title="Leave a Review" />
          <div className="feedback-page">
            <p className="section-desc" style={{ marginBottom: "3rem" }}>Your feedback means the world and helps us continue to deliver the best possible experience. Please take a moment to rate your visit.</p>
            {!feedbackDone ? (
              <>
                {[
                  { id: "treatment", label: "How was your overall treatment?" },
                  { id: "therapist", label: "How was your therapist?" },
                  { id: "ambiance", label: "How was the ambiance?" },
                  { id: "relaxed", label: "How relaxed did you feel afterwards?" },
                  { id: "value", label: "How would you rate the value for money?" },
                ].map(q => (
                  <div className="star-group" key={q.id}>
                    <label>{q.label}</label>
                    <div className="stars">
                      {[1,2,3,4,5].map(n => (
                        <span key={n} className={`star${ratings[q.id] >= n ? " active" : ""}`} onClick={() => setRatings(r => ({ ...r, [q.id]: n }))}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="form-group" style={{ marginTop: "2rem" }}>
                  <label>Anything else you'd like to share?</label>
                  <textarea rows={5} value={feedbackComment} onChange={e => setFeedbackComment(e.target.value)} placeholder="Tell us about your experience..." />
                </div>
                <button className="btn-gold" onClick={() => setFeedbackDone(true)}>Submit Review</button>
              </>
            ) : (
              <div className="success-msg" style={{ fontSize: "1rem", padding: "2rem" }}>
                ✦ &nbsp; Thank you so much for your review! Your feedback is incredibly valuable and helps Yellow Wellness grow. We hope to welcome you back very soon.
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div className="page">
          <PageHero img="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80" label="Get in Touch" title="Contact Us" />
          <div className="contact-page">
            <div className="contact-grid">
              <div>
                <span className="section-label">Contact Details</span>
                <h2 className="section-title">Say Hello</h2>
                <p className="section-desc" style={{ marginBottom: "2rem" }}>Have a question before booking? Not sure which treatment is right for you? Get in touch — I'm happy to help.</p>
                {[
                  { icon: "📍", title: "Location", text: "Wolverhampton — exact address provided upon booking" },
                  { icon: "📧", title: "Email", text: "hello@yellowwellness.co.uk" },
                  { icon: "🕐", title: "Hours", text: "Available daily, 11am–8pm (hours vary by day)" },
                  { icon: "🚗", title: "Mobile Services", text: "Available on request — subject to ground floor access and parking" },
                ].map((d, i) => (
                  <div className="contact-detail" key={i}>
                    <span className="contact-detail-icon">{d.icon}</span>
                    <div className="contact-detail-text">
                      <strong>{d.title}</strong>
                      <span>{d.text}</span>
                    </div>
                  </div>
                ))}
                <a href={`https://wa.me/${WA}`} className="wa-btn" target="_blank" rel="noopener noreferrer" style={{ marginTop: "1.5rem" }}>
                  <WaIcon /> Chat on WhatsApp
                </a>
              </div>
              <div>
                <span className="section-label">Send a Message</span>
                <h2 className="section-title" style={{ marginBottom: "2rem" }}>Drop Us a Line</h2>
                {!contactDone ? (
                  <>
                    <div className="form-group"><label>Your Name</label><input value={contactForm.name} onChange={e => uC("name", e.target.value)} placeholder="Name" /></div>
                    <div className="form-group"><label>Email Address</label><input type="email" value={contactForm.email} onChange={e => uC("email", e.target.value)} placeholder="email@example.com" /></div>
                    <div className="form-group"><label>Message</label><textarea rows={6} value={contactForm.message} onChange={e => uC("message", e.target.value)} placeholder="Your question or message..." /></div>
                    <button className="btn-gold" onClick={() => { if (contactForm.name && contactForm.email && contactForm.message) setContactDone(true); }}>Send Message</button>
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
        <img src="/logo.png" alt="Yellow Wellness" className="footer-logo" onClick={() => nav("home")} style={{ cursor: "pointer" }} />
        <span className="footer-text">© 2025 · Yellow Wellness · Home-Based Massage Therapy · Wolverhampton</span>
        <span className="footer-link" onClick={() => nav("feedback")}>Leave a Review</span>
      </footer>
    </>
  );
}
