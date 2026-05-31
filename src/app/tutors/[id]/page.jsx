"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Image from "next/image";

import { Button, Spinner } from "@heroui/react";

import toast from "react-hot-toast";

// import BookingModal from "@/components/BookingModal";
import { authClient } from "@/lib/auth-client";
import { BookingModal } from "@/components/BookingModal";
//import BookingModal from "@/components/BookingModal";
//import { BookingModal } from "@/components/BookingModal";



export default function TutorDetailsPage() {

  useEffect(() => {
    document.title = "Tutor-Details | Tutor Booking";
  }, []);

  const { id } = useParams();

  const [tutor, setTutor] = useState(null);

  //console.log(tutor);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);

        // ================= GET JWT TOKEN =================

        const { data, error } =
          await authClient.token();

        if (error) {
          console.error(error);

          toast.error("Authentication failed");

          return;
        }
       

        const token = data.token;
//  console.log(token)
        // ================= FETCH PROTECTED ROUTE =================

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
          {
            method: "GET",

            headers: {
              'content-type' : 'application/json',
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch tutor"
          );
        }

        const result = await res.json();

        setTutor(result);
      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to load tutor details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTutor();
    }
  }, [id]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner label="Loading tutor details..." />
      </div>
    );
  }

  // ================= NOT FOUND =================

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Tutor not found
      </div>
    );
  }

  // ================= VALIDATION =================

  const totalSlot = Number(
    tutor?.totalSlot || 0
  );

  const sessionDate = new Date(
    tutor?.sessionStartDate
  );

  const today = new Date();

  const isDateValid =
    today >= sessionDate;

  const hasSlots = totalSlot > 0;

  const canBook =
    isDateValid && hasSlots;

  // ================= BOOKING HANDLER =================

  const handleBook = () => {
    if (!hasSlots) {
      return toast.error(
        "No available slots left"
      );
    }

    if (!isDateValid) {
      return toast.error(
        "Booking is not available yet for this tutor"
      );
    }

    setOpen(true);
  };

  
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

      {/* ================= HERO SECTION ================= */}

      <div className="grid md:grid-cols-2 gap-8 items-center">

        {/* ================= IMAGE ================= */}

        <div className="relative w-full h-[350px] rounded-2xl overflow-hidden border">

          <Image
            src={tutor.photo}
            alt={tutor.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            className="object-cover"
          />
        </div>

        {/* ================= INFO ================= */}

        <div className="space-y-4">

          <h1 className="text-3xl font-bold">
            {tutor.name}
          </h1>

          <p className="text-gray-500">
            {tutor.subject}
          </p>

         <div className="flex gap-3 flex-wrap text-sm">
  <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
    💰 ${tutor.price}/hr
  </span>

  <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
    📅 {tutor.availableDays}
  </span>

  <span
    className={`px-3 py-1 rounded-full ${
      hasSlots
        ? "bg-emerald-200 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-300"
        : "bg-rose-200 text-rose-900 dark:bg-rose-900/40 dark:text-rose-300"
    }`}
  >
    🎯 {totalSlot} slots left
  </span>
</div>
          <p className="text-sm text-gray-600">
            {tutor.experience}
          </p>

          {/* ================= STATUS ================= */}

          <div>
            {canBook ? (
              <span className="text-green-600 font-semibold">
                ● Available for booking
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                ● Not available
              </span>
            )}
          </div>

          {/* ================= BUTTON ================= */}

           <BookingModal 
           tutorId={tutor._id}
  tutorName={tutor.name}
  price={tutor.price}
  availableDays={tutor.availableDays}
  studentName={session?.user?.name || ""}
  studentEmail={session?.user?.email || ""}

  isDisabled={!canBook}

           />
        </div>
      </div>

      {/* ================= DETAILS SECTION ================= */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="p-5 border rounded-xl space-y-2">
          <h2 className="font-bold">
            Institution
          </h2>

          <p>{tutor.institution}</p>
        </div>

        <div className="p-5 border rounded-xl space-y-2">
          <h2 className="font-bold">
            Location
          </h2>

          <p>{tutor.location}</p>
        </div>

        <div className="p-5 border rounded-xl space-y-2">
          <h2 className="font-bold">
            Teaching Mode
          </h2>

          <p>{tutor.teachingMode}</p>
        </div>

        <div className="p-5 border rounded-xl space-y-2">
          <h2 className="font-bold">
            Session Start Date
          </h2>

          <p>
            {tutor.sessionStartDate}
          </p>
        </div>
      </div>
    </div>
  );
}