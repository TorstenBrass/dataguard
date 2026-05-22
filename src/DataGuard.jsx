import { useState, useEffect } from "react";

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

const APP_DB = [
  // ── ORIGINAL 23 ──────────────────────────────────────────────────────────────
  { id:1,  name: "TikTok",                   category: "Social Media",            icon: "🎵", score:8,  privacyGrade: "F",  playStoreId: "com.zhiliaoapp.musically" },
  { id:2,  name: "Signal",                   category: "Messaging",               icon: "💬", score:97, privacyGrade: "A+", playStoreId: "org.thoughtcrime.securesms" },
  { id:3,  name: "WhatsApp",                 category: "Messaging",               icon: "🟢", score:42, privacyGrade: "D-", playStoreId: "com.whatsapp" },
  { id:4,  name: "Telegram",                 category: "Messaging",               icon: "✈️", score:58, privacyGrade: "C",  playStoreId: "org.telegram.messenger" },
  { id:5,  name: "Instagram",                category: "Social Media",            icon: "📸", score:12, privacyGrade: "F",  playStoreId: "com.instagram.android" },
  { id:6,  name: "Facebook",                 category: "Social Media",            icon: "📘", score:5,  privacyGrade: "F",  playStoreId: "com.facebook.katana" },
  { id:7,  name: "X (Twitter)",              category: "Social Media",            icon: "🐦", score:21, privacyGrade: "E",  playStoreId: "com.twitter.android" },
  { id:8,  name: "ProtonMail",               category: "Productivity",           icon: "⚛️", score:95, privacyGrade: "A",  playStoreId: "ch.protonmail.android" },
  { id:9,  name: "DuckDuckGo Browser",       category: "Utilities",              icon: "🦆", score:94, privacyGrade: "A",  playStoreId: "com.duckduckgo.mobile.android" },
  { id:10, name: "Brave Browser",            category: "Utilities",              icon: "🦁", score:92, privacyGrade: "A-", playStoreId: "com.brave.browser" },
  { id:11, name: "Google Maps",              category: "Navigation",             icon: "🗺️", score:28, privacyGrade: "E+", playStoreId: "com.google.android.apps.maps" },
  { id:12, name: "Uber",                     category: "Lifestyle",              icon: "🚗", score:34, privacyGrade: "D",  playStoreId: "com.ubercab" },
  { id:13, name: "Spotify",                  category: "Entertainment",          icon: "🎧", score:48, privacyGrade: "C-", playStoreId: "com.spotify.music" },
  { id:14, name: "Netflix",                  category: "Entertainment",          icon: "🍿", score:52, privacyGrade: "C",  playStoreId: "com.netflix.mediaclient" },
  { id:15, name: "Zoom",                     category: "Business",               icon: "📹", score:45, privacyGrade: "D+", playStoreId: "us.zoom.videomeetings" },
  { id:16, name: "Discord",                  category: "Social Media",            icon: "👾", score:38, privacyGrade: "D",  playStoreId: "com.discord" },
  { id:17, name: "Snapchat",                 category: "Social Media",            icon: "👻", score:18, privacyGrade: "E-", playStoreId: "com.snapchat.android" },
  { id:18, name: "LinkedIn",                 category: "Business",               icon: "💼", score:25, privacyGrade: "E+", playStoreId: "com.linkedin.android" },
  { id:19, name: "Pinterest",                category: "Social Media",            icon: "📌", score:40, privacyGrade: "D-", playStoreId: "com.pinterest" },
  { id:20, name: "Reddit",                   category: "Social Media",            icon: "🤖", score:35, privacyGrade: "D",  playStoreId: "com.reddit.frontpage" },
  { id:21, name: "YouTube",                  category: "Entertainment",          icon: "📺", score:22, privacyGrade: "E",  playStoreId: "com.google.android.youtube" },
  { id:22, name: "Microsoft Teams",          category: "Business",               icon: "👥", score:50, privacyGrade: "C",  playStoreId: "com.microsoft.teams" },
  { id:23, name: "Duolingo",                 category: "Education",              icon: "🦉", score:55, privacyGrade: "C+", playStoreId: "com.duolingo" },

  // ── PREVIOUS ADDITIONS ──────────────────────────────────────────────────────
  { id:24, name: "Temu",                     category: "Shopping",               icon: "🛍️", score:4,  privacyGrade: "F",  playStoreId: "com.einnovation.temu" },
  { id:25, name: "Shein",                    category: "Shopping",               icon: "👗", score:7,  privacyGrade: "F",  playStoreId: "com.zzkko" },
  { id:26, name: "ChatGPT",                  category: "Productivity",           icon: "🧠", score:46, privacyGrade: "D+", playStoreId: "com.openai.chatgpt" },
  { id:27, name: "Claude AI",                category: "Productivity",           icon: "🦺", score:51, privacyGrade: "C",  playStoreId: "com.anthropic.claude" },
  { id:28, name: "Microsoft Copilot",        category: "Productivity",           icon: "🪙", score:43, privacyGrade: "D",  playStoreId: "com.microsoft.copilot" },
  { id:29, name: "CapCut",                   category: "Utilities",              icon: "🎬", score:9,  privacyGrade: "F",  playStoreId: "com.lemon.lvoverseas" },
  { id:30, name: "Threads",                  category: "Social Media",            icon: "🧵", score:11, privacyGrade: "F",  playStoreId: "com.instagram.barcelona" },
  { id:31, name: "BeReal",                   category: "Social Media",            icon: "📸", score:44, privacyGrade: "D+", playStoreId: "com.bereal.ft" },
  { id:32, name: "Roblox",                   category: "Entertainment",          icon: "🧱", score:30, privacyGrade: "E+", playStoreId: "com.roblox.client" },
  { id:33, name: "Twitch",                   category: "Entertainment",          icon: "🔮", score:37, privacyGrade: "D",  playStoreId: "tv.twitch.android.app" },
  { id:34, name: "Airbnb",                   category: "Lifestyle",              icon: "🏡", score:53, privacyGrade: "C",  playStoreId: "com.airbnb.android" },
  { id:35, name: "Booking.com",              category: "Lifestyle",              icon: "🏨", score:41, privacyGrade: "D-", playStoreId: "com.booking" },
  { id:36, name: "Lyft",                     category: "Lifestyle",              icon: "🚘", score:36, privacyGrade: "D",  playStoreId: "me.lyft.android" },
  { id:37, name: "Tinder",                   category: "Lifestyle",              icon: "🔥", score:15, privacyGrade: "E-", playStoreId: "com.tinder" },
  { id:38, name: "Bumble",                   category: "Lifestyle",              icon: "🐝", score:23, privacyGrade: "E",  playStoreId: "com.bumble.app" },
  { id:39, name: "Grindr",                   category: "Lifestyle",              icon: "🟡", score:13, privacyGrade: "F",  playStoreId: "com.grindr.android" },
  { id:40, name: "Strava",                   category: "Health & Fitness",       icon: "🏃", score:56, privacyGrade: "C+", playStoreId: "com.strava" },
  { id:41, name: "MyFitnessPal",             category: "Health & Fitness",       icon: "🥗", score:33, privacyGrade: "D",  playStoreId: "com.myfitnesspal.android" },
  { id:42, name: "Flo Period Tracker",       category: "Health & Fitness",       icon: "🌸", score:62, privacyGrade: "B-", playStoreId: "org.flo.android" },
  { id:43, name: "Coinbase",                 category: "Finance",                icon: "🪙", score:72, privacyGrade: "B",  playStoreId: "com.coinbase.android" },

  // ── NEW COMMUNITY RESEARCH TARGETS ──────────────────────────────────────────
  { id:44, name: "ABCmouse.com",             category: "Education",              icon: "🐭", score:68, privacyGrade: "B-", playStoreId: "com.aofl.abcmouse.google" }
];

function LandingScreen({ onEnter }) {
  return (
    <div style={{minHeight:"100vh",background:"#0A0A0A",color:"#FFF",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:20,padding:"20px",fontFamily:"'Syne', sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:"500px",height:"500px",background:"radial-gradient(circle, rgba(0,255,102,0.08) 0%, rgba(0,0,0,0) 70%)",top:"10%",left:"15%",zIndex:0}}/>
      <div style={{position:"absolute",width:"600px",height:"600px",background:"radial-gradient(circle, rgba(0,102,255,0.05) 0%, rgba(0,0,0,0) 70%)",bottom:"5%",right:"10%",zIndex:0}}/>
      <div style={{zIndex:1,textAlign:"center",maxWidth:"800px",animation:"fadeUp 1s ease forwards"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"10px",background:"rgba(0,255,102,0.06)",border:"1px solid rgba(0,255,102,0.2)",padding:"8px 16px",borderRadius:"100px",color:"#00FF66",fontSize:"14px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"32px",fontFamily:"'DM Mono', monospace"}}>
          <span style={{width:"8px",height:"8px",background:"#00FF66",borderRadius:"50%",boxShadow:"0 0 12px #00FF66"}}/>🛡️ NEXT-GEN DATA INTELLIGENCE
        </div>
        <h1 style={{fontSize:"clamp(44px, 7vw, 92px)",fontWeight:"800",lineHeight:"0.95",letterSpacing:"-3px",marginBottom:"24px",textTransform:"uppercase"}}>
          DATAGUARD <span style={{color:"#00FF66"}}>[X]</span>
        </h1>
        <p style={{fontSize:"clamp(16px, 2.5vw, 22px)",color:"rgba(255,255,255,0.6)",maxWidth:"620px",margin:"0 auto 48px auto",lineHeight:"1.4",fontWeight:"400"}}>
          We audit, expose, and benchmark the hidden data practices of mainstream mobile applications. Total privacy autonomy starts here.
        </p>
        <button onClick={onEnter} style={{background:"#FFFFFF",color:"#000000",border:"none",padding:"20px 48px",fontSize:"18px",fontWeight:"800",borderRadius:"14px",cursor:"pointer",boxShadow:"0 8px 32px rgba(255,255,255,0.1)",transition:"transform 0.2s, box-shadow 0.2s",fontFamily:"'Syne', sans-serif",textTransform:"uppercase",letterSpacing:"-0.5px"}} onMouseEnter={(e)=>{e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,255,102,0.2)"}} onMouseLeave={(e)=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 8px 32px rgba(255,255,255,0.1)"}}>
          Launch Dashboard →
        </button>
      </div>
    </div>
  );
}

function MainDashboard({ onGoToSubmitReview }) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sortMethod, setSortMethod] = useState("worst"); // 'worst', 'best', 'alphabetical'
  const [selectedApp, setSelectedApp] = useState(null);
  const [reports, setReports] = useState([]);
  const [repApp, setRepApp] = useState("");
  const [repType, setRepType] = useState("Data Breach");
  const [repDesc, setRepDesc] = useState("");
  const [repMsg, setRepMsg] = useState("");

  const categories = ["All", ...new Set(APP_DB.map(a => a.category))];

  const filteredAndSorted = APP_DB.filter(a => {
    const matchS = a.name.toLowerCase().includes(search.toLowerCase());
    const matchC = selectedCat === "All" || a.category === selectedCat;
    return matchS && matchC;
  }).sort((a, b) => {
    if (sortMethod === "worst") {
      return a.score - b.score;
    } else if (sortMethod === "best") {
      return b.score - a.score;
    } else if (sortMethod === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const getScoreColor = (s) => {
    if(s >= 80) return "#00FF66";
    if(s >= 50) return "#FFAA00";
    return "#FF3333";
  };

  const getGradeBg = (g) => {
    if(g.startsWith("A")) return "rgba(0,255,102,0.1)";
    if(g.startsWith("B")) return "rgba(0,255,102,0.05)";
    if(g.startsWith("C")) return "rgba(255,170,0,0.08)";
    if(g.startsWith("D")) return "rgba(255,170,0,0.04)";
    return "rgba(255,51,51,0.1)";
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if(!repApp || !repDesc) { setRepMsg("Please fill all fields."); return; }
    const pl = { app_name: repApp, report_type: repType, description: repDesc, created_at: new Date().toISOString() };
    const ok = await submitToSupabase("safety_reports", pl);
    if(ok) {
      setReports([pl, ...reports]);
      setRepApp(""); setRepDesc("");
      setRepMsg("Report filed successfully to database ecosystem.");
    } else {
      setRepMsg("Supabase connection error. Logged locally instead.");
      setReports([pl, ...reports]);
    }
  };

  return (
    <div style={{background:"#070708",color:"#FFF",minHeight:"100vh",fontFamily:"'Syne', sans-serif",padding:"40px 20px"}}>
      <div style={{maxWidth:"1400px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"between",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,0.06)",paddingBottom:"32px",marginBottom:"40px",flexWrap:"wrap",gap:"20px"}}>
          <div>
            <h2 style={{fontSize:"32px",fontWeight:"800",letterSpacing:"-1px"}}>DATAGUARD APP DIRECTORY</h2>
            <p style={{color:\"rgba(255,255,255,0.5)\",fontFamily:\"'DM Mono', monospace\",fontSize:\"14px\",marginTop:\"4px\"}}>INDEXED SYSTEM STACK // CORE AUDITS</p>
          </div>
          <button onClick={onGoToSubmitReview} style={{background:"#00FF66",color:"#000",border:"none",padding:"14px 28px",borderRadius:"12px",fontWeight:"800",cursor:"pointer",fontFamily:"'Syne', sans-serif",textTransform:"uppercase",letterSpacing:"-0.5px"}}>
            + Add New App Review
          </button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"40px",alignItems:"start"}}>
          <div>
            <div style={{display:"flex",gap:"16px",marginBottom:"24px",flexWrap:"wrap",alignItems:"center"}}>
              <input type="text" placeholder="Search target application..." value={search} onChange={(e)=>setSearch(e.target.value)} style={{flex:1,minWidth:"280px",background:"#121214",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",padding:"16px 20px",color:"#FFF",fontFamily:"'Syne', sans-serif",fontSize:"16px"}}/>
              
              {/* Refactored Engine Interface Supporting Dynamic Sorting Architecture */}
              <div style={{display:"flex",background:"#121214",border:"1px solid rgba(255,255,255,0.08)",padding:"4px",borderRadius:"12px",gap:"4px"}}>
                <button onClick={()=>setSortMethod("worst")} style={{background:sortMethod==="worst"?"#FF3333":"transparent",color:sortMethod==="worst"?"#000":'rgba(255,255,255,0.6)',border:"none",padding:"10px 16px",borderRadius:"8px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"'Syne', sans-serif"}}>Worst First</button>
                <button onClick={()=>setSortMethod("best")} style={{background:sortMethod==="best"?"#00FF66":"transparent",color:sortMethod==="best"?"#000":'rgba(255,255,255,0.6)',border:"none",padding:"10px 16px",borderRadius:"8px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"'Syne', sans-serif"}}>Best First</button>
                <button onClick={()=>setSortMethod("alphabetical")} style={{background:sortMethod==="alphabetical"?"#FFFFFF":"transparent",color:sortMethod==="alphabetical"?"#000":'rgba(255,255,255,0.6)',border:"none",padding:"10px 16px",borderRadius:"8px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"'Syne', sans-serif"}}>Alphabetical</button>
              </div>

              <div style={{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px"}}>
                {categories.map(c => (
                  <button key={c} onClick={()=>setSelectedCat(c)} style={{background:selectedCat===c?"#FFF":"#121214",color:selectedCat===c?"#000":"rgba(255,255,255,0.6)",border:"1px solid rgba(255,255,255,0.08)",padding:"0 20px",height:"48px",borderRadius:"12px",fontWeight:"700",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"'Syne', sans-serif"}}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"20px"}}>
              {filteredAndSorted.map(a => (
                <div key={a.id} onClick={()=>setSelectedApp(a)} style={{background:"#121214",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"16px",padding:"24px",cursor:"pointer",position:"relative",transition:"transform 0.2s, border-color 0.2s"}} onMouseEnter={(e)=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.transform="translateY(0)"}}>
                  <div style={{display:"flex",justifyContent:"between",alignItems:"start",marginBottom:"16px"}}>
                    <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
                      <div style={{fontSize:"32px",background:"rgba(255,255,255,0.04)\",width:\"64px\",height:\"64px\",borderRadius:\"14px\",display:\"flex\",alignItems:\"center\",justifyContent:\"center\"}}>{a.icon||\"📱\"}</div>
                      <div>
                        <h3 style={{fontSize:"20px",fontWeight:"800"}}>{a.name}</h3>
                        <span style={{fontFamily:"'DM Mono', monospace\",fontSize:\"12px\",color:\"rgba(255,255,255,0.4)\",background:\"rgba(255,255,255,0.04)\",padding:\"4px 8px\",borderRadius:\"6px\",marginTop:\"4px\",display:\"inline-block\"}}>{a.category}</span>
                      </div>
                    </div>
                    <div style={{background:getGradeBg(a.privacyGrade),border:`1px solid ${getScoreColor(a.score)}33`,borderRadius:"12px",width:"50px",height:"50px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"18px",color:getScoreColor(a.score),fontFamily:"'DM Mono', monospace"}}>
                      {a.privacyGrade}
                    </div>
                  </div>
                  <div style={{marginTop:"24px"}}>
                    <div style={{display:"flex",justifyContent:"between",fontSize:"12px",fontFamily:"'DM Mono', monospace\",color:\"rgba(255,255,255,0.4)\",marginBottom:\"8px\"}}>
                      <span>PRIVACY VERDICT SCORE</span>
                      <span style={{color:getScoreColor(a.score),fontWeight:"700"}}>{a.score}/100</span>
                    </div>
                    <div style={{width:"100%",height:"6px",background:"rgba(255,255,255,0.04)\",borderRadius:\"100px\",overflow:\"hidden\"}}>
                      <div style={{width:`${a.score}%`,height:"100%",background:getScoreColor(a.score),borderRadius:"100px"}}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{marginTop:"
