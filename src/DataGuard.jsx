import { useState, useMemo } from "react";

// ── SUPABASE CONFIG ───────────────────────────────────────────────────────────
const SUPABASE_URL = "https://pgwrfbbznklerwipakrw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnd3JmYmJ6bmtsZXJ3aXBha3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTY4NTcsImV4cCI6MjA5NDg5Mjg1N30.LZONSaRsh4TXyis-Zfbuu8oGZN5qy0MVcfU40ItmzP4";

async function submitToSupabase(table, data) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}`, "Prefer": "return=minimal" },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (err) { return false; }
}

// ── CATEGORY GROUPS ───────────────────────────────────────────────────────────
// Each group maps a display label to the raw category strings used in APP_DB.
// match: null means "show all". Add new groups here as you expand the database.
export const CATEGORY_GROUPS = [
  { label: "All",           icon: "🌐", match: null },
  { label: "Social Media",  icon: "📱", match: ["Social Media", "Messaging / Super App", "Messaging / Social"] },
  { label: "Messaging",     icon: "💬", match: ["Messaging"] },
  { label: "Gaming",        icon: "🎮", match: ["Gaming", "Gaming / Chat", "Gaming / Social Platform", "Gaming / Digital Distribution", "Mobile Game", "Mobile Gaming", "Puzzle Game", "Sports Game", "Augmented Reality Game", "Children / Puzzle Game", "Children / Game", "Children / Social", "Game", "IoT / Robotics"] },
  { label: "Streaming",     icon: "📺", match: ["Streaming", "Streaming / Media", "Streaming / Smart TV", "Streaming / Anime", "Entertainment / Streaming", "Entertainment / Cinema", "Entertainment / Movies", "Sports / Streaming"] },
  { label: "Food & Drink",  icon: "🍔", match: ["Food & Drink", "Food Delivery", "Grocery Delivery", "Grocery / Shopping"] },
  { label: "Travel",        icon: "✈️", match: ["Travel / Booking", "Travel / Vacation Rentals", "Travel / Trip Planning", "Travel / Hotels", "Travel / Property Management", "Travel / Flight Search", "Travel / Search", "Travel / Airlines", "Travel / Flight Booking", "Travel / Planning", "Travel / Utility", "Airlines", "Aviation / Flight Tracking"] },
  { label: "Automotive",    icon: "🚗", match: ["Automotive", "Automotive / Navigation", "Automotive / EV", "Automotive / Motorcycles", "Automotive Marketplace", "Automotive Research", "Fuel / Automotive", "Fuel / Trucking", "EV Charging", "Cycling / IoT"] },
  { label: "Banking",       icon: "🏦", match: ["Banking", "Banking (UK)", "Banking (USA)", "Banking (Canada)", "Payments / Finance"] },
  { label: "Shopping",      icon: "🛍️", match: ["Shopping", "Shopping / E-Commerce", "Classifieds Marketplace"] },
  { label: "News & Music",  icon: "📰", match: ["News / Media", "News / Finance", "Radio / Podcasts", "Radio / Music Streaming", "Music", "Music Streaming", "Music / Local Player"] },
  { label: "Gambling",      icon: "🎰", match: ["Online Gambling / Casino", "Online Gambling / Sports Betting"] },
  { label: "Privacy+",      icon: "✅", match: ["Browser", "Browser / Search", "Email", "Productivity / Office", "Utility"] },
  { label: "Health & Fitness", icon: "🏃", match: ["Health & Fitness"] },
  { label: "Dating", icon: "💕", match: ["Dating"] },
  { label: "Education",     icon: "🎓", match: ["Education / EdTech"] },
  { label: "Other",         icon: "⚙️", match: ["AI / Productivity", "Dating", "Job Search", "Professional Network", "Network Tools", "Video Editing", "Deceptive Guide App", "Security Cameras / IoT", "Smart Home / IoT", "Audio / IoT", "Weather", "Navigation / Maps", "Ride Sharing"] },
];

// ── STYLISH CATEGORY ROLLDOWN MENU ───────────────────────────────────────────
export function CategoryDropdown({ selectedCategory, onCategoryChange }) {
  return (
    <div style={{ padding: "12px 0", width: "100%", maxWidth: "420px", margin: "0 auto" }}>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "16px",
          fontWeight: "500",
          color: "#ffffff",
          backgroundColor: "#1a1f2c",
          border: "1px solid #2d3748",
          borderRadius: "10px",
          cursor: "pointer",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
          backgroundSize: "16px"
        }}
      >
        {CATEGORY_GROUPS.map((group) => (
          <option 
            key={group.label} 
            value={group.label} 
            style={{ backgroundColor: "#1a1f2c", color: "#ffffff" }}
          >
            {group.icon} &nbsp;&nbsp; {group.label}
          </option>
        ))}
      </select>
    </div> 
  );
}
const APPS = [
  {
  { id:1,  name:"TikTok",                   category:"Social Media",            icon:"🎵", score:8,  privacyGrade:"F",  playStoreId:"com.zhiliaoapp.musically",          dataTypes:["Precise Location","Contacts","Biometrics","Face Data","Browsing History","Keystrokes","Device ID","Financial Info","Clipboard Contents","App Usage"], sellsData:true,  misleadingAds:true,  thirdParties:47, founded:"2016", headquarters:"Beijing, China",                          summary:"One of the most aggressive data collectors on any platform. Harvests biometrics, clipboard contents, and keystroke patterns. Parent company ByteDance is legally required to share data with the Chinese government upon request. Cross-tracks users even after app is closed.", sources:["WSJ Investigation 2021","FTC Report 2023","Irish DPC Ruling 2023"], communityFlags:3842, communityVerified:true, knownIncidents:["$5.4M GDPR fine (2023)","US Congress testimony on data practices","Banned on US government devices"] },
  
];

const GRADE_COLOR = { 
  "A+": "#00e676", 
  "A": "#69f0ae", 
  "B": "#fff176", 
  "C": "#ffb74d", 
  "D": "#ff7043", 
  "F": "#ef5350" 
};

export function gradeColor(g) { 
  return GRADE_COLOR[g] || "#fff"; 
}

export function getPlayStoreUrl(id) {
  if (!id) return null;
  return `https://play.google.com/store/apps/details?id=${id}&hl=en_CA`;
}

export function ScoreRing({ score, size = 80 }) {
  const r = size * 0.42, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  const color = score >= 80 ? "#00e676" : score >= 50 ? "#ffd54f" : score >= 25 ? "#ff7043" : "#ef5350";
  const cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={size * 0.1} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size * 0.1} strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ / 4} strokeLinecap="round" style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }} />
      <text x={cx} y={cy + 5} textAnchor="middle" fill="white" fontSize={size * 0.22} fontWeight="700" fontFamily="'DM Mono', monospace">{score}</text>
    </svg>
  );
}

export function KeyValue({ label, value, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>{label}</span>
      <span style={{ color: color || "#fff", fontWeight: "600", fontSize: "14px" }}>{value}</span>
    </div>
  );
}

function Tag({label, color}) {
  return <span style={{background:`${color}1a`,color,border:`1px solid ${color}44`,fontSize:"10px",padding:"3px 9px",borderRadius:"20px",fontWeight:"700",letterSpacing:"0.6px",textTransform:"uppercase",fontFamily:"'DM Mono', monospace"}}>{label}</span>;
}

function Field({label, placeholder, value, onChange, type="text"}) {
  return (
    <div>
      <label style={{color:"rgba(255,255,255,0.5)",fontSize:"11px",fontWeight:"700",letterSpacing:"0.8px",textTransform:"uppercase",fontFamily:"'DM Mono', monospace",display:"block",marginBottom:"6px"}}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"white",padding:"13px 16px",fontSize:"15px",fontFamily:"'DM Mono', monospace",outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"} } onFocus={e=>e.target.style.borderColor="rgba(239,83,80,0.5)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
    </div>
  );
}

function SectionLabel({children, color="rgba(255,255,255,0.35)"}) {
  return <div style={{color,fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px",fontFamily:"'DM Mono', monospace",marginBottom:"12px"}}>{children}</div>;
}

function MetricBox({label, value, bad}) {
  const c=bad?"#ef5350":"#00e676";
  return (
    <div style={{background:`${c}08`,border:`1px solid ${c}20`,borderRadius:"14px",padding:"16px",textAlign:"center"}}>
      <div style={{color:c,fontWeight:"900",fontSize:"clamp(18px,3vw,24px)",fontFamily:"'DM Mono', monospace"}}>{value}</div>
      <div style={{color:"rgba(255,255,255,0.35)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.5px",marginTop:"5px"}}>{label}</div>
    </div>
  );
}

function LandingScreen({onPurchase}) {
  const [hov, setHov] = useState(false);
  const features = [
    {icon:"🔍",title:"Deep App Analysis",desc:"Privacy scores built from real data: app store labels, policy audits, known incidents, and third-party research."},
    {icon:"👥",title:"Community-Powered",desc:"Real users flag new findings. Every report is reviewed and scored transparently. You can contribute too."},
    {icon:"📊",title:"Data Broker Map",desc:"See exactly which third parties an app shares your data with — not just how many, but who they are."},
    {icon:"🚨",title:"Incident History",desc:"Every known fine, breach, or scandal listed with sources. No greenwashing, no PR spin."},
    {icon:"🔔",title:"Watchlist Alerts",desc:"Follow apps you use. Get notified when their privacy score changes or a new incident is reported."},
    {icon:"🌍",title:"100% Open Source",desc:"Every line of code is public. No hidden trackers, no analytics, no ads. Ever. Auditable by anyone."},
  ];
  return (
    <div style={{minHeight:"100vh",background:"#060610",color:"white",fontFamily:"'Syne', sans-serif",overflowX:"hidden"}}>
      <div style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:"700px",height:"700px",background:"radial-gradient(ellipse, rgba(239,83,80,0.09) 0%, transparent 70%)",borderRadius:"50%"}}/>
          <svg width="100%" height="100%" style={{position:"absolute",opacity:0.04}}><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>
        <div style={{position:"relative",zIndex:1,maxWidth:"680px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(239,83,80,0.12)",border:"1px solid rgba(239,83,80,0.3)",borderRadius:"20px",padding:"6px 16px",marginBottom:"32px"}}>
            <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#ef5350",display:"inline-block",animation:"blink 1.5s ease infinite"}}/>
            <span style={{fontSize:"11px",color:"#ef5350",fontWeight:"700",letterSpacing:"1.5px",fontFamily:"'DM Mono', monospace"}}>OPEN SOURCE · COMMUNITY DRIVEN · NO ADS</span>
          </div>
          <div style={{fontSize:"80px",marginBottom:"16px",lineHeight:1}}>🛡️</div>
          <h1 style={{margin:"0 0 20px",fontSize:"clamp(40px,8vw,72px)",fontWeight:"800",lineHeight:1.05,letterSpacing:"-2px",background:"linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #ef5350 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>DataGuard</h1>
          <p style={{fontSize:"clamp(16px,2.5vw,20px)",color:"rgba(255,255,255,0.55)",lineHeight:1.7,margin:"0 auto 48px",maxWidth:"520px"}}>The app that watches the apps watching you. Built to expose data harvesting, deceptive advertising, and the hidden economy of selling your personal information.</p>
          <div style={{background:"rgba(0,230,118,0.06)",border:"1px solid rgba(0,230,118,0.2)",borderRadius:"20px",padding:"24px 32px",marginBottom:"40px",display:"inline-block",maxWidth:"480px"}}>
            <div style={{color:"#00e676",fontWeight:"800",fontFamily:"'DM Mono', monospace",fontSize:"12px",letterSpacing:"1px",marginBottom:"16px"}}>OUR PRIVACY PLEDGE</div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {["We collect zero user data. None. Not even analytics.","No advertising. No sponsored results. Ever.","One-time $7 purchase. No subscriptions. No hidden fees.","Full source code is public and auditable on GitHub."].map((p,i)=>(
                <div key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start",textAlign:"left"}}>
                  <span style={{color:"#00e676",fontSize:"14px",flexShrink:0,marginTop:"1px"}}>✓</span>
                  <span style={{color:"rgba(255,255,255,0.75)",fontSize:"14px",lineHeight:1.5}}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
            <button onClick={onPurchase} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:hov?"#ff6b6b":"#ef5350",border:"none",borderRadius:"16px",color:"white",fontWeight:"800",fontSize:"18px",padding:"18px 48px",cursor:"pointer",fontFamily:"'Syne', sans-serif",boxShadow:hov?"0 0 40px rgba(239,83,80,0.5)":"0 0 20px rgba(239,83,80,0.3)",transition:"all 0.2s ease",transform:hov?"translateY(-2px)":"translateY(0)"}}>Get DataGuard — $7 one-time</button>
            <span style={{color:"rgba(255,255,255,0.3)",fontSize:"12px"}}>One-time payment · No subscription · Instant access</span>
          </div>
        </div>
      </div>
      <div style={{maxWidth:"900px",margin:"0 auto",padding:"0 24px 80px"}}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <h2 style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:"800",letterSpacing:"-1px",margin:"0 0 12px"}}>Everything you need to take back control</h2>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"16px"}}>One app. No nonsense. No irony in how it collects your data.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"20px",marginBottom:"80px"}}>
          {features.map((f,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"18px",padding:"24px",transition:"all 0.2s ease"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.14)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";}}>
              <div style={{fontSize:"28px",marginBottom:"12px"}}>{f.icon}</div>
              <div style={{fontWeight:"700",fontSize:"15px",marginBottom:"8px"}}>{f.title}</div>
              <div style={{color:"rgba(255,255,255,0.45)",fontSize:"13px",lineHeight:1.6}}>{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"24px",padding:"40px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"32px",textAlign:"center",marginBottom:"64px"}}>
          {[["hundreds","apps in database"],["18,000+","community reports"],["$0","ad revenue"],["100%","open source"],["0","data points collected about you"]].map(([n,l],i)=>(
            <div key={i}><div style={{fontSize:"clamp(28px,5vw,40px)",fontWeight:"800",letterSpacing:"-1px",fontFamily:"'DM Mono', monospace",color:"#ef5350"}}>{n}</div><div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",marginTop:"4px"}}>{l}</div></div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{color:"rgba(255,255,255,0.3)",fontSize:"13px",marginBottom:"24px"}}>Every dollar goes directly to maintaining the database and funding community research. No investors. No VCs. Just you.</div>
          <button onClick={onPurchase} style={{background:"#ef5350",border:"none",borderRadius:"14px",color:"white",fontWeight:"800",fontSize:"17px",padding:"16px 42px",cursor:"pointer",fontFamily:"'Syne', sans-serif",boxShadow:"0 0 24px rgba(239,83,80,0.35)",transition:"all 0.2s ease"} } onMouseEnter={e=>{e.currentTarget.style.background="#ff6b6b";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="#ef5350";e.currentTarget.style.transform="translateY(0)"}}>Get DataGuard for $7</button>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}
function MainApp() {
  const [view, setView] = useState("browse");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("worst");
  const [watchlist, setWatchlist] = useState([]);
  const [notifications, setNotifications] = useState([
    {id:1,app:"WeChat",msg:"Research confirms WeChat functions as active Chinese government policing tool",time:"1h ago",read:false},
    {id:2,app:"QQ",msg:"2025 forensic study found identity card images stored in plain text",time:"2h ago",read:false},
    {id:3,app:"Telegram",msg:"Q1 2025: Telegram handed data on 22,777 users to authorities",time:"1d ago",read:false},
    {id:4,app:"Discord",msg:"October 2025: Vendor breach exposed government IDs and billing data",time:"2d ago",read:false},
    {id:5,app:"LinkedIn",msg:"BrowserGate 2026: Alleged undisclosed browser extension scanning",time:"3d ago",read:false},
    {id:6,app:"Roblox",msg:"April 2025: Class action for illegal harvesting of children's data via hidden scripts",time:"4d ago",read:false},
    {id:7,app:"Tubi",msg:"2024: $19.9M settlement for sharing viewing history with advertisers without consent",time:"5d ago",read:false},
    {id:8,app:"CarGurus",msg:"2025 CIPA lawsuit: alleged use of pen registers on users without consent",time:"6d ago",read:false},
  ]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const categoryMatch = useMemo(() => {
    const group = CATEGORY_GROUPS.find(g => g.label === activeCategory);
    return group ? group.match : null;
  }, [activeCategory]);

  const filtered = useMemo(() => {
    return APP_DB.filter(app => {
      const q = search.toLowerCase();
      const matchesSearch = app.name.toLowerCase().includes(q) || app.category.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || (categoryMatch && categoryMatch.includes(app.category));
      const matchesBehavior =
        filter === "all"       ? true :
        filter === "sellers"   ? app.sellsData :
        filter === "deceptive" ? app.misleadingAds :
        filter === "safe"      ? app.score >= 80 :
        filter === "watchlist" ? watchlist.includes(app.id) :
        true;
      return matchesSearch && matchesCategory && matchesBehavior;
    }).sort((a,b) =>
      sort === "worst" ? a.score - b.score :
      sort === "best"  ? b.score - a.score :
      a.name.localeCompare(b.name)
    );
  }, [search, filter, activeCategory, categoryMatch, sort, watchlist]);

  const unread = notifications.filter(n => !n.read).length;
  function openApp(app) { setSelected(app); setView("detail"); }
  function toggleWatch(id) { setWatchlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]); }

  function handleCategorySelect(label) {
    setActiveCategory(label);
    setFilter("all");
    setSearch("");
  }

  return (
    <div style={{minHeight:"100vh",background:"#060610",color:"white",fontFamily:"'Syne', sans-serif",display:"flex",flexDirection:"column"}}>
      <nav style={{background:"rgba(6,6,16,0.95)",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"0 20px",display:"flex",alignItems:"center",gap:"16px",height:"58px",position:"sticky",top:0,zIndex:50,backdropFilter:"blur(12px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginRight:"auto"}}>
          <span style={{fontSize:"22px"}}>🛡️</span>
          <span style={{fontWeight:"800",fontSize:"17px",letterSpacing:"-0.3px"}}>DataGuard</span>
          <span style={{background:"rgba(0,230,118,0.12)",color:"#00e676",fontSize:"9px",fontWeight:"700",padding:"2px 7px",borderRadius:"10px",border:"1px solid rgba(0,230,118,0.25)",fontFamily:"'DM Mono', monospace",letterSpacing:"1px"}}>OPEN SOURCE</span>
        </div>
        <button onClick={()=>setShowNotifs(v=>!v)} style={{background:"none",border:"none",cursor:"pointer",position:"relative",padding:"4px"}}>
          <span style={{fontSize:"20px"}}>🔔</span>
          {unread>0&&<span style={{position:"absolute",top:0,right:0,background:"#ef5350",borderRadius:"50%",width:"14px",height:"14px",fontSize:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"700",fontFamily:"'DM Mono', monospace"}}>{unread}</span>}
        </button>
        <button onClick={()=>setShowAbout(true)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px",color:"rgba(255,255,255,0.6)",fontSize:"12px",padding:"6px 14px",cursor:"pointer",fontWeight:"600"}}>About</button>
      </nav>

      {showNotifs&&(
        <div style={{position:"fixed",top:"66px",right:"16px",width:"320px",background:"#0f0f20",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"16px",zIndex:200,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>
          <div style={{padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:"700",fontSize:"14px"}}>Alerts</span>
            <button onClick={()=>{setNotifications(n=>n.map(x=>({...x,read:true})));setShowNotifs(false);}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:"12px"}}>Mark all read</button>
          </div>
          {notifications.map(n=>(
            <div key={n.id} style={{padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,0.05)",background:n.read?"transparent":"rgba(239,83,80,0.05)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                <span style={{fontWeight:"700",fontSize:"13px"}}>{n.app}</span>
                <span style={{color:"rgba(255,255,255,0.3)",fontSize:"11px"}}>{n.time}</span>
              </div>
              <div style={{color:"rgba(255,255,255,0.55)",fontSize:"12px"}}>{n.msg}</div>
            </div>
          ))}
        </div>
      )}

      {showAbout&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",backdropFilter:"blur(8px)"}} onClick={()=>setShowAbout(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0f0f20",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"24px",padding:"36px",maxWidth:"500px",width:"100%",position:"relative"}}>
            <button onClick={()=>setShowAbout(false)} style={{position:"absolute",top:"16px",right:"16px",background:"rgba(255,255,255,0.08)",border:"none",color:"white",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",fontSize:"16px"}}>×</button>
            <div style={{fontSize:"40px",marginBottom:"16px"}}>🛡️</div>
            <h3 style={{color:"white",fontFamily:"'DM Mono', monospace",margin:"0 0 12px",fontSize:"18px"}}>About DataGuard</h3>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:"14px",lineHeight:1.8,marginBottom:"20px"}}>DataGuard was built because the app economy has a fundamental problem: most apps exist not to provide value, but to harvest and monetize user data. We believe people deserve to know exactly what they are signing up for.</p>
            <div style={{background:"rgba(0,230,118,0.06)",border:"1px solid rgba(0,230,118,0.2)",borderRadius:"14px",padding:"20px",marginBottom:"20px"}}>
              <div style={{color:"#00e676",fontWeight:"700",fontFamily:"'DM Mono', monospace",fontSize:"11px",letterSpacing:"1px",marginBottom:"12px"}}>OUR PROMISES</div>
              {["We collect zero user data — no analytics, no logs, no telemetry.","No advertising or sponsored content of any kind.","Your $7 purchase directly funds research and development.","Source code is fully public and auditable on GitHub.","Community contributions are welcome and credited."].map((p,i)=>(
                <div key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"8px"}}>
                  <span style={{color:"#00e676",flexShrink:0}}>✓</span>
                  <span style={{color:"rgba(255,255,255,0.65)",fontSize:"13px",lineHeight:1.5}}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{flex:1,maxWidth:"800px",margin:"0 auto",width:"100%",padding:"24px 16px"}}>
        {view==="browse"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",marginBottom:"24px"}}>
              <SummaryTile icon="💀" label="Sell your data" value={`${APP_DB.filter(a=>a.sellsData).length}/${APP_DB.length}`} color="#ef5350" onClick={()=>{setFilter("sellers");setActiveCategory("All");}} active={filter==="sellers"}/>
              <SummaryTile icon="🎭" label="Deceptive ads" value={`${APP_DB.filter(a=>a.misleadingAds).length}/${APP_DB.length}`} color="#ff7043" onClick={()=>{setFilter("deceptive");setActiveCategory("All");}} active={filter==="deceptive"}/>
              <SummaryTile icon="✅" label="Privacy safe" value={`${APP_DB.filter(a=>a.score>=80).length}/${APP_DB.length}`} color="#00e676" onClick={()=>{setFilter("safe");setActiveCategory("All");}} active={filter==="safe"}/>
            </div>

            {/* ── REPLACED: Old sliding CategoryBar is now your dropdown menu ── */}
            <CategoryDropdown selectedCategory={activeCategory} onCategoryChange={handleCategorySelect} />

            <div style={{position:"relative",marginBottom:"12px"}}>
              <span style={{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",fontSize:"16px",pointerEvents:"none"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search apps by name or category…" style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:"14px",color:"white",padding:"13px 16px 13px 44px",fontSize:"15px",outline:"none",fontFamily:"'Syne', sans-serif",boxSizing:"border-box",transition:"border-color 0.2s"} } onFocus={e=>e.target.style.borderColor="rgba(239,83,80,0.4)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"}/>
            </div>

            <div style={{display:"flex",gap:"8px",marginBottom:"14px",alignItems:"center",overflowX:"auto",paddingBottom:"4px"}}>
              {[["all","All"],["sellers","Sells Data"],["deceptive","Deceptive"],["safe","Safe"],["watchlist","Watchlist"]].map(([k,l])=>(
                <button key={k} onClick={()=>setFilter(k)} style={{background:filter===k?"rgba(239,83,80,0.18)":"rgba(255,255,255,0.04)",border:filter===k?"1px solid rgba(239,83,80,0.45)":"1px solid rgba(255,255,255,0.07)",color:filter===k?"#ff8a80":"rgba(255,255,255,0.5)",padding:"7px 15px",borderRadius:"20px",cursor:"pointer",fontSize:"12px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.5px",whiteSpace:"nowrap",transition:"all 0.15s"}}>{l}{k==="watchlist"?` (${watchlist.length})`:""}</button>
              ))}
              <div style={{marginLeft:"auto",flexShrink:0}}>
                <select value={sort} onChange={e=>setSort(e.target.value)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",padding:"7px 12px",borderRadius:"20px",cursor:"pointer",fontSize:"12px",outline:"none"}}>
                  <option value="worst">Worst first</option>
                  <option value="best">Best first</option>
                  <option value="az">A → Z</option>
                </select>
              </div>
            </div>

            <div style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",fontFamily:"'DM Mono', monospace",marginBottom:"12px"}}>
              Showing {filtered.length} app{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {filtered.length===0?(
                <div style={{textAlign:"center",padding:"64px 24px",color:"rgba(255,255,255,0.25)"}}>
                  <div style={{fontSize:"40px",marginBottom:"12px"}}>🔍</div>
                  <div style={{fontSize:"15px",marginBottom:"8px"}}>No apps found</div>
                  <div style={{fontSize:"13px",marginBottom:"20px",color:"rgba(255,255,255,0.2)"}}>Try a different category or search term</div>
                  <button onClick={()=>{setActiveCategory("All");setFilter("all");setSearch("");}} style={{background:"rgba(239,83,80,0.12)",border:"1px solid rgba(239,83,80,0.3)",color:"#ef5350",padding:"10px 20px",borderRadius:"20px",cursor:"pointer",fontSize:"13px",fontWeight:"700",marginRight:"10px"}}>Clear filters</button>
                  <button onClick={()=>setView("submit")} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",padding:"10px 20px",borderRadius:"20px",cursor:"pointer",fontSize:"13px",fontWeight:"700"}}>Submit an app</button>
                </div>
              ):filtered.map(app=>(
                <AppRow key={app.id} app={app} onOpen={()=>openApp(app)} watched={watchlist.includes(app.id)} onToggleWatch={()=>toggleWatch(app.id)}/>
              ))}
            </div>
            <div style={{marginTop:"32px",background:"rgba(239,83,80,0.05)",border:"1px solid rgba(239,83,80,0.15)",borderRadius:"18px",padding:"28px",textAlign:"center"}}>
              <div style={{fontSize:"28px",marginBottom:"10px"}}>🕵️</div>
              <div style={{fontWeight:"800",fontSize:"16px",marginBottom:"6px"}}>Know a data-hungry app we are missing?</div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:"13px",marginBottom:"18px"}}>Submit it for community review. Our researchers will analyze and score it within 72 hours.</div>
              <button onClick={()=>setView("submit")} style={{background:"#ef5350",border:"none",borderRadius:"12px",color:"white",padding:"12px 28px",cursor:"pointer",fontWeight:"800",fontFamily:"'Syne', sans-serif",fontSize:"14px"}}>Submit an App</button>
            </div>
          </>
        )}
        {view==="detail"&&selected&&<DetailView app={selected} watched={watchlist.includes(selected.id)} onToggleWatch={()=>toggleWatch(selected.id)} onBack={()=>setView("browse")}/>}
        {view==="submit"&&<SubmitView onBack={()=>setView("browse")}/>}
      </div>
    </div>
  );
}

function SummaryTile({icon,label,value,color,onClick,active}) {
  return (
    <button onClick={onClick} style={{background:active?`${color}18`:"rgba(255,255,255,0.03)",border:`1px solid ${active?color+"44":"rgba(255,255,255,0.07)"}`,borderRadius:"16px",padding:"16px 12px",textAlign:"center",cursor:"pointer",transition:"all 0.2s",width:"100%"}} onMouseEnter={e=>e.currentTarget.style.background=`${color}10`} onMouseLeave={e=>e.currentTarget.style.background=active?`${color}18`:"rgba(255,255,255,0.03)"}>
      <div style={{fontSize:"22px",marginBottom:"6px"}}>{icon}</div>
      <div style={{color,fontWeight:"900",fontSize:"clamp(16px,3vw,22px)",fontFamily:"'DM Mono', monospace"}}>{value}</div>
      <div style={{color:"rgba(255,255,255,0.35)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.5px",marginTop:"3px"}}>{label}</div>
    </button>
  );
}

function AppRow({app, onOpen, watched, onToggleWatch}) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{background:hov?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"16px",display:"flex",alignItems:"center",gap:"14px",cursor:"pointer",transition:"all 0.18s",userSelect:"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onOpen}>
      <div style={{fontSize:"32px",flexShrink:0}}>{app.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"4px"}}>
          <span style={{color:"white",fontWeight:"700",fontSize:"15px"}}>{app.name}</span>
          {app.communityVerified&&<span style={{background:"rgba(0,230,118,0.1)",color:"#00e676",fontSize:"9px",padding:"2px 7px",borderRadius:"10px",border:"1px solid rgba(0,230,118,0.25)",fontFamily:"'DM Mono', monospace",fontWeight:"700",letterSpacing:"0.5px"}}>VERIFIED</span>}
        </div>
        <div style={{color:"rgba(255,255,255,0.35)",fontSize:"11px",marginBottom:"8px"}}>{app.category} · 🚩 {app.communityFlags.toLocaleString()} reports</div>
        <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
          {app.sellsData&&<Tag label="Sells Data" color="#ef5350"/>}
          {app.misleadingAds&&<Tag label="Deceptive Ads" color="#ff7043"/>}
          <Tag label={`${app.thirdParties} 3rd parties`} color="#607d8b"/>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",flexShrink:0}}>
        <ScoreRing score={app.score} size={72}/>
        <span style={{color:gradeColor(app.privacyGrade),fontWeight:"900",fontSize:"18px",fontFamily:"'DM Mono', monospace"}}>{app.privacyGrade}</span>
      </div>
      <button onClick={e=>{e.stopPropagation();onToggleWatch();}} style={{background:watched?"rgba(239,83,80,0.15)":"rgba(255,255,255,0.05)",border:watched?"1px solid rgba(239,83,80,0.4)":"1px solid rgba(255,255,255,0.08)",borderRadius:"50%",width:"34px",height:"34px",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",transition:"all 0.15s"}}>
        {watched?"🔔":"🔕"}
      </button>
    </div>
  );
}

function DetailView({app, watched, onToggleWatch, onBack}) {
  const [feedbackType, setFeedbackType] = useState("correction");
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const playStoreUrl = getPlayStoreUrl(app.playStoreId);

  const handleFeedback = async () => {
    if(!feedbackText.trim()) return;
    setSubmitting(true);
    const ok = await submitToSupabase("community_reports",{app_name:app.name,report_type:feedbackType,content:feedbackText});
    setSubmitting(true);
    if(ok) setSubmitted(true);
  };

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <button onClick={onBack} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px",color:"rgba(255,255,255,0.6)",padding:"8px 18px",cursor:"pointer",fontSize:"13px",fontWeight:"600",marginBottom:"24px",display:"flex",alignItems:"center",gap:"8px"}}>← Back</button>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"20px",padding:"24px",marginBottom:"16px"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:"16px"}}>
          <div style={{}} />
        </div>
      </div>
    </div>
  );
}
