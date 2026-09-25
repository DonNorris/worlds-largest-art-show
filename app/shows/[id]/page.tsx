import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const show = await db.show.findUnique({
    where: { id },
  });

  if (!show) {
    notFound();
  }

  const normalizeUrl = (value?: string | null) => {
    if (!value) return undefined;
    return value.startsWith("http") ? value : `https://${value}`;
  };

  const websiteUrl = normalizeUrl(show.website);
  const instagramUrl = normalizeUrl(show.instagram);
  const facebookUrl = normalizeUrl(show.facebook);
  const tiktokUrl = normalizeUrl(show.tiktok);
  const xTwitterUrl = normalizeUrl(show.xTwitter);
  const onlineStoreUrl = normalizeUrl(show.onlineStore);
  const videoUrl = normalizeUrl(show.videoLink);
  const galleryStudioUrl = normalizeUrl(show.galleryStudioLink);
  const mailingListUrl = normalizeUrl(show.mailingListLink);

  const extraPhotos = [
    show.artistPhotoUrl,
    show.photoUrl2,
    show.photoUrl3,
    show.photoUrl4,
    show.photoUrl5,
  ].filter(Boolean) as string[];

  const showPageUrl = `https://www.worldslargestartshow.com/shows/${id}`;
  const encodedUrl = encodeURIComponent(showPageUrl);
  const encodedText = encodeURIComponent(
    `See ${show.showName} in the World's Largest Art Show!`
  );

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#10244a",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const sectionStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",
    padding: "28px 24px",
    boxSizing: "border-box",
  };

  const buttonStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 700,
    color: "white",
    background: "#0d6f78",
  };

  const goldButtonStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "14px 22px",
    borderRadius: 9,
    textDecoration: "none",
    fontWeight: 800,
    color: "#111",
    background: "#f4c542",
    border: "2px solid #c89600",
  };

  return (
    <main style={pageStyle}>
      {/* HEADER */}
      <header
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,40,110,.12), rgba(0,40,110,.12)), url('/art-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          padding: "28px 18px 24px",
          color: "white",
          borderBottom: "5px solid #08737d",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.05 }}>
            World&apos;s Largest Art Show
          </div>

          <div
            style={{
              fontSize: 27,
              fontWeight: 700,
              marginTop: 8,
            }}
          >
            Art Everywhere. Artists United.
          </div>

          <div
            style={{
              fontSize: 18,
              marginTop: 8,
              fontWeight: 600,
            }}
          >
            Join artists around the world and become part of art history — for
            free.
          </div>

          <div style={{ marginTop: 18 }}>
            <Link href="/submit" style={goldButtonStyle}>
              Register Your Art Show — FREE!
            </Link>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav
        style={{
          background: "#08737d",
          padding: "12px 16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 28,
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>

          <Link
            href="/submit"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register Your Art Show
          </Link>

          <Link
            href="/#directory"
            style={{ color: "white", textDecoration: "none" }}
          >
            Explore Art Shows
          </Link>
        </div>
      </nav>

      {/* HERO AREA */}
      <section style={sectionStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, .95fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* FEATURED IMAGE */}
          <div>
            {show.photoUrl ? (
              <img
                src={show.photoUrl}
                alt={`${show.showName} featured artwork`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 620,
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 8,
                  border: "2px solid #173d75",
                  background: "#f4f4f4",
                }}
              />
            ) : (
              <div
                style={{
                  minHeight: 420,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f0f0f0",
                  borderRadius: 8,
                  border: "2px solid #173d75",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                Artwork image coming soon
              </div>
            )}
          </div>

          {/* SHOW DETAILS */}
          <div>
            <h1
              style={{
                fontSize: 50,
                lineHeight: 1.02,
                margin: "0 0 6px",
                color: "#173d75",
              }}
            >
              {show.showName}
            </h1>

            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              {show.showAddress && (
  <div>{show.showAddress}</div>
)}
              {[show.town, show.state, show.county]
                .filter(Boolean)
                .join(", ")}
            </div>

            {show.mainMedium && (
              <div
                style={{
                  fontSize: 22,
                  marginBottom: 18,
                }}
              >
                {show.mainMedium}
              </div>
            )}

            <div
              style={{
                background: "#f6f0e4",
                borderRadius: 10,
                padding: "16px 18px",
                lineHeight: 1.7,
                fontSize: 18,
                marginBottom: 20,
              }}
            >
              <div>
                <strong>Artist:</strong> {show.artistName}
              </div>

              {(show.startDate || show.endDate) && (
                <div>
                  <strong>Show Dates:</strong>{" "}
                  {show.startDate || "To Be Announced"}
                  {show.endDate ? ` through ${show.endDate}` : ""}
                </div>
              )}

              {show.showHours && (
                <div>
                  <strong>Show Hours:</strong> {show.showHours}
                </div>
              )}

              <div>
                <strong>Location:</strong>{" "}
                {[show.town, show.state, show.county]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>

            {show.description && (
              <>
                <h2
                  style={{
                    fontSize: 30,
                    color: "#173d75",
                    margin: "10px 0 8px",
                  }}
                >
                  About This Art Show
                </h2>

                <p
                  style={{
                    fontSize: 19,
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                    marginTop: 0,
                  }}
                >
                  {show.description}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ADDITIONAL ARTWORK */}
      {extraPhotos.length > 0 && (
        <section style={sectionStyle}>
          <h2
            style={{
              fontSize: 36,
              color: "#173d75",
              margin: "0 0 18px",
            }}
          >
            More Artwork From This Artist
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
            }}
          >
            {extraPhotos.map((photo, index) => (
              <a
                href={photo}
                target="_blank"
                rel="noopener noreferrer"
                key={`${photo}-${index}`}
                style={{
                  display: "block",
                  background: "#f5f5f5",
                  border: "2px solid #d2aa35",
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <img
                  src={photo}
                  alt={`Artwork ${index + 2} from ${show.artistName}`}
                  style={{
                    width: "100%",
                    height: 210,
                    objectFit: "contain",
                    display: "block",
                    background: "#111",
                  }}
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* OPTIONAL ARTIST INFORMATION */}
      {(show.bio ||
        show.classes ||
        show.services ||
        show.commissions ||
        show.upcomingShows) && (
        <section style={sectionStyle}>
          <div
            style={{
              background: "#f8f8f8",
              borderRadius: 12,
              padding: "24px",
              border: "1px solid #ddd",
            }}
          >
            {show.bio && (
              <div style={{ marginBottom: 24 }}>
                <h2
                  style={{
                    color: "#173d75",
                    fontSize: 30,
                    margin: "0 0 8px",
                  }}
                >
                  About the Artist
                </h2>
                <p
                  style={{
                    fontSize: 18,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {show.bio}
                </p>
              </div>
            )}

            {show.classes && (
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ color: "#173d75" }}>Classes</h2>
                <p style={{ whiteSpace: "pre-wrap", fontSize: 18 }}>
                  {show.classes}
                </p>
              </div>
            )}

            {show.services && (
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ color: "#173d75" }}>Services</h2>
                <p style={{ whiteSpace: "pre-wrap", fontSize: 18 }}>
                  {show.services}
                </p>
              </div>
            )}

            {show.commissions && (
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ color: "#173d75" }}>Commissions</h2>
                <p style={{ whiteSpace: "pre-wrap", fontSize: 18 }}>
                  {show.commissions}
                </p>
              </div>
            )}

            {show.upcomingShows && (
              <div>
                <h2 style={{ color: "#173d75" }}>Upcoming Shows</h2>
                <p style={{ whiteSpace: "pre-wrap", fontSize: 18 }}>
                  {show.upcomingShows}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* VISIT THE ARTIST */}
      {(websiteUrl ||
        onlineStoreUrl ||
        instagramUrl ||
        facebookUrl ||
        tiktokUrl ||
        xTwitterUrl ||
        videoUrl ||
        galleryStudioUrl ||
        show.contactEmail ||
        mailingListUrl) && (
        <section style={sectionStyle}>
          <div
            style={{
              background: "#f6f0e4",
              borderRadius: 12,
              padding: "22px",
            }}
          >
            <h2
              style={{
                color: "#173d75",
                fontSize: 34,
                margin: "0 0 16px",
              }}
            >
              Visit the Artist
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  🌐 Website
                </a>
              )}

              {onlineStoreUrl && (
                <a
                  href={onlineStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  🛒 Online Store
                </a>
              )}

              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  Instagram
                </a>
              )}

              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  Facebook
                </a>
              )}

              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  TikTok
                </a>
              )}

              {xTwitterUrl && (
                <a
                  href={xTwitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  X
                </a>
              )}

              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  ▶ Video
                </a>
              )}

              {galleryStudioUrl && (
                <a
                  href={galleryStudioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  🖼 Gallery / Studio
                </a>
              )}

              {show.contactEmail && (
                <a
                  href={`mailto:${show.contactEmail}`}
                  style={buttonStyle}
                >
                  ✉ Email Artist
                </a>
              )}

              {mailingListUrl && (
                <a
                  href={mailingListUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                >
                  Join Mailing List
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SHARE THIS SHOW */}
      <section style={sectionStyle}>
        <div
          style={{
            background: "#f7f7f7",
            borderRadius: 12,
            padding: "22px",
            border: "1px solid #ddd",
          }}
        >
          <h2
            style={{
              color: "#173d75",
              fontSize: 34,
              margin: "0 0 6px",
            }}
          >
            Share This Art Show
          </h2>

          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginTop: 0,
            }}
          >
            Help make this the World&apos;s Largest Art Show — share this
            artist!
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle}
            >
              Share on Facebook
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...buttonStyle,
                background: "#111",
              }}
            >
              Share on X
            </a>

            <a
              href={`mailto:?subject=${encodedText}&body=${encodedUrl}`}
              style={{
                ...buttonStyle,
                background: "#138651",
              }}
            >
              Share by Email
            </a>
          </div>

          <div
            style={{
              marginTop: 16,
              padding: "12px",
              background: "white",
              border: "1px solid #bbb",
              borderRadius: 7,
              fontSize: 15,
              wordBreak: "break-all",
            }}
          >
            <strong>Page Link:</strong> {showPageUrl}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,30,100,.22), rgba(20,30,100,.22)), url('/art-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          padding: "30px 18px",
          marginTop: 12,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
          }}
        >
          Part of the World&apos;s Largest Art Show
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          November 28 – December 8, 2026
        </div>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <Link href="/#directory" style={goldButtonStyle}>
            Explore More Art Shows
          </Link>

          <Link href="/submit" style={goldButtonStyle}>
            Register Your Own Art Show — FREE!
          </Link>
        </div>
      </footer>
    </main>
  );
}