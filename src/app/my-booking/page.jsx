"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import { Spinner, Button } from "@heroui/react";
import { CancelBookingModal } from "@/components/CancleBookingModal";
// import { CancelBookingModal } from "@/components/CancelBookingModal";

export default function MyBookingPage() {

  useEffect(() => {
    document.title = "My-booking | Tutor Booking";
  }, []);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  // Load bookings
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${user.email}`
        );

        const data = await res.json();

        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Loading State
  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Not Logged In
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-black text-red-500">
            Access Denied
          </h2>

          <p className="mt-2 text-default-500">
            Please login first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen px-4 py-24 bg-slate-50 dark:bg-black">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-black text-black dark:text-white">
              My Booked Sessions
            </h1>

            <p className="text-default-500 mt-2">
              Manage all your booked tutor sessions here.
            </p>
          </div>

          {/* Empty State */}
          {bookings.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-16 border border-black/5 dark:border-white/10 text-center shadow-sm">
              <h3 className="text-2xl font-black text-black dark:text-white">
                No Bookings Found
              </h3>

              <p className="mt-3 text-default-500">
                You have not booked any tutor sessions yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-[32px] border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">

              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="text-left px-6 py-5 text-sm font-black uppercase tracking-wider">
                      Tutor
                    </th>

                    <th className="text-left px-6 py-5 text-sm font-black uppercase tracking-wider">
                      Student
                    </th>

                    <th className="text-left px-6 py-5 text-sm font-black uppercase tracking-wider">
                      Email
                    </th>

                    <th className="text-left px-6 py-5 text-sm font-black uppercase tracking-wider">
                      Status
                    </th>

                    <th className="text-left px-6 py-5 text-sm font-black uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-t border-black/5 dark:border-white/5"
                    >
                      {/* Tutor */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">

                          {booking.tutorImage ? (
                            <Image
                              src={booking.tutorImage}
                              alt={booking.tutorName}
                              width={60}
                              height={60}
                              className="rounded-2xl object-cover border border-black/10"
                            />
                          ) : (
                            <div className="w-[60px] h-[60px] rounded-2xl bg-cyan-500 flex items-center justify-center text-white font-black text-xl">
                              {booking.tutorName
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div>
                            <h3 className="font-black text-black dark:text-white">
                              {booking.tutorName}
                            </h3>

                            <p className="text-sm text-cyan-600 font-semibold">
                              {booking.subject}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Student */}
                      <td className="px-6 py-5">
                        <div>
                          <h4 className="font-bold text-black dark:text-white">
                            {booking.studentName}
                          </h4>

                          <p className="text-sm text-default-500">
                            {booking.phone}
                          </p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-sm font-medium text-default-600">
                        {booking.email}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                            booking.status === "Cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        {booking.status === "Cancelled" ? (
                          <span className="text-red-500 text-sm font-bold">
                            Cancelled
                          </span>
                        ) : (
                          <Button
                            color="danger"
                            className="font-bold rounded-xl"
                            onPress={() =>
                              setSelectedBooking(booking)
                            }
                          >
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>
      </section>

      {/* Cancel Modal */}
      {selectedBooking && (
        <CancelBookingModal
          booking={selectedBooking}
          setBookings={setBookings}
          onClose={() =>
            setSelectedBooking(null)
          }
        />
      )}
    </>
  );
}