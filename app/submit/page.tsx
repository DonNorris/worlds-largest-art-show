"use client";
import { useEffect, useState } from "react";

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
    upgradePackage: "FREE",
  });

  const [message, setMessage] = useState("");
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
      setForm(JSON.parse(savedForm));
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
setMessage("Payment successful. Your art show has been saved successfully.");
}
  handlePaymentReturn();
}, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Saving...");

    let photoUrl = "";
let artistPhotoUrl = "";
if (photoFile) {
  const photoData = new FormData();
  photoData.append("photo", photoFile);
   const uploadRes = await fetch("/api/upload-photo", {
      method: "POST",
    body: photoData,
  });

  if (!uploadRes.ok) {
    setMessage("Photo could not be uploaded.");
    return;
  }

  const uploadData = await uploadRes.json();
  photoUrl = uploadData.photoUrl;
  console.log("UPLOADED PHOTO URL:", photoUrl);
}
  if (artistPhotoFile) {
const artistPhotoData = new FormData();
artistPhotoData.append("photo", artistPhotoFile);
 const artistUploadRes = await fetch("/api/upload-photo", {
  method: "POST",
  headers: {},
  body: artistPhotoData,
  });
  if (!artistUploadRes.ok) {
    setMessage("Artist photo could not be uploaded.");
    return;
    }
const artistUploadData = await artistUploadRes.json();
    artistPhotoUrl = artistUploadData.photoUrl;
}
let photoUrl2 = "";
if (photoFile2) {  
  const photoData2 = new FormData();
  photoData2.append("photo", photoFile2);
  const uploadRes2 = await fetch("/api/upload-photo", {
    method: "POST",
    body: photoData2,
    });
    if (!uploadRes2.ok) {
      setMessage("Artwork Photo 2 could not be uploaded.");
      return;
      }
      const uploadData2 = await uploadRes2.json();
      photoUrl2 = uploadData2.photoUrl;
      }
      let photoUrl3 = "";
      if (photoFile3) {
        const photoData3 = new FormData();
        photoData3.append("photo", photoFile3);
        const uploadRes3 = await fetch("/api/upload-photo", {
          method: "POST",
          body: photoData3,
          });
          if (!uploadRes3.ok) {
            setMessage("Artwork Photo 3 could not be uploaded.");
            return;
            }
            const uploadData3 = await uploadRes3.json();
            photoUrl3 = uploadData3.photoUrl;
            }
            let photoUrl4 = "";
            if (photoFile4) {
              const photoData4 = new FormData();
              photoData4.append("photo", photoFile4);
              const uploadRes4 = await fetch("/api/upload-photo", {
                method: "POST",
                body: photoData4,
                });
                if (!uploadRes4.ok) {
                  setMessage("Artwork Photo 4 could not be uploaded.");
                  return;
                  }
                  const uploadData4 = await uploadRes4.json();
                  photoUrl4 = uploadData4.photoUrl;
                  }
                  let photoUrl5 = "";
if (photoFile5) {
  const photoData5 = new FormData();
  photoData5.append("photo", photoFile5);
  const uploadRes5 = await fetch("/api/upload-photo", {
    method: "POST",
    body: photoData5,
  });
  if (!uploadRes5.ok) {
    setMessage("Artwork Photo 5 could not be uploaded.");
    return;
  }
  const uploadData5 = await uploadRes5.json();
  photoUrl5 = uploadData5.photoUrl;
}
  if (form.upgradePackage === "FREE") {
const res = await fetch("/api/shows", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...form,
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
  }),
});

  

  if (res.ok) {
    setMessage("Your art show has been saved successfully.");
  } else {
    setMessage("Error saving show. Please check the required fields.");
  }

  return;
}
localStorage.setItem(
  "pendingShowForm",
  JSON.stringify({
    ...form,
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
  })
);
const checkoutRes = await fetch("/api/checkout", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    upgradePackage: form.upgradePackage,
  }),
});

const checkoutData = await checkoutRes.json();

if (checkoutRes.ok && checkoutData.url) {
  window.location.href = checkoutData.url;
} else {
  setMessage("Unable to start payment. Please try again.");
}
  }

  return (
    <main style={{ padding: 40, maxWidth: 700, margin: "0 auto" }}>
      <h1>Register Your Art Show</h1>

      <p>
        Registration is free. You can update details later as your plans develop.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input required placeholder="Show Name" onChange={(e) => setForm({ ...form, showName: e.target.value })} />

        <input required placeholder="Artist Name" onChange={(e) => setForm({ ...form, artistName: e.target.value })} />

        <input required type="email" placeholder="Email Address" onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input required placeholder="Country" onChange={(e) => setForm({ ...form, county: e.target.value })} />

        <input required placeholder="State / Province / Region" onChange={(e) => setForm({ ...form, state: e.target.value })} />

        <input required placeholder="City / Town" onChange={(e) => setForm({ ...form, town: e.target.value })} />

        <select required onChange={(e) => setForm({ ...form, mainMedium: e.target.value })}>
          <option value="">Select Main Art Type</option>
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
          <option value="Performance Art">Performance Art</option>
          <option value="Other">Other</option>
        </select>

        <label>Start Date</label>
        <input type="date" onChange={(e) => setForm({ ...form, startDate: e.target.value })} />

        <label>End Date</label>
        <input type="date" onChange={(e) => setForm({ ...form, endDate: e.target.value })} />

        <input placeholder="Show Hours, example: 10 AM - 4 PM" onChange={(e) => setForm({ ...form, showHours: e.target.value })} />

        <textarea placeholder="Describe your show" rows={5} onChange={(e) => setForm({ ...form, description: e.target.value })} />
         <label>Photo of Your Art</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  }}
/>
{photoPreview && (
  <img
    src={photoPreview}
    alt="Selected artwork preview"
    style={{
      maxWidth: "300px",
      maxHeight: "300px",
      objectFit: "contain",
      marginTop: "10px",
      display: "block",
    }}
  />
)}
<p>Free registration includes one photo.</p>
{(form.upgradePackage === "LINK_PACKAGE" ||
  form.upgradePackage === "COMPLETE_PACKAGE") && (
  <div
  id="links-section"
  style={{
    display: "grid",
    gap: "12px",
    scrollMarginTop: "20px",
  }}
>
  
      <label>Website Link</label> 
       <input placeholder="Website Link (optional)" onChange={(e) => setForm({ ...form, website: e.target.value })} />

        <label>Instagram Link</label>
        <input placeholder="Instagram Link (optional)" onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
        <label>Facebook Link</label>
        <input placeholder="Facebook Link (optional)" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
 
  <label>TikTok Link</label>
  <input placeholder="TikTok Link (optional)" value={form.tiktok} onChange={(e) => setForm({ ...form, tiktok: e.target.value })} />
  <label>Twitter / X Link</label>
  <input placeholder="Twitter / X Link (optional)" value={form.xTwitter} onChange={(e) => setForm({ ...form, xTwitter: e.target.value })} />
  <label>Online Store Link</label>
  <input placeholder="Online Store Link (optional)" value={form.onlineStore} onChange={(e) => setForm({ ...form, onlineStore: e.target.value })} />
  <label>Video Link</label>
  <input placeholder="Video Link (optional)" value={form.videoLink} onChange={(e) => setForm({ ...form, videoLink: e.target.value })} />
  <label>Gallery or Studio Link</label>
  <input placeholder="Gallery or Studio Link (optional)" value={form.galleryStudioLink} onChange={(e) => setForm({ ...form, galleryStudioLink: e.target.value })} />
  <label>Email for Contact Button</label>
  <input placeholder="Email for Contact Button (optional)" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
  <label>Mailing-List Signup Link</label>
  <input placeholder="Mailing-List Signup Link (optional)" value={form.mailingListLink} onChange={(e) => setForm({ ...form, mailingListLink: e.target.value })} />
  </div>
)}

{(form.upgradePackage === "SHOWCASE_PACKAGE" ||
  form.upgradePackage === "COMPLETE_PACKAGE") && (
  <div
  id="showcase-section"
  style={{
    display: "grid",
    gap: "12px",
    scrollMarginTop: "20px",
  }}
>
  <label>Artwork Photo 1</label>
  <input
  type="file"
  accept="image/*"
  onChange={(e) => setArtistPhotoFile(e.target.files?.[0] || null)}
  />
  <label>Artwork Photo 2</label>
  <input type="file" accept="image/*" 
  onChange={(e) => setPhotoFile2(e.target.files?.[0] || null)}
  />
  <label>Artwork Photo 3</label>
  <input type="file" accept="image/*" 
  onChange={(e) => setPhotoFile3(e.target.files?.[0] || null)}
  />
  <label>Artwork Photo 4</label>
  <input type="file" accept="image/*" 
  onChange={(e) => setPhotoFile4(e.target.files?.[0] || null)}
  />
  <label>Artwork Photo 5</label>
  <input type="file" accept="image/*" 
  onChange={(e) => setPhotoFile5(e.target.files?.[0] || null)}
/>
<label>Artist Bio</label>
<textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  rows={6}
  placeholder="Type or paste your artist bio here."
/>

<label>Classes</label>
<textarea
  value={classes}
  onChange={(e) => setClasses(e.target.value)}
  rows={5}
  placeholder="Describe classes or workshops you offer."
/>

<label>Services</label>
<textarea
  value={services}
  onChange={(e) => setServices(e.target.value)}
  rows={5}
  placeholder="Describe services you offer."
/>

<label>Commissions</label>
<textarea
  value={commissions}
  onChange={(e) => setCommissions(e.target.value)}
  rows={5}
  placeholder="Describe commissioned work you accept."
/>

<label>Upcoming Shows</label>
<textarea
  value={upcomingShows}
  onChange={(e) => setUpcomingShows(e.target.value)}
  rows={5}
  placeholder="List your upcoming shows, exhibitions, or events."
/>
  </div>
  )}

<div style={{ marginTop: 20, marginBottom: 16 }}>
  <h2 style={{ fontSize: 26, marginBottom: 6 }}>Choose Your Registration</h2>
  <p style={{ marginTop: 0, marginBottom: 20 }}>Register free, or upgrade your listing to help more people discover you and your art.</p>

  <p>
    <strong>Free Registration — $0</strong><br />
    Basic show listing in the World's Largest Art Show.
  </p>

  <p>
    <strong>Artist Link Package — $5</strong><br />
    Add links to your website, social media, online store, videos,
    contact information, and other places visitors can find your work.
  </p>

  <p>
    <strong>Artist Showcase Package — $5</strong><br />
    Add enhanced artist information, images, gallery features, bio,
    classes, services, commissions, and upcoming shows.
  </p>

  <p>
    <strong>Complete Artist Package — $8</strong><br />
    Includes both the Artist Link Package and Artist Showcase Package.
  </p>
</div>
<p style={{ fontSize: 18, fontWeight: "bold", marginTop: 22, marginBottom: 8 }}>
  Click your choice:
</p>
<div style={{ display: "grid", gap: 12 }}>
  <button
    type="button"
    onClick={() => setForm({ ...form, upgradePackage: "FREE" })}
    style={{
  padding: "14px 18px",
  fontSize: 17,
  fontWeight: "bold",
  border: "2px solid #111827",
  borderRadius: 8,
  background: form.upgradePackage === "FREE" ? "#111827" : "white",
  color: form.upgradePackage === "FREE" ? "white" : "#111827",
  cursor: "pointer",
}}
  >
    Free Registration — $0
  </button>

  <button
    type="button"
    onClick={() => {
  setForm({ ...form, upgradePackage: "LINK_PACKAGE" });
  setTimeout(() => {
    document.getElementById("links-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);
}}
    style={{
  padding: "14px 18px",
  fontSize: 17,
  fontWeight: "bold",
  border: "2px solid #111827",
  borderRadius: 8,
  background: form.upgradePackage === "LINK_PACKAGE" ? "#111827" : "white",
  color: form.upgradePackage === "LINK_PACKAGE" ? "white" : "#111827",
  cursor: "pointer",
}}
    
  >
    Artist Link Package — $5
  </button>

  <button
    type="button"
    onClick={() => {
  setForm({ ...form, upgradePackage: "SHOWCASE_PACKAGE" });
  setTimeout(() => {
    document.getElementById("showcase-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);
}}
    style={{
  padding: "14px 18px",
  fontSize: 17,
  fontWeight: "bold",
  border: "2px solid #111827",
  borderRadius: 8,
  background: form.upgradePackage === "SHOWCASE_PACKAGE" ? "#111827" : "white",
  color: form.upgradePackage === "SHOWCASE_PACKAGE" ? "white" : "#111827",
  cursor: "pointer",
}}
  >
    Artist Showcase Package — $5
  </button>

  <button
    type="button"
    onClick={() => setForm({ ...form, upgradePackage: "COMPLETE_PACKAGE" })}
    style={{
  padding: "14px 18px",
  fontSize: 17,
  fontWeight: "bold",
  border: "2px solid #111827",
  borderRadius: 8,
  background: form.upgradePackage === "COMPLETE_PACKAGE" ? "#111827" : "white",
  color: form.upgradePackage === "COMPLETE_PACKAGE" ? "white" : "#111827",
  cursor: "pointer",
}}
  >
    Complete Artist Package — $8 — BEST VALUE
  </button>
</div>

        <button type="submit" style={{ padding: 14, fontWeight: "bold" }}>
          Register My Art Show
        </button>
      </form>

      {message && (
  <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
    <p>{message}</p>

    {message.includes("saved successfully") && (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
    </main>
  );
}