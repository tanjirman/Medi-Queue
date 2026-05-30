"use client";

import { useState } from "react";
import {
  AlertDialog,
  Button,
} from "@heroui/react";
import toast from "react-hot-toast";

export function CancelBookingModal({
  booking,
  setBookings,
  onClose,
}) {
  const [cancelling, setCancelling] =
    useState(false);

  const { _id, tutorName, subject } =
    booking || {};

  const handleCancel = async () => {
    setCancelling(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: "Cancelled",
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success(
          "Booking cancelled successfully!"
        );

        setBookings((prev) =>
          prev.map((item) =>
            item._id === _id
              ? {
                  ...item,
                  status: "Cancelled",
                }
              : item
          )
        );

        onClose();
      } else {
        toast.error(
          result.message ||
            "Failed to cancel booking"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <AlertDialog
      isOpen={true}
      onOpenChange={onClose}
    >
      <AlertDialog.Backdrop className="backdrop-blur-sm">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] rounded-[32px] bg-white dark:bg-slate-900 border border-black/5 shadow-2xl">

            <AlertDialog.CloseTrigger />

            {/* HEADER */}
            <AlertDialog.Header>
              <AlertDialog.Icon status="warning" />

              <AlertDialog.Heading>
                Cancel Booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            {/* BODY */}
            <AlertDialog.Body className="text-left">
              <p className="text-sm leading-relaxed text-default-500">
                Are you sure you want to
                cancel your booking with{" "}
                <strong className="text-black dark:text-white">
                  {tutorName}
                </strong>
                ?
              </p>

              <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                <p className="font-bold">
                  Tutor: {tutorName}
                </p>

                <p className="text-sm text-default-500">
                  Subject: {subject}
                </p>
              </div>

              <p className="text-sm text-amber-500 mt-3 font-semibold">
                This booking will be marked
                as cancelled.
              </p>
            </AlertDialog.Body>

            {/* FOOTER */}
            <AlertDialog.Footer>
              <Button
                variant="tertiary"
                onClick={onClose}
                isDisabled={cancelling}
                className="rounded-xl font-bold"
              >
                Keep Booking
              </Button>

              <Button
                isLoading={cancelling}
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-5"
              >
                Cancel Booking
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}