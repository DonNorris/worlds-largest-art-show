"use client";

import { useEffect, useState } from "react";

type UpgradePackage =
  | "FREE"
  | "LINK_PACKAGE"
  | "SHOWCASE_PACKAGE"
  | "COMPLETE_PACKAGE";

export default function SubmitPage() {
  const [form, setForm] = useState({
    showName: "",
    artistName: "",
    email: "",
    county: "",
    state: "",
    town: "",
    mainMedium: "",
    startDate: "",
    endDate: "",
    showHours: "",
    description: "",
    photoUrl: "",
    artistPhotoUrl: "",
    website: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    xTwitter: "",
    onlineStore: "",
    videoLink: "",
    galleryStudioLink: "",
    contactEmail: "",
    mailingListLink: "",
    plan: "FREE",
    upgradePackage: "FREE" as UpgradePackage,
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [artistPhotoFile, setArtistPhotoFile] = useState<File | null>(null);
  const [photoFile2, setPhotoFile2] = useState<File | null>(null);
  const [photoFile3, setPhotoFile3] = useState<File | null>(null);
  const [photoFile4, setPhotoFile4] = useState<File | null>(null);
  const [photoFile5, setPhotoFile5] = useState<File | null>(null);

  const [bio, setBio] = useState("");
  const [classes, setClasses] = useState("");
  const [services, setServices] = useState("");
  const [commissions, setCommissions] = useState("");
  const [upcomingShows, setUpcomingShows] = useState("");

  useEffect(() => {
    async function handlePaymentReturn() {
      const savedForm = localStorage.getItem("pendingShowForm");

      if (savedForm) {
        const parsed = JSON.parse(savedForm);
        setForm((current) => ({
          ...current,
          ...parsed,
        }));

        setBio(parsed.bio || "");
        setClasses(parsed.classes || "");
        setServices(parsed.services || "");
        setCommissions(parsed.commissions || "");
        setUpcomingShows(parsed.upcomingShows || "");
      }

      const params = new URLSearchParams(window.location.search);
      const payment = params.get("payment");
      const sessionId = params.get("session_id");

      if (payment !== "success" || !sessionId || !savedForm) {
        return;
      }

      setMessage("Verifying payment...");

      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          pendingForm: JSON.parse(savedForm),
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.paid) {
        setMessage("Payment could not be verified.");
        return;
      }

      localStorage.removeItem("pendingShowForm");

      if (verifyData.showId) {
        window.location.href = `/shows/${verifyData.showId}`;
        return;
      }

      setMessage(
        "Payment successful. Your art show has been saved successfully."
      );
    }

    handlePaymentReturn();
  }, []);

  function updateForm(name: string, value: string) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function uploadOne(
    file: File | null,
    errorMessage: string
  ): Promise<string> {
    if (!file) return "";

    const photoData = new FormData();
    photoData.append("photo", file);

    const uploadRes = await fetch("/api/upload-photo", {
      method: "POST",
      body: photoData,
    });

    if (!uploadRes.ok) {
      throw new Error(errorMessage);
    }

    const uploadData = await uploadRes.json();
    return uploadData.photoUrl;
  }

  async function processRegistration(packageChoice: UpgradePackage) {
    if (isSubmitting) return;

    if (!form.showName.trim()) {
      setMessage("Please enter your Show Name.");
      document.getElementById("showName")?.focus();
      return;
    }

    if (!form.artistName.trim()) {
      setMessage("Please enter your Artist Name.");
      document.getElementById("artistName")?.focus();
      return;
    }

    if (!form.email.trim()) {
      setMessage("Please enter your Email Address.");
      document.getElementById("email")?.focus();
      return;
    }

    if (!form.town.trim()) {
      setMessage("Please enter your Town / City.");
      document.getElementById("town")?.focus();
      return;
    }

    if (!form.state.trim()) {
      setMessage("Please enter your State / Province.");
      document.getElementById("state")?.focus();
      return;
    }

    if (!form.county.trim()) {
      setMessage("Please enter your Country.");
      document.getElementById("country")?.focus();
      return;
    }

    if (!form.mainMedium) {
      setMessage("Please select your Main Type of Art.");
      document.getElementById("mainMedium")?.focus();
      return;
    }

    setIsSubmitting(true);
    setMessage(
      packageChoice === "FREE"
        ? "Saving your Art Show..."
        : "Preparing your Art Show and secure payment..."
    );

    try {
      const photoUrl = await uploadOne(
        photoFile,
        "Your featured artwork photo could not be uploaded."
      );

      let artistPhotoUrl = "";
      let photoUrl2 = "";
      let photoUrl3 = "";
      let photoUrl4 = "";
      let photoUrl5 = "";

      if (
        packageChoice === "SHOWCASE_PACKAGE" ||
        packageChoice === "COMPLETE_PACKAGE"
      ) {
        artistPhotoUrl = await uploadOne(
          artistPhotoFile,
          "Artwork Photo 1 could not be uploaded."
        );

        photoUrl2 = await uploadOne(
          photoFile2,
          "Artwork Photo 2 could not be uploaded."
        );

        photoUrl3 = await uploadOne(
          photoFile3,
          "Artwork Photo 3 could not be uploaded."
        );

        photoUrl4 = await uploadOne(
          photoFile4,
          "Artwork Photo 4 could not be uploaded."
        );

        photoUrl5 = await uploadOne(
          photoFile5,
          "Artwork Photo 5 could not be uploaded."
        );
      }

      const completedForm = {
        ...form,
        upgradePackage: packageChoice,
        photoUrl,
        photoUrl2,
        photoUrl3,
        photoUrl4,
        photoUrl5,
        artistPhotoUrl,
        bio,
        classes,
        services,
        commissions,
        upcomingShows,
      };

      if (packageChoice === "FREE") {
        const res = await fetch("/api/shows", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completedForm),
        });

        if (!res.ok) {
          setMessage(
            "Error saving show. Please check the required fields."
          );
          setIsSubmitting(false);
          return;
        }

        const data = await res.json().catch(() => null);

        setMessage("Your art show has been saved successfully.");

        if (data?.id) {
          window.location.href = `/shows/${data.id}`;
          return;
        }

        setIsSubmitting(false);
        return;
      }

      localStorage.setItem(
        "pendingShowForm",
        JSON.stringify(completedForm)
      );

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upgradePackage: packageChoice,
        }),
      });

      const checkoutData = await checkoutRes.json();

      if (checkoutRes.ok && checkoutData.url) {
        window.location.href = checkoutData.url;
        return;
      }

      setMessage("Unable to start payment. Please try again.");
      setIsSubmitting(false);
    } catch (error) {
      const text =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setMessage(text);
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await processRegistration(form.upgradePackage);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 7,
    fontSize: 16,
    background: "white",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 5,
    color: "#111827",
  };

  const panelStyle: React.CSSProperties = {
    borderRadius: 18,
    padding: "18px 22px",
    marginBottom: 10,
  };

  const numberStyle = (background: string): React.CSSProperties => ({
    width: 47,
    height: 47,
    minWidth: 47,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background,
    color: "white",
    fontSize: 29,
    fontWeight: 900,
    lineHeight: 1,
  });

  const headingRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 13,
    marginBottom: 10,
  };

  const optionButton: React.CSSProperties = {
    width: "100%",
    border: "none",
    borderRadius: 26,
    padding: "12px 18px",
    color: "white",
    fontWeight: 900,
    fontSize: 21,
    cursor: "pointer",
    background:
      "linear-gradient(180deg, #ff233b 0%, #ed001d 55%, #d90018 100%)",
    boxShadow: "0 2px 4px rgba(0,0,0,.18)",
  };

  const checkStyle: React.CSSProperties = {
    color: "#12a42b",
    fontWeight: 900,
    marginRight: 7,
  };

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
            minHeight: 180,
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
              lineHeight: 0.92,
              fontWeight: 900,
              color: "#e00000",
              WebkitTextStroke: "3px #ffe000",
              textShadow: "3px 4px 0 #111",
            }}
          >
            World&apos;s Largest
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
            November 28 –
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

        <form onSubmit={handleSubmit}>
          {/* SECTION 1 */}
          <section
            style={{
              ...panelStyle,
              marginTop: 8,
              background:
                "linear-gradient(90deg,#fffdf0 0%,#fff7bb 55%,#fff1a2 100%)",
            }}
          >
            <div style={headingRow}>
              <div style={numberStyle("#1554ba")}>1</div>

              <div>
                <h1
                  style={{
                    margin: 0,
                    color: "#1554ba",
                    fontSize: "clamp(30px,4vw,44px)",
                    lineHeight: 1,
                  }}
                >
                  Register Your Art Show — FREE!
                </h1>

                <div
                  style={{
                    fontSize: 23,
                    fontWeight: 900,
                    marginTop: 8,
                  }}
                >
                  Your basic listing and first artwork photo are FREE.
                </div>

                <div style={{ fontSize: 18, marginTop: 5 }}>
                  No purchase is required to participate. Share your art
                  with the world and become part of art history!
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section
            style={{
              ...panelStyle,
              background:
                "linear-gradient(100deg,#d9f5ff 0%,#c8effc 100%)",
            }}
          >
            <div style={headingRow}>
              <div style={numberStyle("#1554ba")}>2</div>

              <h2
                style={{
                  margin: 0,
                  color: "#1554ba",
                  fontSize: 32,
                }}
              >
                Tell Us About Your Art Show
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 14,
              }}
            >
              <div>
                <label style={labelStyle}>Your Name (Artist/Show Name)</label>
                <input
                  id="showName"
                  required
                  value={form.showName}
                  style={inputStyle}
                  onChange={(e) => {
                    updateForm("showName", e.target.value);
                    updateForm("artistName", e.target.value);
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Main Type of Art</label>

                <select
                  id="mainMedium"
                  required
                  value={form.mainMedium}
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("mainMedium", e.target.value)
                  }
                >
                  <option value="">Select an option</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Painting">Painting</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Photography">Photography</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Woodworking">Woodworking</option>
                  <option value="Fiber Art">Fiber Art</option>
                  <option value="Glass Art">Glass Art</option>
                  <option value="Metal Art">Metal Art</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Mixed Media">Mixed Media</option>
                  <option value="Performance Art">
                    Performance Art
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Town/City</label>
                <input
                  id="town"
                  required
                  value={form.town}
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("town", e.target.value)
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>State/Province</label>
                <input
                  id="state"
                  required
                  value={form.state}
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("state", e.target.value)
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Country</label>
                <input
                  id="country"
                  required
                  value={form.county}
                  placeholder="United States"
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("county", e.target.value)
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("email", e.target.value)
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Show Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("startDate", e.target.value)
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Show End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("endDate", e.target.value)
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Show Hours</label>
                <input
                  value={form.showHours}
                  placeholder="e.g. 10 am – 5 pm"
                  style={inputStyle}
                  onChange={(e) =>
                    updateForm("showHours", e.target.value)
                  }
                />
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={labelStyle}>
                Description of Your Art Show
              </label>

              <textarea
                value={form.description}
                rows={3}
                placeholder="Tell visitors about your art, your show, and what makes it special..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
                onChange={(e) =>
                  updateForm("description", e.target.value)
                }
              />
            </div>
          </section>

          {/* SECTION 3 */}
          <section
            style={{
              ...panelStyle,
              background:
                "linear-gradient(100deg,#e7ffe9 0%,#dbffe1 100%)",
            }}
          >
            <div style={headingRow}>
              <div style={numberStyle("#087743")}>3</div>

              <h2
                style={{
                  margin: 0,
                  color: "#087743",
                  fontSize: 32,
                }}
              >
                Add Your FREE Artwork Photo
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(220px,320px) minmax(280px,1fr)",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  padding: 8,
                  minHeight: 175,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Selected artwork preview"
                    style={{
                      width: "100%",
                      maxHeight: 230,
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#087743",
                      fontWeight: 800,
                    }}
                  >
                    Your featured artwork
                    <br />
                    will appear here.
                  </div>
                )}
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 21,
                    color: "#087743",
                    marginBottom: 8,
                  }}
                >
                  Your First Artwork Photo Is FREE
                </div>

                <p style={{ marginTop: 0, fontSize: 17 }}>
                  This will be the large featured image on your
                  Individual Art Show page.
                </p>

                <label
                  style={{
                    display: "block",
                    padding: 24,
                    background: "white",
                    border: "2px dashed #a8b4c1",
                    borderRadius: 10,
                    textAlign: "center",
                    color: "#1354c4",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Click to upload your image
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    JPG, PNG or WEBP
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setPhotoFile(file);
                        setPhotoPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section
            style={{
              ...panelStyle,
              background:
                "linear-gradient(100deg,#fff5e9 0%,#fff1df 100%)",
            }}
          >
            <div style={headingRow}>
              <div style={numberStyle("#e65300")}>4</div>

              <h2
                style={{
                  margin: 0,
                  color: "#e52517",
                  fontSize: 31,
                }}
              >
                Tell Visitors More About You — Optional (FREE)
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: 20,
              }}
            >
              <div>
                <label style={labelStyle}>
                  About the Artist{" "}
                  <span
                    style={{
                      color: "#8c8c8c",
                      fontWeight: 400,
                    }}
                  >
                    (Optional)
                  </span>
                </label>

                <textarea
                  value={bio}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Classes{" "}
                  <span
                    style={{
                      color: "#8c8c8c",
                      fontWeight: 400,
                    }}
                  >
                    (Optional)
                  </span>
                </label>

                <textarea
                  value={classes}
                  rows={4}
                  placeholder="Do you offer classes? Tell visitors about them."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                  onChange={(e) => setClasses(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section
            style={{
              ...panelStyle,
              background:
                "linear-gradient(90deg,#f4eaff 0%,#f7efff 100%)",
            }}
          >
            <div style={headingRow}>
              <div style={numberStyle("#6020c8")}>5</div>

              <h2
                style={{
                  margin: 0,
                  color: "#6020c8",
                  fontSize: 28,
                }}
              >
                What Will My Art Show Page Look Like?
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(175px,1fr))",
                gap: 12,
                fontSize: 14,
              }}
            >
              <div>
                <span style={checkStyle}>✓</span>
                Featured artwork
                <br />
                <span style={{ marginLeft: 25 }}>
                  (Your first photo)
                </span>
              </div>

              <div>
                <span style={checkStyle}>✓</span>
                Show information
                <br />
                <span style={{ marginLeft: 25 }}>
                  and description
                </span>
              </div>

              <div>
                <span style={checkStyle}>✓</span>
                Optional gallery
                <br />
                <span style={{ marginLeft: 25 }}>
                  (additional photos)
                </span>
              </div>

              <div>
                <span style={checkStyle}>✓</span>
                Your website link
                <br />
                <span style={{ marginLeft: 25 }}>
                  (if selected)
                </span>
              </div>

              <div>
                <span style={checkStyle}>✓</span>A beautiful page to
                share with art lovers around the world!
              </div>
            </div>
          </section>

          {/* GREEN SCROLL BANNER */}
          <div
            style={{
              margin: "6px 80px 12px",
              padding: "8px 20px",
              textAlign: "center",
              fontSize: 28,
              fontWeight: 900,
              color: "#111",
              background:
                "linear-gradient(90deg,transparent 0%,#8dff00 12%,#adff00 50%,#8dff00 88%,transparent 100%)",
            }}
          >
            Scroll Down to Register Your Show
          </div>

          {/* SECTION 6 */}
          <section
            style={{
              ...panelStyle,
              background:
                "linear-gradient(100deg,#fff0ff 0%,#fff6fc 100%)",
            }}
          >
            <div style={headingRow}>
              <div style={numberStyle("#f0002d")}>6</div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#ed251c",
                    fontSize: 32,
                  }}
                >
                  Make Your Art Show Page Even Better
                </h2>

                <div style={{ fontSize: 17, marginTop: 4 }}>
                  Get more visitors, more exposure, and more opportunities.
                  Choose the upgrade that works best for you.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              {/* OPTION 1 */}
              <div
                style={{
                  border: "2px solid #8fd8ff",
                  borderRadius: 14,
                  padding: 14,
                  background:
                    "linear-gradient(180deg,#f3fbff 0%,#e2f5ff 100%)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#0749c9",
                        fontWeight: 900,
                        fontSize: 22,
                      }}
                    >
                      Option 1
                    </div>

                    <div
                      style={{
                        color: "#0749c9",
                        fontWeight: 900,
                        fontSize: 22,
                      }}
                    >
                      Complete Link Package
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#0957d2",
                      color: "white",
                      padding: "5px 14px",
                      borderRadius: 22,
                      fontWeight: 900,
                      fontSize: 22,
                    }}
                  >
                    $5
                  </div>
                </div>

                <p style={{ fontSize: 17 }}>
                  Help people find you, follow you, and contact you.
                  Add up to 10 links to your Art Show page:
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4px 10px",
                    fontSize: 15,
                    flexGrow: 1,
                  }}
                >
                  <div><span style={checkStyle}>✓</span>Website Link</div>
                  <div><span style={checkStyle}>✓</span>Online Store Link</div>
                  <div><span style={checkStyle}>✓</span>Instagram Link</div>
                  <div><span style={checkStyle}>✓</span>Video Link</div>
                  <div><span style={checkStyle}>✓</span>Facebook Link</div>
                  <div><span style={checkStyle}>✓</span>Gallery or Studio Link</div>
                  <div><span style={checkStyle}>✓</span>TikTok Link</div>
                  <div><span style={checkStyle}>✓</span>Email Contact Button</div>
                  <div><span style={checkStyle}>✓</span>Twitter / X Link</div>
                  <div><span style={checkStyle}>✓</span>Mailing-List Signup Link</div>
                </div>

                <div
                  style={{
                    padding: "10px",
                    marginTop: 12,
                    textAlign: "center",
                    fontWeight: 900,
                    background: "#ccefff",
                    borderRadius: 9,
                  }}
                >
                  All 10 link choices for only $5!
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  style={{
                    ...optionButton,
                    marginTop: 12,
                  }}
                  onClick={() =>
                    processRegistration("LINK_PACKAGE")
                  }
                >
                  Buy Option 1 🛒
                </button>
              </div>

              {/* OPTION 2 */}
              <div
                style={{
                  border: "2px solid #91dfaa",
                  borderRadius: 14,
                  padding: 14,
                  background:
                    "linear-gradient(180deg,#f0fff3 0%,#e0fae7 100%)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#087743",
                        fontWeight: 900,
                        fontSize: 22,
                      }}
                    >
                      Option 2
                    </div>

                    <div
                      style={{
                        color: "#087743",
                        fontWeight: 900,
                        fontSize: 22,
                      }}
                    >
                      Expanded Artist Page
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#087743",
                      color: "white",
                      padding: "5px 14px",
                      borderRadius: 22,
                      fontWeight: 900,
                      fontSize: 22,
                    }}
                  >
                    $5
                  </div>
                </div>

                <p style={{ fontSize: 17 }}>
                  Show more of your art and tell visitors more about you.
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: 4,
                    fontSize: 15,
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>5 Additional Artwork Photos</strong>
                  </div>

                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>Services</strong> — what you offer
                  </div>

                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>Commissions</strong> — tell visitors what you accept
                  </div>

                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>Upcoming Shows</strong> — promote events
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px",
                    marginTop: 12,
                    textAlign: "center",
                    fontWeight: 900,
                    color: "#087743",
                    background: "#c9f6d1",
                    borderRadius: 9,
                  }}
                >
                  Turn your listing into a much richer Art Show page for
                  only $5!
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  style={{
                    ...optionButton,
                    marginTop: 12,
                  }}
                  onClick={() =>
                    processRegistration("SHOWCASE_PACKAGE")
                  }
                >
                  Buy Option 2 🛒
                </button>
              </div>

              {/* OPTION 3 */}
              <div
                style={{
                  position: "relative",
                  border: "3px solid #f0a000",
                  borderRadius: 14,
                  padding: 14,
                  background:
                    "linear-gradient(180deg,#fffce7 0%,#fff2af 100%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,.14)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    top: -19,
                    background: "#f01931",
                    color: "white",
                    padding: "6px 17px",
                    fontSize: 19,
                    fontWeight: 900,
                    transform: "rotate(-5deg)",
                  }}
                >
                  BEST VALUE!
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#0749c9",
                        fontWeight: 900,
                        fontSize: 22,
                      }}
                    >
                      Option 3
                    </div>

                    <div
                      style={{
                        color: "#0749c9",
                        fontWeight: 900,
                        fontSize: 20,
                      }}
                    >
                      Complete Art Show Page
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#ed101e",
                      color: "white",
                      padding: "5px 14px",
                      borderRadius: 22,
                      fontWeight: 900,
                      fontSize: 22,
                    }}
                  >
                    $8
                  </div>
                </div>

                <div
                  style={{
                    color: "#ec2118",
                    fontWeight: 900,
                    fontSize: 17,
                    margin: "8px 0",
                  }}
                >
                  Get BOTH packages and SAVE $2!
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 3,
                    fontSize: 14,
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>All 10 Link & Contact Options</strong>
                  </div>

                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>5 Additional Artwork Photos</strong>
                  </div>

                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>Services</strong>
                  </div>

                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>Commissions</strong>
                  </div>

                  <div>
                    <span style={checkStyle}>✓</span>
                    <strong>Upcoming Shows</strong>
                  </div>
                </div>

                <div
                  style={{
                    padding: "8px",
                    marginTop: 10,
                    background: "#ed101e",
                    color: "white",
                    borderRadius: 9,
                    textAlign: "center",
                    fontWeight: 900,
                  }}
                >
                  Everything in Option 1 + Option 2
                  <div style={{ fontSize: 23 }}>
                    ONLY $8 — SAVE $2!
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  style={{
                    ...optionButton,
                    marginTop: 10,
                  }}
                  onClick={() =>
                    processRegistration("COMPLETE_PACKAGE")
                  }
                >
                  Buy Option 3 🛒
                </button>
              </div>
            </div>

            {/* PAID LINK FIELDS */}
            {(form.upgradePackage === "LINK_PACKAGE" ||
              form.upgradePackage === "COMPLETE_PACKAGE") && (
              <div
                style={{
                  marginTop: 24,
                  padding: 20,
                  borderRadius: 14,
                  background: "#eef8ff",
                }}
              >
                <h3
                  style={{
                    color: "#0749c9",
                    marginTop: 0,
                    fontSize: 25,
                  }}
                >
                  Your Link Package
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(260px,1fr))",
                    gap: 12,
                  }}
                >
                  {[
                    ["website", "Website Link"],
                    ["instagram", "Instagram Link"],
                    ["facebook", "Facebook Link"],
                    ["tiktok", "TikTok Link"],
                    ["xTwitter", "Twitter / X Link"],
                    ["onlineStore", "Online Store Link"],
                    ["videoLink", "Video Link"],
                    ["galleryStudioLink", "Gallery or Studio Link"],
                    ["contactEmail", "Email for Contact Button"],
                    ["mailingListLink", "Mailing-List Signup Link"],
                  ].map(([name, label]) => (
                    <div key={name}>
                      <label style={labelStyle}>{label}</label>

                      <input
                        value={(form as any)[name]}
                        style={inputStyle}
                        placeholder={label}
                        onChange={(e) =>
                          updateForm(name, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAID SHOWCASE FIELDS */}
            {(form.upgradePackage === "SHOWCASE_PACKAGE" ||
              form.upgradePackage === "COMPLETE_PACKAGE") && (
              <div
                style={{
                  marginTop: 24,
                  padding: 20,
                  borderRadius: 14,
                  background: "#effff1",
                }}
              >
                <h3
                  style={{
                    color: "#087743",
                    marginTop: 0,
                    fontSize: 25,
                  }}
                >
                  Your Expanded Artist Page
                </h3>

                <p>
                  Add up to five additional artwork photos.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(220px,1fr))",
                    gap: 12,
                  }}
                >
                  <div>
                    <label style={labelStyle}>
                      Additional Artwork Photo 1
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      style={inputStyle}
                      onChange={(e) =>
                        setArtistPhotoFile(
                          e.target.files?.[0] || null
                        )
                      }
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Additional Artwork Photo 2
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      style={inputStyle}
                      onChange={(e) =>
                        setPhotoFile2(e.target.files?.[0] || null)
                      }
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Additional Artwork Photo 3
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      style={inputStyle}
                      onChange={(e) =>
                        setPhotoFile3(e.target.files?.[0] || null)
                      }
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Additional Artwork Photo 4
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      style={inputStyle}
                      onChange={(e) =>
                        setPhotoFile4(e.target.files?.[0] || null)
                      }
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Additional Artwork Photo 5
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      style={inputStyle}
                      onChange={(e) =>
                        setPhotoFile5(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(280px,1fr))",
                    gap: 14,
                    marginTop: 18,
                  }}
                >
                  <div>
                    <label style={labelStyle}>Services</label>
                    <textarea
                      value={services}
                      rows={4}
                      style={inputStyle}
                      placeholder="Describe services you offer."
                      onChange={(e) =>
                        setServices(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Commissions</label>
                    <textarea
                      value={commissions}
                      rows={4}
                      style={inputStyle}
                      placeholder="Describe commissioned work you accept."
                      onChange={(e) =>
                        setCommissions(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Upcoming Shows</label>
                    <textarea
                      value={upcomingShows}
                      rows={4}
                      style={inputStyle}
                      placeholder="List your upcoming shows, exhibitions, or events."
                      onChange={(e) =>
                        setUpcomingShows(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 7 */}
          <section
            style={{
              margin: "0 14px 18px",
              padding: "13px 20px",
              borderRadius: 15,
              background:
                "linear-gradient(180deg,#0876dc 0%,#0560c7 100%)",
              color: "white",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 12,
                ...numberStyle("#fb1232"),
              }}
            >
              7
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  border: "2px solid white",
                  borderRadius: 30,
                  padding: "10px 44px",
                  background:
                    "linear-gradient(180deg,#ff233b,#e5001c)",
                  color: "white",
                  fontSize: 23,
                  fontWeight: 900,
                  cursor: isSubmitting
                    ? "not-allowed"
                    : "pointer",
                  minWidth: 365,
                  boxShadow: "0 3px 7px rgba(0,0,0,.25)",
                }}
              >
                {isSubmitting
                  ? "PLEASE WAIT..."
                  : "REGISTER MY ART SHOW  ›"}
              </button>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 19,
                fontWeight: 800,
                marginTop: 8,
              }}
            >
              You will be able to view your completed Art Show page
              after registration.
            </div>
          </section>
        </form>

        {message && (
          <div
            style={{
              margin: "0 20px 30px",
              padding: 18,
              borderRadius: 12,
              background: "#fff7ce",
              border: "2px solid #efc84a",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {message}

            {message.includes("saved successfully") && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 15,
                }}
              >
                <a
                  href="/#directory"
                  style={{
                    padding: "12px 18px",
                    background: "#111827",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: 8,
                    fontWeight: "bold",
                  }}
                >
                  View Registered Shows
                </a>

                <a
                  href="/submit"
                  style={{
                    padding: "12px 18px",
                    background: "#f4c95d",
                    color: "#111827",
                    textDecoration: "none",
                    borderRadius: 8,
                    fontWeight: "bold",
                  }}
                >
                  Register Another Show
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}