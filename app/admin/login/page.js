"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from 'nextjs-toploader/app';
import { state } from "@/app/store";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("Password is required"),
});

export default function AdminLoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await fetch("/api/loginadmin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.ok) {
              setMessage("✅ Login successful! Redirecting...");
              resetForm();
              state.log = true
              state.signUp = false
              state.role = "admin"
              setTimeout(() => {
                router.replace("/admin/search"); // redirect to admin home
              }, 1000);
            } else {
              setMessage(`❌ ${data.message || "Invalid credentials"}`);
            }
          } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
          }

          setTimeout(() => setMessage(""), 4000);
        }}
      >
        <Form className="space-y-4">
          <div>
            <label className="block font-semibold">Email</label>
            <Field name="email" className="w-full border p-2 rounded" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold">Password</label>
            <Field
              name="password"
              type="password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded cursor-default hover:bg-black font-bold"
          >
            Login
          </button>
        </Form>
      </Formik>

      {message && (
        <p className="mt-4 text-center font-semibold text-black">{message}</p>
      )}
    </div>
  );
}
