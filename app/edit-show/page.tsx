"use client";

import { useState } from "react";

type FoundShow = {
  id: string;
  showName: string;
  artistName: string;
  email: string | null;
  town: string;
  state: string;
  country: string;
  upgradePackage: string;
};

export default function EditShowPage() {
  const [showId, setShowId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundShow, setFoundShow] = useState<FoundShow | null>(null);

  async function findShow() {
    setMessage("");
    setFoundShow(null);

    if (!showId.trim() || !email.trim()) {
      setMessage("Please enter both your Art Show number and email address.");
      return;
    }

    setIsSearching(true);

    try {
      const res = await fetch("/api/find-show", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showId,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(
          data.error || "We could not find your Art Show. Please try again."
        );
        return;
      }

      setFoundShow(data.show);
      setMessage("Art Show found successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while looking for your Art Show.");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#111827",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "white",
        }}
      >
        {/* TOP ART BANNER */}
        <section
          style={{
            minHeight: 210,
            padding: "22px 30px",
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.12)), url('/art-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "clamp(44px, 7vw, 76px)",
              fontWeight: 900,
              lineHeight: 1,
              color: "#ffeb00",
              textShadow: "3px 3px 0 #d71920, 5px 5px 4px #000",
            }}
          >
            World's Largest
            <br />
            Art Show
          </div>

          <div
            style={{
              position: "absolute",
              right: 28,
              top: 22,
              fontWeight: 900,
              fontSize: 20,
              textShadow: "2px 2px 2px #000",
              textAlign: "center",
            }}
          >
            November 28 —
            <br />
            December 8, 2026
            <br />
            <span style={{ fontSize: 17 }}>
              Any Artist.
              <br />
              Any Art.
              <br />
              Any Location.
              <br />
              Any Country.
            </span>
          </div>
        </section>

        {/* PAGE TITLE */}
        <section
          style={{
            background: "#fff3b0",
            padding: "28px 35px",
            borderRadius: 18,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#1455c0",
              fontSize: 40,
              margin: 0,
              fontWeight: 700,
            }}
          >
            Edit Your Art Show
          </h1>

          <p
            style={{
              fontSize: 21,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Your Art Show can change — and your page can change with it.
          </p>

          <p style={{ fontSize: 18, margin: 0 }}>
            Return here anytime to update your show information, dates,
            photos, links, and available options.
          </p>
        </section>

        {/* FIND YOUR SHOW */}
        <section
          style={{
            background: "#ccefff",
            padding: "30px 35px",
            borderRadius: 18,
            marginTop: 10,
          }}
        >
          <h2
            style={{
              color: "#1455c0",
              fontSize: 30,
              marginTop: 0,
              marginBottom: 10,
            }}
          >
            Find Your Art Show
          </h2>

          <p style={{ fontSize: 18 }}>
            Enter your Art Show number and the email address you used when
            you registered.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginTop: 20,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: 7,
                }}
              >
                Art Show Number
              </label>

              <input
                type="text"
                value={showId}
                onChange={(e) => setShowId(e.target.value)}
                placeholder="Enter your Art Show number"
                style={{
                  width: "100%",
                  padding: 14,
                  fontSize: 17,
                  border: "1px solid #999",
                  borderRadius: 7,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: 7,
                }}
              >
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email used when you registered"
                style={{
                  width: "100%",
                  padding: 14,
                  fontSize: 17,
                  border: "1px solid #999",
                  borderRadius: 7,
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button
              type="button"
              onClick={findShow}
              disabled={isSearching}
              style={{
                background: "#f4c542",
                color: "#111",
                border: "2px solid #b88a00",
                borderRadius: 9,
                padding: "15px 35px",
                fontSize: 21,
                fontWeight: 900,
                cursor: isSearching ? "not-allowed" : "pointer",
              }}
            >
              {isSearching ? "LOOKING..." : "FIND MY ART SHOW"}
            </button>
          </div>

          {message && (
            <div
              style={{
                marginTop: 24,
                padding: 16,
                borderRadius: 10,
                background: foundShow ? "#dcffe1" : "#fff0f0",
                border: foundShow
                  ? "1px solid #3aa65a"
                  : "1px solid #d9534f",
                fontSize: 17,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </section>

        {/* FOUND SHOW */}
        {foundShow && (
          <section
            style={{
              background: "#f5edff",
              padding: "28px 35px",
              borderRadius: 18,
              marginTop: 10,
            }}
          >
            <h2
              style={{
                color: "#6b2fb8",
                fontSize: 29,
                marginTop: 0,
              }}
            >
              We Found Your Art Show
            </h2>

            <div
              style={{
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              <strong>Art Show:</strong> {foundShow.showName}
              <br />
              <strong>Artist:</strong> {foundShow.artistName}
              <br />
              <strong>Location:</strong> {foundShow.town},{" "}
              {foundShow.state}, {foundShow.country}
              <br />
              <strong>Current Package:</strong>{" "}
              {foundShow.upgradePackage || "FREE"}
            </div>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button
                type="button"
                style={{
                  background: "#1455c0",
                  color: "white",
                  border: "none",
                  borderRadius: 9,
                  padding: "15px 32px",
                  fontSize: 20,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                CONTINUE TO EDIT MY ART SHOW
              </button>
            </div>
          </section>
        )}

        {/* WHAT CAN BE CHANGED */}
        <section
          style={{
            background: "#dcffe1",
            padding: "28px 35px",
            borderRadius: 18,
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <h2
            style={{
              color: "#08783c",
              fontSize: 29,
              marginTop: 0,
            }}
          >
            You Will Be Able to Update:
          </h2>

          <div
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            ✓ Show address, dates and hours
            <br />
            ✓ Description of your Art Show
            <br />
            ✓ Artwork photos and artist photo
            <br />
            ✓ Website, social media and other links
            <br />
            ✓ Artist information, classes, services and commissions
            <br />
            ✓ Upcoming shows
            <br />
            ✓ Information included with your paid options
            <br />
            ✓ Add paid options later if you originally registered FREE
          </div>
        </section>
      </div>
    </main>
  );
}