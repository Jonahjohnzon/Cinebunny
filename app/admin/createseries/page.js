"use client";

import { useState,useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from 'nextjs-toploader/app';
import { getAdminCookies } from "@/app/getCookie";

// ✅ Yup validation schema
const SeriesSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("description is requried"),
  genre: Yup.array().of(Yup.string().required("Genre is required")),
  releaseYear: Yup.number().min(1900).max(new Date().getFullYear()).required("date is requried"),
  seasons: Yup.number().min(1).default(1).required("season is requried"),
  Image: Yup.string().url("Must be a valid URL").required("image is requried"),
  coverImage: Yup.string().url("Must be a valid URL").required("image is requried"),
  rating: Yup.number().min(0).max(10).required("Rating is requried"),
});



export default function CreateSeriesPage() {
    const router = useRouter()
  const [message, setMessage] = useState("");
  const [show, setshow] = useState(false)
  const GET = async () => {
    const cookie = await getAdminCookies();
    if (cookie) {
      setshow(true);
    } else {
      router.push("/");
    }
  };
  
  
  useEffect(()=>{
      GET()
  })

  if(!show)
    return <div></div>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white my-5 text-black shadow-md rounded-lg">
        <div className=' top-7 z-50 left-7 text-white text-4xl cursor-pointer absolute' onClick={()=>{
                        router.back()
                      }}><IoArrowBack /></div>
      <h1 className="text-2xl font-bold mb-4">Create a New Series</h1>

      <Formik
        initialValues={{
          title: "",
          description: "",
          genre: [""],
          releaseYear: "",
          seasons: 1,
          Image: "",
          coverImage: "",
          rating: "",
        }}
        validationSchema={SeriesSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await fetch("/api/admin/createseries", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.ok) {
              setMessage("✅ Series created successfully!");
              resetForm();
            } else {
              setMessage(`❌ Error: ${data.message || "Failed to create series"}`);
            }
            setTimeout(() => {
             setMessage("");}, 2000);
          } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
              setTimeout(() => {
             setMessage("");}, 2000);
          }
        }}
      >
        {({ values }) => (
          <Form className="space-y-4">
            {/* Title */}
             <div>
    <label className="block font-semibold">Title</label>
    <Field name="title" className="w-full border p-2 rounded" />
    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
  </div>

  {/* Description */}
  <div>
    <label className="block font-semibold">Description</label>
    <Field name="description" as="textarea" className="w-full border p-2 rounded" />
    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
  </div>

  {/* Genres */}
  <div>
    <label className="block font-semibold">Genres</label>
    <FieldArray
      name="genre"
      render={(arrayHelpers) => (
        <div className="space-y-2">
          {values.genre.map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex gap-2">
                <Field name={`genre.${index}`} className="flex-1 border p-2 rounded" />
                <button
                  type="button"
                  onClick={() => arrayHelpers.remove(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  ✕
                </button>
              </div>
              <ErrorMessage
                name={`genre.${index}`}
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => arrayHelpers.push("")}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Genre
          </button>
        </div>
      )}
    />
  </div>

  {/* Release Year */}
  <div>
    <label className="block font-semibold">Release Year</label>
    <Field name="releaseYear" type="number" className="w-full border p-2 rounded" />
    <ErrorMessage name="releaseYear" component="div" className="text-red-500 text-sm" />
  </div>

  {/* Seasons */}
  <div>
    <label className="block font-semibold">Seasons</label>
    <Field name="seasons" type="number" className="w-full border p-2 rounded" />
    <ErrorMessage name="seasons" component="div" className="text-red-500 text-sm" />
  </div>

  {/* Images */}
  <div>
    <label className="block font-semibold">Image URL</label>
    <Field name="Image" className="w-full border p-2 rounded" />
    <ErrorMessage name="Image" component="div" className="text-red-500 text-sm" />
  </div>

  <div>
    <label className="block font-semibold">Cover Image URL</label>
    <Field name="coverImage" className="w-full border p-2 rounded" />
    <ErrorMessage name="coverImage" component="div" className="text-red-500 text-sm" />
  </div>

  {/* Rating */}
  <div>
    <label className="block font-semibold">Rating</label>
    <Field name="rating" type="number" step="0.1" className="w-full border p-2 rounded" />
    <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
  </div>
          

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded font-bold"
            >
              Create Series
            </button>
          </Form>
        )}
      </Formik>

      {message && <p className="mt-4 text-center text-black font-semibold">{message}</p>}
    </div>
  );
}
