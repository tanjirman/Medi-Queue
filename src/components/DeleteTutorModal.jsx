"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function DeleteTutorModal({
  tutor,
  setTutors,
  onClose,
}) {
  const [deleting, setDeleting] =
    useState(false);

  const router = useRouter();

  const { _id, name } = tutor || {};



  // =========================
  // DELETE FUNCTION
  // =========================

  const handleDelete = async () => {
  setDeleting(true);

  try {
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/tutors/${_id}`,
  {
    method: "DELETE",
    credentials: "include",
  }
);

    const data = await res.json();

    if (res.ok) {
      toast.success(
        "Tutor deleted successfully"
      );

      setTutors((prev) =>
        prev.filter(
          (item) => item._id !== _id
        )
      );

      onClose();
      router.refresh();
    } else {
      toast.error(
        data.message ||
          "Delete failed"
      );
    }
  } catch (err) {
    console.log(err);

    toast.error(
      "Something went wrong"
    );
  } finally {
    setDeleting(false);
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
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Delete Tutor?
              </AlertDialog.Heading>
            </AlertDialog.Header>



            {/* BODY */}
            <AlertDialog.Body className="text-left">
              <p className="text-sm leading-relaxed text-default-500">
                This will permanently delete{" "}
                <strong className="text-black dark:text-white">
                  {name}
                </strong>
                .
              </p>

              <p className="text-sm text-rose-500 mt-2 font-semibold">
                This action cannot be undone.
              </p>
            </AlertDialog.Body>



            {/* FOOTER */}
            <AlertDialog.Footer>
              <Button
                variant="tertiary"
                onClick={onClose}
                isDisabled={deleting}
                className="rounded-xl font-bold"
              >
                Cancel
              </Button>

              <Button
                isLoading={deleting}
                onClick={handleDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl px-5"
              >
                Delete
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}