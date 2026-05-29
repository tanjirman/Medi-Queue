"use client";

import { useState } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import { FaUserGraduate, FaClock, FaDollarSign } from "react-icons/fa";
import toast from "react-hot-toast";
import { Router } from "next/router";

export function BookingModal({
  studentName,
  studentEmail,
  tutorId,
  tutorName,
  price,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const bookings = Object.fromEntries(formData.entries());

    const payload = {
      tutorId,
      tutorName,
      studentName,
      studentEmail,
      price,
      contact: bookings.contact,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("🎉 Booking Confirmed!", {
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
          },
        });

        e.target.reset();
          Router.push("/my-booking");

      } else {
        toast.error("❌ Booking failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl">
        Book Session
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-xl rounded-2xl">
            <Modal.Header>
              <Modal.Heading>Book Your Session</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface className="p-5 rounded-xl space-y-4 bg-white dark:bg-gray-900">

                <form
                  id="booking-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Tutor */}
                  <div>
                    <label className="text-sm font-medium">Tutor</label>
                    <input
                      value={tutorName}
                      disabled
                      className="w-full p-3 rounded-xl border bg-gray-100"
                    />
                  </div>

                  {/* Student */}
                  <div>
                    <label className="text-sm font-medium">Student</label>
                    <input
                      value={studentName}
                      disabled
                      className="w-full p-3 rounded-xl border bg-gray-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      value={studentEmail}
                      disabled
                      className="w-full p-3 rounded-xl border bg-gray-100"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <input
                      value={price}
                      disabled
                      className="w-full p-3 rounded-xl border bg-gray-100"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="text-sm font-medium">Contact</label>
                    <input
                      name="contact"
                      required
                      placeholder="Enter phone number"
                      className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-600 text-white rounded-xl"
                  >
                    {loading ? "Booking..." : "Confirm Booking"}
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}