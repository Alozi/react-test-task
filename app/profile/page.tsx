"use client";

import { useState, useEffect } from "react";
import type { Profile } from "../types/profile";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    desiredJobTitle: "",
    aboutMe: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          My Profile
        </h1>

        {profile.name === "" ? (
          <div className="text-center space-y-4">
            <h2 className="text-gray-700 text-lg">
              No profile info available 😔
            </h2>
            <p className="text-gray-500">
              Please fill out your profile on the{" "}
              <Link
                href="/create-profile"
                className="text-blue-600 hover:underline font-medium"
              >
                Create Profile page
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {profile.name}
              </h2>
              <Link
                href="/create-profile"
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </div>
            <p className="text-gray-600">
              <span className="font-medium">Desired Job Title:</span>{" "}
              {profile.desiredJobTitle}
            </p>
            <div>
              <h3 className="font-medium text-gray-700 mb-1">About Me:</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {profile.aboutMe}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
