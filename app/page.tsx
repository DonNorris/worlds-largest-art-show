"use client";

import { useEffect, useState } from "react";

type Show = {
  id: string;
  showName: string;
  artistName: string;
  email?: string;
  county: string;
  state: string;
  town: string;
  mainMedium?: string;
  startDate?: string;
  endDate?: string;
  showHours?: string;
  description?: string;
  website?: string;
  instagram?: string;
  photoUrl?: string;
  plan: string;
  upgradePackage: string;
};
export default function Home() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    fetch("/api/shows")
      .then((res) => res.json())
      .then((data) => setShows(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
      const params = new URLSearchParams(window.location.search);
setJoined(params.get("joined") === "1");
  }, []);

  return (
    <main style={{ background: "#fbf7ef", color: "#111827" }}>
      <section
        style={{
          minHeight: "70vh",
          background: "url('/art-background.png') center / cover no-repeat",
          color: "white",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#f5d06f", fontWeight: 800, letterSpacing: 2, fontSize: "28px" }}>
            NOVEMBER 28 – DECEMBER 8, 2026
          </p>

          <h1
            style={{
              fontSize: "clamp(2.85rem, 7.6vw, 7.125rem)",
              lineHeight: .95,
              margin: "20px 0",
            }}
          >
            One World.
            <br />
            Millions of Artists.
            <br />
            One Global Art Show.
          </h1>

          <p style={{ fontSize: 40, lineHeight: 1.5, maxWidth: 1100, margin: "0 auto" }}>
            A free worldwide art event open to every artist everywhere.
          </p>
                    <p style={{ fontSize: 40, lineHeight: 1.5, maxWidth: 850, margin: "0 auto" }}>
           Register your art show. Be found by visitors. Become part of art history.
          </p>


          <div style={{ marginTop: 38, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/submit" style={buttonGold}>Register Your Art Show</a>
            <a href="#directory" style={buttonOutline}>See Registered Shows</a>
          </div>
          <p style={{ marginTop: 28, color: "white", fontWeight: 700, fontSize: "40px" }}>
  Scroll down to learn how to register, how it works, and why artists are joining ↓
</p>
        </div>
      </section>


     <img src="/welcome-art-show-new.png" alt="Welcome to the World's Largest Art Show" style={{ width: "100%", display: "block" }} />
<img src="/how-it-works.png" alt="How It Works" style={{ width: "100%", display: "block" }} />


<section style={{ position: "relative", width: "100vw", marginLeft: "calc(50% - 50vw)", padding: 0 }}>
 <img src="/why-register-your-art-show.png" alt="Why Register Your Art Show" style={{ width: "100%", display: "block" }} />
  <div style={{ position: "absolute", left: "5%", bottom: "4%" }}>
    <a href="/submit" style={{ ...buttonGold, transform: "scale(1.5)" }}>Register Your Art Show</a>
  </div>
</section>
<img src="/artist-success-center.png" alt="Artist Success Center" style={{ width: "100%", display: "block" }} />
<div style={{ position: "relative", width: "100vw", marginLeft: "calc(50% - 50vw)", padding: 0 }}>
<section id="email-signup">
 <img src="/join-email-list.png" alt="Join Our Email List" style={{ width: "100%", display: "block" }} />
<form action="/api/email-signup" method="POST" style={{ position: "absolute", top: "32%", left: "50%", transform: "translateX(-50%)", width: "46%", maxWidth: 600, zIndex: 2 }}>
  <input
    type="email"
    name="email"
    placeholder="Enter your email address"
    required
    style={{
      width: "100%",
      padding: "14px",
      fontSize: 18,
      marginBottom: 15,
      boxSizing: "border-box",
    }}
  />

  <button type="submit" style={{ ...buttonGold, position: "absolute", top: "37%", left: "5%", transform: "translateX(-50%)" }}>
    Join Our Email List
  </button>
  {joined && <p style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "red" }}>Thank you! You have joined our email list.</p>}

</form>
  

  
</section>
</div>
<section style={section}>
  <h2 style={headline}>Can Groups Participate?</h2>

  <p style={paragraph}>
    Absolutely.
  </p>

  <p style={paragraph}>
    Art clubs, schools, galleries, guilds, associations, museums,
    community organizations, and creative groups are welcome to
    participate in the World's Largest Art Show.
  </p>

  <p style={paragraph}>
    A group may register its event, exhibition, festival, open studio,
    or art show as a single listing.
  </p>

  <p style={paragraph}>
    Individual artists participating within that group event may also
    register their own shows, displays, demonstrations, or activities.
  </p>

  <p style={paragraph}>
    This helps promote both the group event and the individual artists,
    while making it easier for visitors to discover creative events and
    artists around the world.
  </p>

  <p style={paragraph}>
    The goal is simple: help more artists be found, seen, appreciated,
    and supported.
  </p>
</section>
      <section style={darkStatement}>
        <h2 style={statementText}>
          The World Has Never Had One Art Show for Everyone — Until Now.
        </h2>
      </section>

      <section style={section}>
        <h2 style={headline}>You Decide When. You Decide Where.</h2>
        <p style={paragraph}>
          One hour, one day, or all nine days. Anywhere and everywhere in the world.
        </p>
        <p style={paragraph}>
          What makes this the World’s Largest Art Show is that together we create one worldwide celebration of creativity, imagination, and artistic expression.
        </p>
      </section>

      <section style={goldStatement}>
        <h2 style={statementTextDark}>
          Every Artist. Every Country. One Worldwide Celebration of Art.
        </h2>
      </section>

      <section style={section}>
        <h2 style={headline}>About the Founder</h2>
        <p style={paragraph}>
          My name is Don Norris — artist, educator, silversmith, jewelry maker, pewter sculptor, and author. For more than 50 years, I have taught silversmithing, jewelry making, lost wax casting, and hands-on art experiences throughout all 50 states in the United States.
        </p>
        <p style={paragraph}>
          For nearly 20 years, I have carried the vision for this event, believing that one day technology could connect artists everywhere in the world. Today, through the power of the internet and AI, that dream is finally becoming possible.
        </p>
        <p style={paragraph}>
          This show is about artists helping artists succeed — inspiring creativity, increasing visibility, attracting new audiences and buyers, and celebrating art around the world.
        </p>
      </section>

      <section style={section}>
        <h2 style={headline}>This Is Not About Competition</h2>
        <p style={paragraph}>
          This is about participation, creativity, community, opportunity, and giving every artist a chance to be seen.
        </p>
        <p style={paragraph}>
          Whether you display your work in a gallery, studio, home, school, storefront, community center, online event, outdoor festival, or even on a sidewalk, you become part of something larger — a worldwide celebration of creativity and human expression.
        </p>
      </section>

     

      <section style={finalCta}>
        <h2 style={statementText}>Art Everywhere. Artists United.</h2>
        <p style={{ fontSize: 22, lineHeight: 1.6 }}>
          Join artists around the world and become part of art history — for free.
        </p>
        <div style={{ marginTop: 30 }}>
          <a href="/submit" style={buttonGold}>Register Your Show</a>
        </div>
     
      <section id="directory" style={section}>
        <h2 style={headline}>Submitted Shows</h2>
        <p style={paragraph}>
          {loading ? "Loading shows..." : `${shows.length} show${shows.length === 1 ? "" : "s"} submitted so far.`}
        </p>

        {!loading && shows.length === 0 && (
          <div style={emptyBox}>No shows yet. Be the first to submit one.</div>
        )}

        <div style={grid}>
          {shows.map((show) => (
           <article
  key={show.id}
  style={{ ...card, cursor: "pointer" }}
  onClick={() => window.location.href = `/shows/${show.id}`}
>
            {show.photoUrl && (
              <img
              src={show.photoUrl}
              alt={`${show.showName} artwork`}
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px" }}
              />
  )}
  <h3
  style={{
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "24px",
    fontWeight: 700,
    color: "#2563eb",
  }}
>
  <a
    href={`/shows/${show.id}`}
    style={{ color: "inherit", textDecoration: "none" }}
  >
    {show.showName}
  </a>
</h3>

  {show.mainMedium && (
    <p><strong>Art Type:</strong> {show.mainMedium}</p>
  )}

  <p><strong>Artist:</strong> {show.artistName}</p>

  <p>
    <strong>Location:</strong> {show.town}, {show.state}, {show.county}
  </p>

  {(show.startDate || show.endDate) && (
    <p>
      <strong>Date:</strong> {show.startDate || "TBA"}
      {show.endDate ? ` through ${show.endDate}` : ""}
    </p>
  )}

  {show.showHours && (
    <p><strong>Hours:</strong> {show.showHours}</p>
  )}

  {show.description && (
    <p style={{ color: "#4b5563", lineHeight: 1.6 }}>
      {show.description.length > 160
        ? `${show.description.slice(0, 160)}...`
        : show.description}
    </p>
  )}

  {show.website && (
    <p>
      <a href={show.website.startsWith("http") ? show.website : `https://${show.website}`} target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
    </p>
  )}

  {show.instagram && (
    <p>
      <a href={show.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
    </p>
  )}

<p>Click anywhere to see more about this show →</p>
</article>
          ))}
        </div>
      </section> </section>
   
    </main>
  );
}

const section = {
  maxWidth: 980,
  margin: "0 auto",
  padding: "80px 24px",
  textAlign: "center" as const,
};

const headline = {
  fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
  lineHeight: 1.05,
  margin: "0 0 24px",
};

const paragraph = {
  fontSize: 20,
  lineHeight: 1.8,
  color: "#4b5563",
};

const darkStatement = {
  background: "#111827",
  color: "white",
  padding: "90px 24px",
  textAlign: "center" as const,
};

const goldStatement = {
  background: "linear-gradient(135deg,#f5d06f,#fff7ed)",
  padding: "90px 24px",
  textAlign: "center" as const,
};

const statementText = {
  maxWidth: 1000,
  margin: "0 auto",
  fontSize: "clamp(2.3rem, 5vw, 5rem)",
  lineHeight: 1.05,
};

const statementTextDark = {
  ...statementText,
  color: "#111827",
};

const buttonGold = {
  background: "#f5d06f",
  color: "#111827",
  padding: "16px 26px",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 900,
};

const buttonOutline = {
  color: "white",
  padding: "16px 26px",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 900,
  border: "1px solid rgba(255,255,255,.5)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
  marginTop: 30,
};

const card = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 24,
  textAlign: "left" as const,
  boxShadow: "0 14px 35px rgba(17,24,39,.08)",
};

const emptyBox = {
  marginTop: 28,
  background: "white",
  border: "1px dashed #d1d5db",
  borderRadius: 20,
  padding: 30,
  color: "#6b7280",
};

const finalCta = {
  background: "#111827",
  color: "white",
  padding: "100px 24px",
  textAlign: "center" as const,
};