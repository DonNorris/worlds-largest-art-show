"use client";

import { useEffect, useState } from "react";

type Show = {
  id: string;
  showName: string;
  artistName: string;
  county: string;
  state: string;
  town: string;
  plan: string;
};

export default function Home() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/shows")
      .then((res) => res.json())
      .then((data) => setShows(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: "#fbf7ef", color: "#111827" }}>
      <section
        style={{
          minHeight: "92vh",
          background:
            "radial-gradient(circle at top left, rgba(245,208,111,.35), transparent 30%), linear-gradient(135deg,#111827,#1f1713,#050505)",
          color: "white",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#f5d06f", fontWeight: 800, letterSpacing: 2 }}>
            NOVEMBER 28 – DECEMBER 8, 2026
          </p>

          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
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

          <p style={{ fontSize: 24, lineHeight: 1.5, maxWidth: 850, margin: "0 auto" }}>
            A free worldwide art event open to every artist everywhere.
          </p>

          <div style={{ marginTop: 38, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/submit" style={buttonGold}>Submit Your Show</a>
            <a href="#directory" style={buttonOutline}>Browse Shows</a>
          </div>
        </div>
      </section>

      <section style={section}>
        <h2 style={headline}>Welcome to the World’s Largest Art Show</h2>
        <p style={paragraph}>
          For the first time in history, artists everywhere in the world can participate together in one global art event — absolutely free.
        </p>
        <p style={paragraph}>
          Artists around the world will hold their own art shows, exhibits, studio tours, demonstrations, online events, gallery openings, and creative experiences in their own communities and countries — all during the same nine-day worldwide celebration of art.
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
            <article key={show.id} style={card}>
              <h3>{show.showName}</h3>
              <p><strong>Artist:</strong> {show.artistName}</p>
              <p><strong>Location:</strong> {show.town}, {show.state}, {show.county}</p>
              <p><strong>Plan:</strong> {show.plan}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={finalCta}>
        <h2 style={statementText}>Art Everywhere. Artists United.</h2>
        <p style={{ fontSize: 22, lineHeight: 1.6 }}>
          Join artists around the world and become part of art history — for free.
        </p>
        <div style={{ marginTop: 30 }}>
          <a href="/submit" style={buttonGold}>Submit Your Show</a>
        </div>
      </section>
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