"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "nextjs-toploader/app";
import { getAdminCookies } from "@/app/getCookie";

const SeriesEditSchema = Yup.object().shape({
  title: Yup.string(),
  status: Yup.string().oneOf(["ongoing", "completed", "coming soon"]),
  description: Yup.string(),
  genre: Yup.array().of(Yup.string()),
  releaseYear: Yup.number().min(1900).max(new Date().getFullYear()),
  seasons: Yup.number().min(1),
  Image: Yup.string().url("Must be a valid URL"),
  coverImage: Yup.string().url("Must be a valid URL"),
  rating: Yup.number().min(0).max(10),
});

export default function Main({ id }) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();

  const GET = async () => {
    const cookie = await getAdminCookies();
    if (cookie) {
      setShow(true);
    } else {
      router.push("/");
    }
  };

  const fetchSeries = async () => {
    try {
      const res = await fetch(`/api/getseries?id=${id}`);
      const data = await res.json();
      if (res.ok && data.series) {
        setInitialValues({
          title: data.series.title || "",
          status: data.series.status || "ongoing",
          description: data.series.description || "",
          genre: data.series.genre?.length ? data.series.genre : [""],
          releaseYear: data.series.releaseYear || "",
          seasons: data.series.seasons || 1,
          Image: data.series.Image || "",
          coverImage: data.series.coverImage || "",
          rating: data.series.rating || "",
        });
      } else {
        setMessage(`❌ Error: ${data.message || "Series not found"}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  useEffect(() => {
    GET();
    fetchSeries();
  }, [id]);

  if (!show) return <div></div>;
  if (!initialValues) return <div className="text-center p-6">Loading series info...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-black my-5 bg-white shadow-md rounded-lg">
      <div
        className="text-white top-7 z-50 left-7 text-4xl cursor-pointer absolute"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack />
      </div>
      <h1 className="text-2xl font-bold mb-4">Edit Series</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={SeriesEditSchema}
        onSubmit={async (values) => {
          try {
            const updates = {};
            for (let key in values) {
              if (values[key] !== initialValues[key]) {
                updates[key] = values[key];
              }
            }

            const res = await fetch(`/api/admin/editseries?id=${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updates),
            });

            const data = await res.json();
            if (res.ok) {
              setMessage("✅ Series updated successfully!");
            } else {
              setMessage(`❌ Error: ${data.message || "Failed to update series"}`);
            }
            setTimeout(() => {
              setMessage("");
            }, 2000);
          } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
            setTimeout(() => {
              setMessage("");
            }, 2000);
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

            {/* Status */}
            <div>
              <label className="block font-semibold">Status</label>
              <Field
                as="select"
                name="status"
                className="w-full border p-2 rounded bg-white"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="coming soon">Coming Soon</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
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
              className="w-full py-2 bg-yellow-600 text-white rounded font-bold"
            >
              Update Series
            </button>
          </Form>
        )}
      </Formik>

      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
  );
}
