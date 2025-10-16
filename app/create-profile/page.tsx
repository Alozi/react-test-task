"use client";

import { useState, useEffect } from "react";
import type { Profile } from "../types/profile";

export default function CreateProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    desiredJobTitle: "",
    aboutMe: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h1 className="text-2xl font-semibold mb-6">Create Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Desired Job Title</label>
          <input
            type="text"
            name="desiredJobTitle"
            value={profile.desiredJobTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">About Me</label>
          <textarea
            name="aboutMe"
            value={profile.aboutMe}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </form>

      {saved && (
        <p className="mt-4 text-green-600">Profile saved successfully!</p>
      )}
    </div>
  );
}
