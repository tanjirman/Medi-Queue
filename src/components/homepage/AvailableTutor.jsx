"use client";

import { useEffect, useState } from "react";
import TutorCard from "./TutorCard";
import { Spinner } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function AvailableTutor() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`,
        );

        const data = await res.json();

        // 🔥 SAFE FIX
        setTutors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Available Tutors</h2>

      {tutors.length === 0 ? (
        <p className="text-gray-500">No tutors found</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}

      <div className="mt-10 flex mx-auto justify-center">
        <Link href="/tutors">
          <Button
            size="lg"
            radius="full"
            className="bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8"
          >
            Explore All Tutors
          </Button>
        </Link>
      </div>
    </section>
  );
}
