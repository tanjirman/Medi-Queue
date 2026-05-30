"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import { FaMapMarkerAlt, FaClock, FaTimes } from "react-icons/fa";



export default function TutorsPage() {
  useEffect(() => {
    document.title = "Tutors | Tutor Booking";
  }, []);

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutors?${params.toString()}`
        );

        if (!res.ok) throw new Error("Failed to fetch tutors");

        const data = await res.json();
        setTutors(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(fetchTutors, 300);
    return () => clearTimeout(t);
  }, [search, sort]);

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutors..."
            className="border p-3 rounded-xl w-full bg-white dark:bg-slate-900"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-3 rounded-xl bg-white dark:bg-slate-900"
          >
            <option value="">Default Sorting</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>

          {(search || sort) && (
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              onClick={() => {
                setSearch("");
                setSort("");
              }}
            >
              <FaTimes />
            </Button>
          )}
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Spinner size="lg" label="Loading tutors..." />
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No tutors found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            {tutors.map((tutor) => {
              const totalSlot = Number(tutor?.totalSlot ?? 0);
              const sessionDate = tutor?.sessionStartDate
                ? new Date(tutor.sessionStartDate)
                : null;

              const isAvailable =
                (sessionDate ? new Date() >= sessionDate : true) &&
                totalSlot > 0;

              return (
                <div
                  key={tutor._id}
                  className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden shadow hover:shadow-lg transition"
                >

                  {/* IMAGE */}
                  <div className="relative h-52 w-full">
                    <Image
                      src={tutor.photo}
                      alt={tutor.name}
                      fill
                      className="object-cover"
                    />

                    <span
                      className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white font-bold ${
                        isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isAvailable ? "Available" : "Not Available"}
                    </span>

                    <span className="absolute bottom-3 right-3 text-xs bg-black/70 text-white px-2 py-1 rounded">
                      ${tutor.price}/hr
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-bold">
                      {tutor.name}
                    </h2>

                    <p className="text-xs text-cyan-600 font-bold uppercase">
                      {tutor.subject}
                    </p>

                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <FaClock />
                        {tutor.availableDays || "Flexible"}
                      </div>

                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        {tutor.location || "Remote"}
                      </div>

                      <div>
                        {totalSlot > 0
                          ? `${totalSlot} slots left`
                          : "No slots left"}
                      </div>
                    </div>

                    <Link href={`/tutors/${tutor._id}`}>
                      <Button className="w-full mt-3">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}