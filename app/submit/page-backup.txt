"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({
    showName: "",
    artistName: "",
    county: "",
    state: "",
    town: "",
    plan: "FREE",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Saving...");

    const res = await fetch("/api/shows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Show saved successfully.");
    } else {
      setMessage("Error saving show.");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Submit Your Show</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        <input placeholder="Show Name" onChange={(e) => setForm({ ...form, showName: e.target.value })} />
        <input placeholder="Artist Name" onChange={(e) => setForm({ ...form, artistName: e.target.value })} />
        <input placeholder="Country" onChange={(e) => setForm({ ...form, county: e.target.value })} />
        <input placeholder="State" onChange={(e) => setForm({ ...form, state: e.target.value })} />
        <input placeholder="Town" onChange={(e) => setForm({ ...form, town: e.target.value })} />

        <select onChange={(e) => setForm({ ...form, plan: e.target.value })}>
          <option value="FREE">Free</option>
          <option value="FEATURED">Featured</option>
          <option value="PREMIUM">Premium</option>
        </select>

        <button type="submit">Save Show</button>
      </form>

      <p>{message}</p>
    </main>
  );
}