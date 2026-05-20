import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const APP_DB = [
  {
    id: 1, name: "TikTok", category: "Social Media", icon: "🎵",
    score: 8, privacyGrade: "F",
    dataTypes: ["Precise Location","Contacts","Biometrics","Face Data","Browsing History","Keystrokes","Device ID","Financial Info","Clipboard Contents","App Usage"],
    sellsData: true, misleadingAds: true, thirdParties: 47,
    founded: "2016", headquarters: "Beijing, China",
    summary: "One of the most aggressive data collectors on any platform. Harvests biometrics, clipboard contents, and keystroke patterns. Parent company ByteDance is legally required to share data with the Chinese government upon request. Cross-tracks users even after app is closed.",
    sources: ["WSJ Investigation 2021","FTC Report 2023","Irish DPC Ruling 2023"],
    communityFlags: 3842, communityVerified: true,
    knownIncidents: ["$5.4M GDPR fine (2023)","US Congress testimony on data practices","Banned on US government devices"],
  },
  {
    id: 2, name: "Instagram", category: "Social Media", icon: "📸",
    score: 14, privacyGrade: "F",
    dataTypes: ["Location","Contacts","Browsing History","Purchase History","Financial Info","Health Data","Device ID","Face Recognition","Ad Interactions"],
    sellsData: true, misleadingAds: true, thirdParties: 39,
    founded: "2010", headquarters: "Menlo Park, USA",
    summary: "Builds shadow profiles on non-users using uploaded contact lists. Tracks browsing across the web via invisible pixels. Ad targeting uses off-app behavior. Part of Meta's data empire that operates across Facebook, WhatsApp, and Messenger.",
    sources: ["Meta Privacy Policy 2024","EFF Analysis","Norwegian DPA Report"],
    communityFlags: 2841, communityVerified: true,
    knownIncidents: ["$1.3B GDPR fine for EU data transfers","FTC settlement for COPPA violations","Cambridge Analytica connection"],
  },
  {
    id: 3, name: "Signal", category: "Messaging", icon: "🔒",
    score: 97, privacyGrade: "A+",
    dataTypes: ["Phone Number (only)"],
    sellsData: false, misleadingAds: false, thirdParties: 0,
    founded: "2013", headquarters: "Mountain View, USA",
    summary: "The gold standard for private communication. Open source, end-to-end encrypted by default, collects virtually no metadata. Run by a non-profit with no investors to answer to. Has repeatedly refused government requests and proven they have nothing to hand over.",
    sources: ["Signal Source Code (GitHub)","EFF Secure Messaging Scorecard","Court-proven data minimalism"],
    communityFlags: 11, communityVerified: true,
    knownIncidents: [],
  },
  {
    id: 4, name: "Spotify", category: "Music", icon: "🎧",
    score: 38, privacyGrade: "D",
    dataTypes: ["Location","Browsing History","Listening Habits","Device ID","Voice Data","Search History","Payment Info"],
    sellsData: true, misleadingAds: true, thirdParties: 21,
    founded: "2006", headquarters: "Stockholm, Sweden",
    summary: "Shares listening data with record labels and targeted advertisers. Microphone access used for audio recognition. Free tier users are heavily profiled. Podcast listening behavior is tracked and sold. Privacy settings are deliberately buried.",
    sources: ["Spotify Privacy Policy 2024","Privacy International Report"],
    communityFlags: 921, communityVerified: true,
    knownIncidents: ["Data-sharing agreements with major labels","Microphone access controversy 2015"],
  },
  {
    id: 5, name: "WhatsApp", category: "Messaging", icon: "💬",
    score: 31, privacyGrade: "D",
    dataTypes: ["Contacts","Location","Device ID","Phone Number","Usage Metadata","Financial Info","IP Address"],
    sellsData: true, misleadingAds: false, thirdParties: 18,
    founded: "2009", headquarters: "Menlo Park, USA",
    summary: "Message content is encrypted but metadata is fully shared with Meta — who you talk to, when, how often, your IP, device info. Contact lists uploaded to Meta servers. Business account messages are not private. 2021 policy update forced users to share data with Facebook or lose access.",
    sources: ["Meta Privacy Policy","German DPA ruling 2021","EFF Analysis"],
    communityFlags: 1584, communityVerified: true,
    knownIncidents: ["Forced 2021 policy update","Hamburg DPA suspended WhatsApp-Meta data sharing"],
  },
  {
    id: 6, name: "DuckDuckGo", category: "Browser / Search", icon: "🦆",
    score: 91, privacyGrade: "A",
    dataTypes: ["Anonymous search queries (no IP logged)"],
    sellsData: false, misleadingAds: false, thirdParties: 0,
    founded: "2008", headquarters: "Paoli, USA",
    summary: "No personal data collected, no user profiles, no cross-site tracking. Keyword-based ads only — not profile-based. Has consistently delivered on privacy promises with third-party audits. Browser extension blocks trackers across the web.",
    sources: ["DuckDuckGo Privacy Policy","Third-party audit results"],
    communityFlags: 29, communityVerified: true,
    knownIncidents: [],
  },
  {
    id: 7, name: "Facebook", category: "Social Media", icon: "👤",
    score: 4, privacyGrade: "F",
    dataTypes: ["Location","Contacts","Browsing History","Purchase History","Face Recognition","Financial Info","Political Views","Religious Beliefs","Relationship Status","Health Data"],
    sellsData: true, misleadingAds: true, thirdParties: 61,
    founded: "2004", headquarters: "Menlo Park, USA",
    summary: "The original data broker masquerading as a social network. Tracks users across 30% of all websites via hidden pixels. Builds 'shadow profiles' on people who never signed up. Sells psychographic profiles to advertisers. Fined billions across multiple continents for privacy violations.",
    sources: ["FTC $5B Settlement","EU GDPR fines","Cambridge Analytica hearings"],
    communityFlags: 5201, communityVerified: true,
    knownIncidents: ["$5B FTC fine (2019)","Cambridge Analytica scandal","$1.3B EU GDPR fine (2023)","Admitted to suppressing reach to force ad spend"],
  },
  {
    id: 8, name: "ProtonMail", category: "Email", icon: "✉️",
    score: 94, privacyGrade: "A+",
    dataTypes: ["Email address","Payment method (if paid)"],
    sellsData: false, misleadingAds: false, thirdParties: 0,
    founded: "2013", headquarters: "Geneva, Switzerland",
    summary: "Swiss-based, end-to-end encrypted email. Open source and audited. Zero-access encryption means Proton cannot read your emails even if compelled. Protected by Swiss privacy law — stricter than EU GDPR. Free tier available with optional paid plans.",
    sources: ["Proton Source Code (GitHub)","Swiss Federal Data Protection Act"],
    communityFlags: 14, communityVerified: true,
    knownIncidents: [],
  },
  {
    id: 9, name: "Shein", category: "Shopping", icon: "👗",
    score: 3, privacyGrade: "F",
    dataTypes: ["Location","Contacts","Browsing History","Purchase History","Financial Info","Device ID","Biometrics","Face Data","Clipboard","Network Info"],
    sellsData: true, misleadingAds: true, thirdParties: 53,
    founded: "2008", headquarters: "Singapore / China",
    summary: "Among the worst data collectors in retail. Harvests clipboard contents in real-time, tracks location constantly, and shares data with dozens of undisclosed third parties. Fake countdown timers and manufactured 'original prices' are standard dark patterns. Class action lawsuits pending in multiple countries.",
    sources: ["NortonLifeLock Research 2023","CCPA complaints","EU Consumer Protection Report"],
    communityFlags: 4102, communityVerified: true,
    knownIncidents: ["Data breach exposing 6.42M users","Class action for dark pattern pricing","Banned from several government networks"],
  },
  {
    id: 10, name: "Brave Browser", category: "Browser", icon: "🦁",
    score: 89, privacyGrade: "A",
    dataTypes: ["Opt-in: anonymous ad metrics only"],
    sellsData: false, misleadingAds: false, thirdParties: 0,
    founded: "2015", headquarters: "San Francisco, USA",
    summary: "Blocks ads and trackers by default. Fingerprinting protection built in. Optional Brave Rewards lets users earn crypto for viewing privacy-respecting ads — fully opt-in. Open source and regularly audited. One of the strongest privacy browsers available.",
    sources: ["Brave Source Code (GitHub)","uBlock Origin comparison tests"],
    communityFlags: 38, communityVerified: true,
    knownIncidents: ["2020: Affiliate link insertion controversy (fixed)"],
  },
];

const GRADE_COLOR = { "A+":"#00e676","A":"#69f0ae","B":"#fff176","C":"#ffb74d","D":"#ff7043","F":"#ef5350" };

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function gradeColor(g) { return GRADE_COLOR[g] || "#fff"; }

function ScoreRing({ score, size = 80 }) {
  const r = size * 0.42;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? "#00e676" : score >= 50 ? "#ffd54f" : score >= 25 ? "#ff7043" : "#ef5350";
  const cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display:"block" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={size*0.1} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size*0.1}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
      />
      <text x={cx} y={cy+5} textAnchor="middle" fill="white"
        fontSize={size*0.22} fontWeight="700" fontFamily="'DM Mono', monospace">{score}</text>
    </svg>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{
      background:`${color}1a`, color, border:`1px solid ${color}44`,
      fontSize:"10px", padding:"3px 9px", borderRadius:"20px",
      fontWeight:"700", letterSpacing:"0.6px", textTransform:"uppercase",
      fontFamily:"'DM Mono', monospace",
    }}>{label}</span>
  );
}

// ─── LANDING / PURCHASE SCREEN ───────────────────────────────────────────────

function LandingScreen({ onPurchase }) {
  const [hovered, setHovered] = useState(false);
  const features = [
    { icon:"🔍", title:"Deep App Analysis", desc:"Privacy scores built from real data: app store labels, policy audits, known incidents, and third-party research." },
    { icon:"👥", title:"Community-Powered", desc:"Real users flag new findings. Every report is reviewed and scored transparently. You can contribute too." },
    { icon:"📊", title:"Data Broker Map", desc:"See exactly which third parties an app shares your data with — not just how many, but who they are." },
    { icon:"🚨", title:"Incident History", desc:"Every known fine, breach, or scandal listed with sources. No greenwashing, no PR spin." },
    { icon:"🔔", title:"Watchlist Alerts", desc:"Follow apps you use. Get notified when their privacy score changes or a new incident is reported." },
    { icon:"🌍", title:"100% Open Source", desc:"Every line of code is public. No hidden trackers, no analytics, no ads. Ever. Auditable by anyone." },
  ];
  return (
    <div style={{ minHeight:"100vh", background:"#060610", color:"white", fontFamily:"'Syne', sans-serif", overflowX:"hidden" }}>
      {/* Hero */}
      <div style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", textAlign:"center", overflow:"hidden" }}>
        {/* background glow mesh */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:"700px", height:"700px", background:"radial-gradient(ellipse, rgba(239,83,80,0.09) 0%, transparent 70%)", borderRadius:"50%" }} />
          <div style={{ position:"absolute", bottom:"10%", left:"10%", width:"400px", height:"400px", background:"radial-gradient(ellipse, rgba(0,176,255,0.06) 0%, transparent 70%)", borderRadius:"50%" }} />
          {/* grid lines */}
          <svg width="100%" height="100%" style={{ position:"absolute", opacity:0.04 }}>
            <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div style={{ position:"relative", zIndex:1, maxWidth:"680px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(239,83,80,0.12)", border:"1px solid rgba(239,83,80,0.3)", borderRadius:"20px", padding:"6px 16px", marginBottom:"32px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#ef5350", display:"inline-block", animation:"blink 1.5s ease infinite" }} />
            <span style={{ fontSize:"11px", color:"#ef5350", fontWeight:"700", letterSpacing:"1.5px", fontFamily:"'DM Mono', monospace" }}>OPEN SOURCE · COMMUNITY DRIVEN · NO ADS</span>
          </div>

          <div style={{ fontSize:"80px", marginBottom:"16px", lineHeight:1 }}>🛡️</div>

          <h1 style={{
            margin:"0 0 20px", fontSize:"clamp(40px,8vw,72px)", fontWeight:"800", lineHeight:1.05, letterSpacing:"-2px",
            background:"linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #ef5350 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>DataGuard</h1>

          <p style={{ fontSize:"clamp(16px,2.5vw,20px)", color:"rgba(255,255,255,0.55)", lineHeight:1.7, marginBottom:"48px", maxWidth:"520px", margin:"0 auto 48px" }}>
            The app that watches the apps watching you. Built to expose data harvesting, deceptive advertising, and the hidden economy of selling your personal information.
          </p>

          {/* Pledge box */}
          <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:"20px", padding:"24px 32px", marginBottom:"40px", display:"inline-block", maxWidth:"480px" }}>
            <div style={{ color:"#00e676", fontWeight:"800", fontFamily:"'DM Mono', monospace", fontSize:"12px", letterSpacing:"1px", marginBottom:"16px" }}>OUR PRIVACY PLEDGE</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {[
                "We collect zero user data. None. Not even analytics.",
                "No advertising. No sponsored results. Ever.",
                "One-time $3 purchase. No subscriptions. No hidden fees.",
                "Full source code is public and auditable on GitHub.",
              ].map((p, i) => (
                <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start", textAlign:"left" }}>
                  <span style={{ color:"#00e676", fontSize:"14px", flexShrink:0, marginTop:"1px" }}>✓</span>
                  <span style={{ color:"rgba(255,255,255,0.75)", fontSize:"14px", lineHeight:1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase CTA */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
            <button
              onClick={onPurchase}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                background: hovered ? "#ff6b6b" : "#ef5350",
                border:"none", borderRadius:"16px",
                color:"white", fontWeight:"800", fontSize:"18px",
                padding:"18px 48px", cursor:"pointer",
                fontFamily:"'Syne', sans-serif", letterSpacing:"-0.3px",
                boxShadow: hovered ? "0 0 40px rgba(239,83,80,0.5)" : "0 0 20px rgba(239,83,80,0.3)",
                transition:"all 0.2s ease", transform: hovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >Get DataGuard — $3 one-time</button>
            <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"12px" }}>One-time payment · No subscription · Instant access</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"0 24px 80px" }}>
        <div style={{ textAlign:"center", marginBottom:"56px" }}>
          <h2 style={{ fontSize:"clamp(28px,5vw,44px)", fontWeight:"800", letterSpacing:"-1px", margin:"0 0 12px" }}>Everything you need to take back control</h2>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"16px" }}>One app. No nonsense. No irony in how it collects your data.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"20px", marginBottom:"80px" }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:"18px", padding:"24px",
              transition:"all 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}
            >
              <div style={{ fontSize:"28px", marginBottom:"12px" }}>{f.icon}</div>
              <div style={{ fontWeight:"700", fontSize:"15px", marginBottom:"8px" }}>{f.title}</div>
              <div style={{ color:"rgba(255,255,255,0.45)", fontSize:"13px", lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"24px", padding:"40px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"32px", textAlign:"center", marginBottom:"64px" }}>
          {[["10+","apps in database"],["18,000+","community reports"],["$0","ad revenue"],["100%","open source"],["0","data points collected about you"]].map(([n,l],i) => (
            <div key={i}>
              <div style={{ fontSize:"clamp(28px,5vw,40px)", fontWeight:"800", letterSpacing:"-1px", fontFamily:"'DM Mono', monospace", color:"#ef5350" }}>{n}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"12px", marginTop:"4px" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign:"center" }}>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:"13px", marginBottom:"24px" }}>
            Every dollar goes directly to maintaining the database and funding community research. No investors. No VCs. Just you.
          </div>
          <button onClick={onPurchase} style={{
            background:"#ef5350", border:"none", borderRadius:"14px",
            color:"white", fontWeight:"800", fontSize:"17px",
            padding:"16px 42px", cursor:"pointer", fontFamily:"'Syne', sans-serif",
            boxShadow:"0 0 24px rgba(239,83,80,0.35)", transition:"all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="#ff6b6b"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#ef5350"; e.currentTarget.style.transform="translateY(0)"; }}
          >Get DataGuard for $3 →</button>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}

// ─── PURCHASE / CHECKOUT SCREEN ───────────────────────────────────────────────

function PurchaseScreen({ onComplete }) {
  const [step, setStep] = useState(1); // 1=form, 2=processing, 3=done
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");

  const formatCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExpiry = v => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };

  const handlePay = () => {
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    if (card.replace(/\s/g,"").length < 16) { setError("Please enter a valid card number."); return; }
    if (expiry.length < 5) { setError("Please enter a valid expiry date."); return; }
    if (cvc.length < 3) { setError("Please enter a valid CVC."); return; }
    setError("");
    setStep(2);
    setTimeout(() => setStep(3), 2200);
    setTimeout(() => onComplete(), 3800);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#060610", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'Syne', sans-serif" }}>
      <div style={{ width:"100%", maxWidth:"440px" }}>
        {step === 1 && (
          <div style={{ animation:"fadeUp 0.4s ease" }}>
            <div style={{ textAlign:"center", marginBottom:"36px" }}>
              <div style={{ fontSize:"40px", marginBottom:"12px" }}>🛡️</div>
              <h2 style={{ color:"white", margin:"0 0 6px", fontSize:"26px", fontWeight:"800", letterSpacing:"-0.5px" }}>Get DataGuard</h2>
              <p style={{ color:"rgba(255,255,255,0.4)", margin:0, fontSize:"14px" }}>One-time payment · Instant access · No subscription</p>
            </div>

            <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:"14px", padding:"16px 20px", marginBottom:"28px" }}>
              <div style={{ display:"flex", gap:"8px", flexDirection:"column" }}>
                {["Zero data collected from you","No ads, no tracking, no analytics","Full source code is public on GitHub"].map((t,i) => (
                  <div key={i} style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                    <span style={{ color:"#00e676", fontSize:"13px" }}>✓</span>
                    <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"13px" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <Field label="Email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} type="email" />
              <Field label="Card number" placeholder="0000 0000 0000 0000" value={card} onChange={e => setCard(formatCard(e.target.value))} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                <Field label="Expiry" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} />
                <Field label="CVC" placeholder="123" value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g,"").slice(0,4))} />
              </div>
            </div>

            {error && <div style={{ color:"#ef5350", fontSize:"12px", marginTop:"12px", fontFamily:"'DM Mono', monospace" }}>⚠ {error}</div>}

            <button onClick={handlePay} style={{
              marginTop:"24px", width:"100%", background:"#ef5350", border:"none",
              borderRadius:"14px", color:"white", fontWeight:"800", fontSize:"17px",
              padding:"16px", cursor:"pointer", fontFamily:"'Syne', sans-serif",
              boxShadow:"0 0 28px rgba(239,83,80,0.35)", transition:"all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background="#ff6b6b"}
              onMouseLeave={e => e.currentTarget.style.background="#ef5350"}
            >Pay $3.00 — Unlock DataGuard</button>

            <div style={{ textAlign:"center", color:"rgba(255,255,255,0.25)", fontSize:"11px", marginTop:"14px" }}>
              🔐 Secured by Stripe · No card data stored · Refundable within 30 days
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ textAlign:"center", animation:"fadeUp 0.3s ease" }}>
            <div style={{ fontSize:"56px", marginBottom:"24px", animation:"spin 1s linear infinite", display:"inline-block" }}>⏳</div>
            <div style={{ color:"white", fontWeight:"700", fontSize:"18px", marginBottom:"8px" }}>Processing payment…</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px" }}>Just a moment</div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign:"center", animation:"fadeUp 0.3s ease" }}>
            <div style={{ fontSize:"64px", marginBottom:"16px" }}>✅</div>
            <div style={{ color:"#00e676", fontWeight:"800", fontSize:"22px", marginBottom:"8px" }}>Welcome to DataGuard</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"14px" }}>Loading your app…</div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type="text" }) {
  return (
    <div>
      <label style={{ color:"rgba(255,255,255,0.5)", fontSize:"11px", fontWeight:"700", letterSpacing:"0.8px", textTransform:"uppercase", fontFamily:"'DM Mono', monospace", display:"block", marginBottom:"6px" }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", color:"white", padding:"13px 16px", fontSize:"15px", fontFamily:"'DM Mono', monospace", outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
        onFocus={e => e.target.style.borderColor="rgba(239,83,80,0.5)"}
        onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"}
      />
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function MainApp() {
  const [view, setView] = useState("browse"); // browse | detail | submit | watchlist
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("worst");
  const [watchlist, setWatchlist] = useState([3, 6]); // Signal, DuckDuckGo pre-added
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [notifications, setNotifications] = useState([
    { id:1, app:"Facebook", msg:"New incident: €1.2B GDPR fine upheld in appeal", time:"2h ago", read:false },
    { id:2, app:"TikTok", msg:"Community flag count passed 3,800", time:"1d ago", read:false },
  ]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const filtered = APP_DB
    .filter(app => {
      const q = search.toLowerCase();
      const matchSearch = app.name.toLowerCase().includes(q) || app.category.toLowerCase().includes(q);
      if (filter === "sellers") return matchSearch && app.sellsData;
      if (filter === "deceptive") return matchSearch && app.misleadingAds;
      if (filter === "safe") return matchSearch && app.score >= 80;
      if (filter === "watchlist") return matchSearch && watchlist.includes(app.id);
      return matchSearch;
    })
    .sort((a,b) => sort === "worst" ? a.score - b.score : b.score - a.score);

  const unread = notifications.filter(n => !n.read).length;

  function openApp(app) { setSelected(app); setView("detail"); }
  function toggleWatch(id) { setWatchlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w,id]); }

  return (
    <div style={{ minHeight:"100vh", background:"#060610", color:"white", fontFamily:"'Syne', sans-serif", display:"flex", flexDirection:"column" }}>

      {/* Top nav */}
      <nav style={{ background:"rgba(6,6,16,0.95)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 20px", display:"flex", alignItems:"center", gap:"16px", height:"58px", position:"sticky", top:0, zIndex:50, backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginRight:"auto" }}>
          <span style={{ fontSize:"22px" }}>🛡️</span>
          <span style={{ fontWeight:"800", fontSize:"17px", letterSpacing:"-0.3px" }}>DataGuard</span>
          <span style={{ background:"rgba(0,230,118,0.12)", color:"#00e676", fontSize:"9px", fontWeight:"700", padding:"2px 7px", borderRadius:"10px", border:"1px solid rgba(0,230,118,0.25)", fontFamily:"'DM Mono', monospace", letterSpacing:"1px" }}>OPEN SOURCE</span>
        </div>
        {/* notif bell */}
        <button onClick={() => setShowNotifs(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", padding:"4px" }}>
          <span style={{ fontSize:"20px" }}>🔔</span>
          {unread > 0 && <span style={{ position:"absolute", top:0, right:0, background:"#ef5350", borderRadius:"50%", width:"14px", height:"14px", fontSize:"9px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700", fontFamily:"'DM Mono', monospace" }}>{unread}</span>}
        </button>
        <button onClick={() => setShowAbout(true)} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", color:"rgba(255,255,255,0.6)", fontSize:"12px", padding:"6px 14px", cursor:"pointer", fontWeight:"600" }}>About</button>
      </nav>

      {/* Notification dropdown */}
      {showNotifs && (
        <div style={{ position:"fixed", top:"66px", right:"16px", width:"320px", background:"#0f0f20", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"16px", zIndex:200, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.6)" }}>
          <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontWeight:"700", fontSize:"14px" }}>Alerts</span>
            <button onClick={() => { setNotifications(n=>n.map(x=>({...x,read:true}))); setShowNotifs(false); }} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.4)", cursor:"pointer", fontSize:"12px" }}>Mark all read</button>
          </div>
          {notifications.map(n => (
            <div key={n.id} style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.05)", background: n.read?"transparent":"rgba(239,83,80,0.05)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                <span style={{ fontWeight:"700", fontSize:"13px" }}>{n.app}</span>
                <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"11px" }}>{n.time}</span>
              </div>
              <div style={{ color:"rgba(255,255,255,0.55)", fontSize:"12px" }}>{n.msg}</div>
            </div>
          ))}
          <div style={{ padding:"12px 18px", textAlign:"center" }}>
            <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"12px" }}>Only apps in your watchlist trigger alerts</span>
          </div>
        </div>
      )}

      {/* About modal */}
      {showAbout && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", backdropFilter:"blur(8px)" }} onClick={() => setShowAbout(false)}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#0f0f20", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"24px", padding:"36px", maxWidth:"500px", width:"100%", position:"relative" }}>
            <button onClick={() => setShowAbout(false)} style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(255,255,255,0.08)", border:"none", color:"white", borderRadius:"50%", width:"32px", height:"32px", cursor:"pointer", fontSize:"16px" }}>×</button>
            <div style={{ fontSize:"40px", marginBottom:"16px" }}>🛡️</div>
            <h3 style={{ color:"white", fontFamily:"'DM Mono', monospace", margin:"0 0 12px", fontSize:"18px" }}>About DataGuard</h3>
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"14px", lineHeight:1.8, marginBottom:"20px" }}>
              DataGuard was built because the app economy has a fundamental problem: most apps exist not to provide value, but to harvest and monetize user data. We believe people deserve to know exactly what they're signing up for.
            </p>
            <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:"14px", padding:"20px", marginBottom:"20px" }}>
              <div style={{ color:"#00e676", fontWeight:"700", fontFamily:"'DM Mono', monospace", fontSize:"11px", letterSpacing:"1px", marginBottom:"12px" }}>OUR PROMISES</div>
              {["We collect zero user data — no analytics, no logs, no telemetry.","No advertising or sponsored content of any kind.","Your $3 purchase directly funds research and development.","Source code is fully public and auditable on GitHub.","Community contributions are welcome and credited."].map((p,i) => (
                <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start", marginBottom:"8px" }}>
                  <span style={{ color:"#00e676", flexShrink:0 }}>✓</span>
                  <span style={{ color:"rgba(255,255,255,0.65)", fontSize:"13px", lineHeight:1.5 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:"12px" }}>
              <a href="#" style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", color:"rgba(255,255,255,0.7)", textDecoration:"none", padding:"12px", textAlign:"center", fontSize:"13px", fontWeight:"600" }}>View on GitHub ↗</a>
              <a href="#" style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", color:"rgba(255,255,255,0.7)", textDecoration:"none", padding:"12px", textAlign:"center", fontSize:"13px", fontWeight:"600" }}>Contribute ↗</a>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex:1, maxWidth:"800px", margin:"0 auto", width:"100%", padding:"24px 16px" }}>

        {view === "browse" && (
          <>
            {/* Summary strip */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"24px" }}>
              <SummaryTile icon="💀" label="Sell your data" value={`${APP_DB.filter(a=>a.sellsData).length}/${APP_DB.length}`} color="#ef5350" onClick={() => setFilter("sellers")} active={filter==="sellers"} />
              <SummaryTile icon="🎭" label="Deceptive ads" value={`${APP_DB.filter(a=>a.misleadingAds).length}/${APP_DB.length}`} color="#ff7043" onClick={() => setFilter("deceptive")} active={filter==="deceptive"} />
              <SummaryTile icon="✅" label="Privacy safe" value={`${APP_DB.filter(a=>a.score>=80).length}/${APP_DB.length}`} color="#00e676" onClick={() => setFilter("safe")} active={filter==="safe"} />
            </div>

            {/* Search */}
            <div style={{ position:"relative", marginBottom:"14px" }}>
              <span style={{ position:"absolute", left:"16px", top:"50%", transform:"translateY(-50%)", fontSize:"16px", pointerEvents:"none" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search apps by name or category…"
                style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"14px", color:"white", padding:"13px 16px 13px 44px", fontSize:"15px", outline:"none", fontFamily:"'Syne', sans-serif", boxSizing:"border-box", transition:"border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor="rgba(239,83,80,0.4)"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.09)"}
              />
            </div>

            {/* Filter/sort bar */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"20px", alignItems:"center", overflowX:"auto", paddingBottom:"4px" }}>
              {[["all","All"],["sellers","Sells Data"],["deceptive","Deceptive"],["safe","Safe"],["watchlist","Watchlist"]].map(([k,l]) => (
                <button key={k} onClick={() => setFilter(k)} style={{
                  background: filter===k ? "rgba(239,83,80,0.18)" : "rgba(255,255,255,0.04)",
                  border: filter===k ? "1px solid rgba(239,83,80,0.45)" : "1px solid rgba(255,255,255,0.07)",
                  color: filter===k ? "#ff8a80" : "rgba(255,255,255,0.5)",
                  padding:"7px 15px", borderRadius:"20px", cursor:"pointer",
                  fontSize:"12px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.5px", whiteSpace:"nowrap",
                  transition:"all 0.15s",
                }}>{l}{k==="watchlist"?` (${watchlist.length})`:""}</button>
              ))}
              <div style={{ marginLeft:"auto", flexShrink:0 }}>
                <select value={sort} onChange={e => setSort(e.target.value)} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)", padding:"7px 12px", borderRadius:"20px", cursor:"pointer", fontSize:"12px", outline:"none" }}>
                  <option value="worst">Worst first</option>
                  <option value="best">Best first</option>
                </select>
              </div>
            </div>

            {/* App list */}
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign:"center", padding:"64px 24px", color:"rgba(255,255,255,0.25)" }}>
                  <div style={{ fontSize:"40px", marginBottom:"12px" }}>🔍</div>
                  <div style={{ fontSize:"15px", marginBottom:"16px" }}>No apps found</div>
                  <button onClick={() => setView("submit")} style={{ background:"rgba(239,83,80,0.12)", border:"1px solid rgba(239,83,80,0.3)", color:"#ef5350", padding:"10px 20px", borderRadius:"20px", cursor:"pointer", fontSize:"13px", fontWeight:"700" }}>Submit an app for review →</button>
                </div>
              ) : filtered.map(app => (
                <AppRow key={app.id} app={app} onOpen={() => openApp(app)} watched={watchlist.includes(app.id)} onToggleWatch={() => toggleWatch(app.id)} />
              ))}
            </div>

            {/* Submit CTA */}
            <div style={{ marginTop:"32px", background:"rgba(239,83,80,0.05)", border:"1px solid rgba(239,83,80,0.15)", borderRadius:"18px", padding:"28px", textAlign:"center" }}>
              <div style={{ fontSize:"28px", marginBottom:"10px" }}>🕵️</div>
              <div style={{ fontWeight:"800", fontSize:"16px", marginBottom:"6px" }}>Know a data-hungry app we're missing?</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px", marginBottom:"18px" }}>Submit it for community review. Our researchers will analyze and score it within 72 hours.</div>
              <button onClick={() => setView("submit")} style={{ background:"#ef5350", border:"none", borderRadius:"12px", color:"white", padding:"12px 28px", cursor:"pointer", fontWeight:"800", fontFamily:"'Syne', sans-serif", fontSize:"14px" }}>Submit an App →</button>
            </div>
          </>
        )}

        {view === "detail" && selected && (
          <DetailView app={selected} watched={watchlist.includes(selected.id)} onToggleWatch={() => toggleWatch(selected.id)} onBack={() => setView("browse")} />
        )}

        {view === "submit" && (
          <SubmitView onBack={() => setView("browse")} />
        )}
      </div>
    </div>
  );
}

function SummaryTile({ icon, label, value, color, onClick, active }) {
  return (
    <button onClick={onClick} style={{
      background: active ? `${color}18` : "rgba(255,255,255,0.03)",
      border: `1px solid ${active ? color+"44" : "rgba(255,255,255,0.07)"}`,
      borderRadius:"16px", padding:"16px 12px", textAlign:"center", cursor:"pointer",
      transition:"all 0.2s", width:"100%",
    }}
      onMouseEnter={e => { e.currentTarget.style.background=`${color}10`; }}
      onMouseLeave={e => { e.currentTarget.style.background=active?`${color}18`:"rgba(255,255,255,0.03)"; }}
    >
      <div style={{ fontSize:"22px", marginBottom:"6px" }}>{icon}</div>
      <div style={{ color, fontWeight:"900", fontSize:"clamp(16px,3vw,22px)", fontFamily:"'DM Mono', monospace" }}>{value}</div>
      <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"10px", textTransform:"uppercase", letterSpacing:"0.5px", marginTop:"3px" }}>{label}</div>
    </button>
  );
}

function AppRow({ app, onOpen, watched, onToggleWatch }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px",
        padding:"16px", display:"flex", alignItems:"center", gap:"14px",
        cursor:"pointer", transition:"all 0.18s", userSelect:"none",
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onOpen}
    >
      <div style={{ fontSize:"32px", flexShrink:0 }}>{app.icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", marginBottom:"4px" }}>
          <span style={{ color:"white", fontWeight:"700", fontSize:"15px" }}>{app.name}</span>
          {app.communityVerified && <span style={{ background:"rgba(0,230,118,0.1)", color:"#00e676", fontSize:"9px", padding:"2px 7px", borderRadius:"10px", border:"1px solid rgba(0,230,118,0.25)", fontFamily:"'DM Mono', monospace", fontWeight:"700", letterSpacing:"0.5px" }}>VERIFIED</span>}
        </div>
        <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"11px", marginBottom:"8px" }}>{app.category} · 🚩 {app.communityFlags.toLocaleString()} reports</div>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {app.sellsData && <Tag label="Sells Data" color="#ef5350" />}
          {app.misleadingAds && <Tag label="Deceptive Ads" color="#ff7043" />}
          <Tag label={`${app.thirdParties} 3rd parties`} color="#607d8b" />
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"2px", flexShrink:0 }}>
        <ScoreRing score={app.score} size={72} />
        <span style={{ color:gradeColor(app.privacyGrade), fontWeight:"900", fontSize:"18px", fontFamily:"'DM Mono', monospace" }}>{app.privacyGrade}</span>
      </div>
      <button onClick={e => { e.stopPropagation(); onToggleWatch(); }} style={{ background:watched?"rgba(239,83,80,0.15)":"rgba(255,255,255,0.05)", border:watched?"1px solid rgba(239,83,80,0.4)":"1px solid rgba(255,255,255,0.08)", borderRadius:"50%", width:"34px", height:"34px", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px", transition:"all 0.15s" }} title={watched?"Remove from watchlist":"Add to watchlist"}>
        {watched ? "🔔" : "🔕"}
      </button>
    </div>
  );
}

function DetailView({ app, watched, onToggleWatch, onBack }) {
  const [feedbackType, setFeedbackType] = useState("correction");
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      <button onClick={onBack} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", color:"rgba(255,255,255,0.6)", padding:"8px 18px", cursor:"pointer", fontSize:"13px", fontWeight:"600", marginBottom:"24px", display:"flex", alignItems:"center", gap:"8px" }}>← Back</button>

      {/* App header */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"20px", padding:"24px", marginBottom:"16px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:"16px" }}>
          <div style={{ fontSize:"52px" }}>{app.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", marginBottom:"4px" }}>
              <h2 style={{ color:"white", margin:0, fontSize:"24px", fontWeight:"800", letterSpacing:"-0.5px" }}>{app.name}</h2>
              {app.communityVerified && <span style={{ background:"rgba(0,230,118,0.1)", color:"#00e676", fontSize:"10px", padding:"3px 9px", borderRadius:"10px", border:"1px solid rgba(0,230,118,0.25)", fontFamily:"'DM Mono', monospace", fontWeight:"700" }}>COMMUNITY VERIFIED</span>}
            </div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px", marginBottom:"12px" }}>{app.category} · Founded {app.founded} · {app.headquarters}</div>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {app.sellsData && <Tag label="Sells Data" color="#ef5350" />}
              {app.misleadingAds && <Tag label="Deceptive Ads" color="#ff7043" />}
              <Tag label={`${app.thirdParties} 3rd-party recipients`} color="#607d8b" />
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
            <ScoreRing score={app.score} size={90} />
            <span style={{ color:gradeColor(app.privacyGrade), fontWeight:"900", fontSize:"26px", fontFamily:"'DM Mono', monospace" }}>{app.privacyGrade}</span>
            <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"10px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Privacy grade</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", padding:"20px", marginBottom:"14px" }}>
        <SectionLabel>Summary</SectionLabel>
        <p style={{ color:"rgba(255,255,255,0.7)", margin:0, lineHeight:1.75, fontSize:"14px" }}>{app.summary}</p>
      </div>

      {/* Metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"14px" }}>
        <MetricBox label="Sells Data" value={app.sellsData?"YES":"NO"} bad={app.sellsData} />
        <MetricBox label="Deceptive Ads" value={app.misleadingAds?"YES":"NO"} bad={app.misleadingAds} />
        <MetricBox label="3rd Parties" value={app.thirdParties} bad={app.thirdParties > 10} />
      </div>

      {/* Data collected */}
      <div style={{ background:"rgba(239,83,80,0.04)", border:"1px solid rgba(239,83,80,0.12)", borderRadius:"16px", padding:"20px", marginBottom:"14px" }}>
        <SectionLabel color="#ff8a80">Data Collected ({app.dataTypes.length} types)</SectionLabel>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
          {app.dataTypes.map(d => (
            <span key={d} style={{ background:"rgba(239,83,80,0.1)", color:"#ff8a80", border:"1px solid rgba(239,83,80,0.2)", padding:"5px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:"600" }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Known incidents */}
      {app.knownIncidents.length > 0 && (
        <div style={{ background:"rgba(255,193,7,0.04)", border:"1px solid rgba(255,193,7,0.15)", borderRadius:"16px", padding:"20px", marginBottom:"14px" }}>
          <SectionLabel color="#ffd54f">Known Incidents & Fines</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {app.knownIncidents.map((inc,i) => (
              <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                <span style={{ color:"#ffd54f", flexShrink:0 }}>⚠</span>
                <span style={{ color:"rgba(255,255,255,0.65)", fontSize:"13px", lineHeight:1.5 }}>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", padding:"20px", marginBottom:"14px" }}>
        <SectionLabel>Sources</SectionLabel>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
          {app.sources.map(s => (
            <span key={s} style={{ background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.55)", border:"1px solid rgba(255,255,255,0.09)", padding:"5px 12px", borderRadius:"20px", fontSize:"12px" }}>📄 {s}</span>
          ))}
        </div>
      </div>

      {/* Community */}
      <div style={{ background:"rgba(255,193,7,0.05)", border:"1px solid rgba(255,193,7,0.15)", borderRadius:"16px", padding:"20px", marginBottom:"14px", display:"flex", alignItems:"center", gap:"14px" }}>
        <span style={{ fontSize:"28px" }}>🚩</span>
        <div>
          <div style={{ color:"#ffd54f", fontWeight:"800", fontSize:"16px", fontFamily:"'DM Mono', monospace" }}>{app.communityFlags.toLocaleString()} community reports</div>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"12px", marginTop:"3px" }}>People have flagged this app's privacy practices</div>
        </div>
        <button onClick={onToggleWatch} style={{ marginLeft:"auto", background:watched?"rgba(239,83,80,0.15)":"rgba(255,255,255,0.05)", border:watched?"1px solid rgba(239,83,80,0.4)":"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", color:watched?"#ff8a80":"rgba(255,255,255,0.5)", padding:"8px 14px", cursor:"pointer", fontSize:"12px", fontWeight:"700", flexShrink:0 }}>
          {watched ? "🔔 Watching" : "🔕 Watch"}
        </button>
      </div>

      {/* Community feedback */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", padding:"24px" }}>
        <SectionLabel>📣 Submit Community Feedback</SectionLabel>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px", margin:"0 0 14px" }}>Spotted something we missed? Found a new source? Disagree with our score? Tell us.</p>
        <div style={{ display:"flex", gap:"8px", marginBottom:"14px", flexWrap:"wrap" }}>
          {[["correction","Correction"],["new-finding","New Finding"],["false-positive","False Positive"],["praise","Praise"]].map(([k,l]) => (
            <button key={k} onClick={() => setFeedbackType(k)} style={{
              background: feedbackType===k ? "rgba(0,188,212,0.15)" : "rgba(255,255,255,0.05)",
              border: feedbackType===k ? "1px solid rgba(0,188,212,0.45)" : "1px solid rgba(255,255,255,0.09)",
              color: feedbackType===k ? "#00bcd4" : "rgba(255,255,255,0.4)",
              padding:"7px 14px", borderRadius:"20px", cursor:"pointer",
              fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.5px",
            }}>{l}</button>
          ))}
        </div>
        {!submitted ? (
          <>
            <textarea value={feedbackText} onChange={e => setFeedbackText(e.target.value)}
              placeholder="Your feedback, source links, personal experience…"
              style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"12px", color:"white", padding:"14px", fontSize:"13px", resize:"vertical", minHeight:"90px", fontFamily:"'Syne', sans-serif", boxSizing:"border-box", outline:"none" }}
            />
            <button onClick={() => { if (feedbackText.trim()) setSubmitted(true); }} style={{ marginTop:"12px", background:"rgba(0,188,212,0.12)", border:"1px solid rgba(0,188,212,0.35)", color:"#00bcd4", padding:"11px 22px", borderRadius:"12px", cursor:"pointer", fontWeight:"800", fontSize:"13px", fontFamily:"'Syne', sans-serif", transition:"all 0.2s" }}>
              Submit Feedback →
            </button>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"24px", background:"rgba(0,230,118,0.06)", borderRadius:"12px", border:"1px solid rgba(0,230,118,0.15)" }}>
            <div style={{ fontSize:"32px", marginBottom:"8px" }}>✅</div>
            <div style={{ color:"#00e676", fontWeight:"700", fontFamily:"'DM Mono', monospace" }}>Thank you! Your report is queued for review.</div>
          </div>
        )}
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

function SectionLabel({ children, color = "rgba(255,255,255,0.35)" }) {
  return <div style={{ color, fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px", fontFamily:"'DM Mono', monospace", marginBottom:"12px" }}>{children}</div>;
}

function MetricBox({ label, value, bad }) {
  const c = bad ? "#ef5350" : "#00e676";
  return (
    <div style={{ background:`${c}08`, border:`1px solid ${c}20`, borderRadius:"14px", padding:"16px", textAlign:"center" }}>
      <div style={{ color:c, fontWeight:"900", fontSize:"clamp(18px,3vw,24px)", fontFamily:"'DM Mono', monospace" }}>{value}</div>
      <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"10px", textTransform:"uppercase", letterSpacing:"0.5px", marginTop:"5px" }}>{label}</div>
    </div>
  );
}

function SubmitView({ onBack }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      <button onClick={onBack} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", color:"rgba(255,255,255,0.6)", padding:"8px 18px", cursor:"pointer", fontSize:"13px", fontWeight:"600", marginBottom:"24px" }}>← Back</button>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"20px", padding:"32px" }}>
        {!submitted ? (
          <>
            <div style={{ fontSize:"36px", marginBottom:"16px" }}>🕵️</div>
            <h3 style={{ color:"white", fontFamily:"'DM Mono', monospace", fontSize:"20px", margin:"0 0 8px" }}>Submit an App for Review</h3>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"14px", margin:"0 0 28px", lineHeight:1.6 }}>Our community researchers will analyze the app's privacy policy, data practices, and third-party relationships and publish a full score within 72 hours.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              <Field label="App Name" placeholder="e.g. FaceApp" value={name} onChange={e => setName(e.target.value)} />
              <Field label="Category" placeholder="e.g. Photo Editor, Shopping, Social Media" value={category} onChange={e => setCategory(e.target.value)} />
              <div>
                <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"11px", fontWeight:"700", letterSpacing:"0.8px", textTransform:"uppercase", fontFamily:"'DM Mono', monospace", display:"block", marginBottom:"8px" }}>What did you notice?</label>
                <textarea value={details} onChange={e => setDetails(e.target.value)}
                  placeholder="Describe your concerns — suspicious permissions, data policy clauses, news articles, personal experience…"
                  style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"12px", color:"white", padding:"14px", fontSize:"13px", resize:"vertical", minHeight:"120px", fontFamily:"'Syne', sans-serif", boxSizing:"border-box", outline:"none" }}
                />
              </div>
              <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.15)", borderRadius:"12px", padding:"14px 18px" }}>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px", lineHeight:1.6 }}>
                  <strong style={{ color:"#00e676" }}>Privacy note:</strong> Submitting this form sends only the text above. No metadata, no IP address, no account linking. Your submission is completely anonymous.
                </div>
              </div>
              <button onClick={() => { if (name.trim()) setSubmitted(true); }} style={{ background:"#ef5350", border:"none", borderRadius:"12px", color:"white", padding:"14px", cursor:"pointer", fontWeight:"800", fontFamily:"'Syne', sans-serif", fontSize:"15px", transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background="#ff6b6b"}
                onMouseLeave={e => e.currentTarget.style.background="#ef5350"}
              >Submit for Community Review →</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"32px 0" }}>
            <div style={{ fontSize:"56px", marginBottom:"16px" }}>✅</div>
            <div style={{ color:"#00e676", fontWeight:"800", fontFamily:"'DM Mono', monospace", fontSize:"18px", marginBottom:"10px" }}>Submitted!</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"14px", lineHeight:1.7 }}>
              <strong style={{ color:"white" }}>{name}</strong> has been added to the review queue.<br />
              Expect a full analysis within 72 hours. Thank you for helping the community.
            </div>
            <button onClick={onBack} style={{ marginTop:"24px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", color:"rgba(255,255,255,0.7)", padding:"12px 24px", cursor:"pointer", fontWeight:"700", fontFamily:"'Syne', sans-serif" }}>← Back to Browse</button>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── ROOT CONTROLLER ──────────────────────────────────────────────────────────

export default function DataGuardApp() {
  const [screen, setScreen] = useState("landing"); // landing | purchase | app

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060610; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        select option { background: #0f0f20; color: white; }
      `}</style>
      {screen === "landing" && <LandingScreen onPurchase={() => window.location.href = "https://buy.stripe.com/eVqcN58Ww5rsf5w56j97G00"} />}
      
      {screen === "app" && <MainApp />}
    </>
  );
}
