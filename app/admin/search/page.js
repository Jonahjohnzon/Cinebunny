"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'nextjs-toploader/app';
import { getAdminCookies } from "@/app/getCookie";


export default function SearchSeriesPage() {
  const router = useRouter()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show ,setShow] = useState(false)

  const GET = async () => {
    const cookie = await getAdminCookies();
    if (cookie) {
      setShow(true);
    } else {
      router.push("/");
    }
  };
  
  
  useEffect(()=>{
      GET()
  })

  // 🔑 debounce timer
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setMessage("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/search?title=${query}`);
        const data = await res.json();

        if (res.ok) {
          setResults(data.series);
          if (data.series.length === 0) {
            setMessage("No series found.");
          } else {
            setMessage("");
          }
        } else {
          setMessage(data.message || "Error searching series.");
        }
      } catch (err) {
        setMessage(`❌ Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }, 500); // ⏳ waits 0.5s after typing

    return () => clearTimeout(timer); // cleanup on new keystroke
  }, [query]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/deleteseries?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Series deleted successfully!");
        setResults(results.filter((s) => s._id !== id));
      } else {
        setMessage(`❌ ${data.message || "Failed to delete series"}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }

    // clear message after 4 seconds
    setTimeout(() => setMessage(""), 4000);
  };

  if(!show)
    return <div></div>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-black shadow-md rounded-lg my-5">
        <div className=" flex justify-between font-semibold mb-5">
            <div className=" text-white bg-black py-2 rounded-md hover:bg-blue-900 cursor-pointer px-4" onClick={()=>router.push(`/admin/createseries`)}>Add Series</div>
            <div className=" text-white bg-black py-2 rounded-md hover:bg-blue-900 cursor-pointer px-4" onClick={()=>router.push(`/`)}>Home</div>
        </div>
      <h1 className="text-2xl font-bold mb-4">Search Series</h1>

      {/* Search bar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Start typing series title..."
        className="w-full border p-2 rounded mb-4"
      />

      {loading && <p className="text-gray-500">Searching...</p>}
      {message && (
        <p className="mb-4 text-center font-semibold text-black">{message}</p>
      )}

      {/* Results */}
      <div className="space-y-4">
        {results.map((series) => (
          <div
            key={series._id}
            className="p-4 border rounded-lg shadow flex flex-col gap-2"
          >
            <h2 className="text-xl font-bold">{series.title}</h2>
            <p className="text-sm text-gray-500">
              Year: {series.releaseYear} | Seasons: {series.seasons}
            </p>

                    <div className="flex gap-2">
              {/* Delete button */}
              <button
                onClick={() => handleDelete(series._id, series.title)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>

              {/* Add Episodes button */}
              <div
              onClick={()=>router.push(`/admin/addepisode/${series._id}`)}
                className="px-3 py-1 cursor-pointer bg-green-600 text-white rounded"
              >
                + Add Episodes
              </div>

              {/* Edit button */}
              <div
                onClick={()=>router.push(`/admin/editseries/${series._id}`)}
                className="px-3 py-1 cursor-pointer bg-yellow-600 text-white rounded"
              >
                Edit
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
