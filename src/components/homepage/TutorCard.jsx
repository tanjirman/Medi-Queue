"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function TutorCard({ tutor }) {
  const totalSlot = Number(tutor?.totalSlot ?? 0);

  const sessionDateValue =
    tutor?.sessionDate || tutor?.sessionStartDate;

  const targetSessionDate = sessionDateValue
    ? new Date(sessionDateValue)
    : null;

  const currentDate = new Date();

  const isBookingAvailableYet = targetSessionDate
    ? currentDate >= targetSessionDate
    : true;

  const hasSlotsAvailable = totalSlot > 0;

  const isAvailable = isBookingAvailableYet && hasSlotsAvailable;

  const availability =
    typeof tutor.availableDays === "string"
      ? tutor.availableDays
      : "Flexible hours";

  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all">
      
      {/* IMAGE */}
      <div className="relative h-52 w-full">
        <Image
          src={tutor.photo}
          alt={tutor.name}
          fill
          className="object-cover"
        />

        {/* STATUS */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
              isAvailable
                ? "bg-emerald-500 text-white border-emerald-300"
                : "bg-rose-500 text-white border-rose-300"
            }`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </span>
        </div>

        {/* PRICE */}
        <div className="absolute bottom-3 right-3">
          <span className="text-xs bg-black/70 text-white px-2 py-1 rounded">
            ${tutor.price}/hr
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {tutor.name}
        </h2>

        <p className="text-xs uppercase font-semibold text-cyan-500">
          {tutor.subject}
        </p>

        {/* INFO */}
        <div className="space-y-2 text-xs text-default-500">
          <div className="flex items-center gap-2">
            <FaClock />
            {availability}
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            {tutor.location || "Remote"}
          </div>

          <div>
            {hasSlotsAvailable
              ? `${totalSlot} slots left`
              : "No slots left"}
          </div>
        </div>

        {/* BUTTON */}
        <Link href={`/tutors/${tutor._id}`}>
          <Button className="w-full mt-3 bg-slate-900 text-white hover:bg-cyan-600">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}