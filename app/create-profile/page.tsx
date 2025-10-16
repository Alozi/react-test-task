"use client";

import { useState, useEffect } from "react";
import type { Profile } from "../types/profile";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  desiredJobTitle: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  aboutMe: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function CreateProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleSubmit = (values: Profile) => {
    localStorage.setItem("userProfile", JSON.stringify(values));
    setSaved(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h1 className="text-2xl font-semibold mb-6">Create Your Profile</h1>
      <Formik
        initialValues={{
          name: profile?.name || "",
          desiredJobTitle: profile?.desiredJobTitle || "",
          aboutMe: profile?.aboutMe || "",
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <Field
              id="name"
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.name && touched.name ? (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            ) : null}
            <label className="block text-gray-700 mb-1" htmlFor="jobTitle">
              Desired Job Title
            </label>
            <Field
              id="jobTitle"
              type="text"
              name="desiredJobTitle"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.desiredJobTitle && touched.desiredJobTitle ? (
              <div className="text-red-500 text-sm mt-1">
                {errors.desiredJobTitle}
              </div>
            ) : null}
            <label className="block text-gray-700 mb-1" htmlFor="aboutMe">
              About Me
            </label>
            <Field
              id="aboutMe"
              type="text"
              name="aboutMe"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.aboutMe && touched.aboutMe ? (
              <div className="text-red-500 text-sm mt-1">{errors.aboutMe}</div>
            ) : null}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Profile
            </button>
          </Form>
        )}
      </Formik>
      {saved && (
        <p className="mt-4 text-green-600">Profile saved successfully!</p>
      )}
    </div>
  );
}
