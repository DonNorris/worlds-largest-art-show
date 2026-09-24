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

  const websiteUrl =
    show.website && show.website.startsWith("http")
      ? show.website
      : show.website
        ? `https://${show.website}`
       : undefined;

  const instagramUrl =
    show.instagram && show.instagram.startsWith("http")
      ? show.instagram
      : show.instagram
        ? `https://${show.instagram}`
        : undefined;
        const facebookUrl =
  show.facebook && show.facebook.startsWith("http")
    ? show.facebook
    : show.facebook
      ? `https://${show.facebook}`
      : undefined;
      const tiktokUrl =
  show.tiktok && show.tiktok.startsWith("http")
    ? show.tiktok
    : show.tiktok
      ? `https://${show.tiktok}`
      : undefined;
      const xTwitterUrl =
  show.xTwitter && show.xTwitter.startsWith("http")
    ? show.xTwitter
    : show.xTwitter
      ? `https://${show.xTwitter}`
      : undefined;
      const onlineStoreUrl =
  show.onlineStore && show.onlineStore.startsWith("http")
    ? show.onlineStore
    : show.onlineStore
      ? `https://${show.onlineStore}`
      : undefined;
      const videoUrl =
  show.videoLink && show.videoLink.startsWith("http")
    ? show.videoLink
    : show.videoLink
      ? `https://${show.videoLink}`
      : undefined;
      const galleryStudioUrl =
  show.galleryStudioLink && show.galleryStudioLink.startsWith("http")
    ? show.galleryStudioLink
    : show.galleryStudioLink
      ? `https://${show.galleryStudioLink}`
      : undefined;
      const mailingListUrl =
  show.mailingListLink && show.mailingListLink.startsWith("http")
    ? show.mailingListLink
    : show.mailingListLink
      ? `https://${show.mailingListLink}`
      : undefined;

  return (
<main
  style={{
    minHeight: "100vh",
    background: "#f6f1e7",
    padding: "50px 20px",
    color: "#111827",
  }}
>
  <div
    style={{
      maxWidth: 850,
      margin: "0 auto",
      background: "white",
      padding: "40px",
      borderRadius: 18,
      boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
      lineHeight: 1.6,
    }}
  >

 
     <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "30px",
    alignItems: "start",
  }}
>
     <div>
   <Link href="/#directory">← Back to Registered Shows</Link>

      <h1
  style={{
    marginTop: "12px",
    marginBottom: "12px",
    fontSize: "32px",
    fontWeight: 700,
    color: "#2563eb",
  }}
>
  {show.showName}
</h1>

      <p>
        <strong>Artist:</strong> {show.artistName}
      </p>

      {show.mainMedium && (
        <p>
          <strong>Art Type:</strong> {show.mainMedium}
        </p>
      )}

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
        <p>
          <strong>Hours:</strong> {show.showHours}
        </p>
      )}

      {show.description && (
        <>
          <h2 style={{ color: "#2563eb", fontSize: "22px", marginTop: "24px", marginBottom: "8px" }}>About This Show</h2>
          <p>{show.description}</p>
        </>
      )}

      {show.website && (
  <p>
    <strong>Website</strong><br />
    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}>
      Visit Artist Website →
    </a>
  </p>
)}

      {show.instagram && (
  <p>
    <strong>Instagram</strong><br />
    <a
  href={instagramUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Visit Artist Instagram →
</a>
  </p>
)}
     {show.facebook && (
  <p>
    <strong>Facebook</strong><br />
    <a
  href={facebookUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Visit Artist Facebook →
</a>
  </p>
)}
{show.tiktok && (
  <p>
    <strong>TikTok</strong><br />
    <a
  href={tiktokUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Visit Artist TikTok →
</a>
  </p>
)}
{show.xTwitter && (
  <p>
    <strong>Twitter / X</strong><br />
    <a
  href={xTwitterUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Visit Artist X / Twitter →
</a>
  </p>
)}
{show.onlineStore && (
  <p>
    <strong>Online Store</strong><br />
   <a
  href={onlineStoreUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Visit Artist Online Store →
</a>
  </p>
)}
{show.videoLink && (
  <p>
    <strong>Watch Video</strong><br />
    <a
  href={videoUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Watch Artist Video →
</a>
  </p>
)}
{show.galleryStudioLink && (
  <p>
    <strong>Gallery or Studio</strong><br />
    <a
  href={galleryStudioUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Visit Artist Gallery / Studio →
</a>
  </p>
)}
{show.contactEmail && (
  <p style={{ marginTop: "12px" }}>
   <strong>Email the Artist</strong><br />
    <a
  href={`mailto:${show.contactEmail}`}
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Email the Artist →
</a>
  </p>
)}
{show.mailingListLink && (
  <p>
    <strong>Join Mailing List</strong><br />
    <a
  href={mailingListUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "inline-block", background: "#2563eb", color: "white", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
>
  Join Artist Mailing List →
</a>
  </p>
)}
    </div>
    {show.photoUrl && (
  <div>
    <img
      src={show.photoUrl}
      alt={`${show.showName} artwork`}
      style={{
        width: "100%",
        maxWidth: "320px",
        height: "auto",
        borderRadius: "12px",
        display: "block",
      }}
    />
  </div>)}
{show.artistPhotoUrl && (
  <div>
    <img
  src={show.artistPhotoUrl}
  alt="Artwork Photo 1"
  style={{
    width: "320px",
    height: "320px",
    objectFit: "contain",
    display: "block",
  }}
/>
  </div>
)}
{show.photoUrl2 && (
  <div>
    <img
  src={show.photoUrl2}
  alt="Artwork Photo 2"
  style={{
    width: "320px",
    height: "320px",
    objectFit: "contain",
    display: "block",
  }}
/>
  </div>
)}

{show.photoUrl3 && (
  <div>
    <img
  src={show.photoUrl3}
  alt="Artwork Photo 3"
  style={{
    width: "320px",
    height: "320px",
    objectFit: "contain",
    display: "block",
  }}
/>
  </div>
)}

{show.photoUrl4 && (
  <div>
    <img
  src={show.photoUrl4}
  alt="Artwork Photo 4"
  style={{
    width: "320px",
    height: "320px",
    objectFit: "contain",
    display: "block",
  }}
/>
  </div>
)}

{show.photoUrl5 && (
  <div>
    <img
  src={show.photoUrl5}
  alt="Artwork Photo 5"
  style={{
    width: "320px",
    height: "320px",
    objectFit: "contain",
    display: "block",
  }}
/>
  </div>
)}
    {show.bio && (
  <div>
    <h2>About the Artist</h2>
    <p style={{ whiteSpace: "pre-wrap" }}>{show.bio}</p>
  </div>
)}

{show.classes && (
  <div>
    <h2>Classes</h2>
    <p style={{ whiteSpace: "pre-wrap" }}>{show.classes}</p>
  </div>
)}

{show.services && (
  <div>
    <h2>Services</h2>
    <p style={{ whiteSpace: "pre-wrap" }}>{show.services}</p>
  </div>
)}

{show.commissions && (
  <div>
    <h2>Commissions</h2>
    <p style={{ whiteSpace: "pre-wrap" }}>{show.commissions}</p>
  </div>
)}

{show.upcomingShows && (
  <div>
    <h2>Upcoming Shows</h2>
    <p style={{ whiteSpace: "pre-wrap" }}>{show.upcomingShows}</p>
  </div>
)}
     </div>
      </div>
    </main>
  );
}