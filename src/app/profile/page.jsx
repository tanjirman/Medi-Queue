"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } =
    authClient.useSession();

  const [myTutors, setMyTutors] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadData = async () => {
      try {
        const email = session.user.email;

        const [
          userRes,
          tutorsRes,
          bookingsRes,
        ] = await Promise.all([
          fetch(
            `http://localhost:5000/users/${email}`
          ),
          fetch(
            `http://localhost:5000/tutors?email=${email}`
          ),
          fetch(
            `http://localhost:5000/bookings?email=${email}`
          ),
        ]);

        const userData =
          await userRes.json();

        const tutors =
          await tutorsRes.json();

        const bookings =
          await bookingsRes.json();

        setMyTutors(tutors);
        setMyBookings(bookings);

        setName(
          userData?.name ||
            session.user.name ||
            ""
        );

        setImage(
          userData?.image ||
            session.user.image ||
            ""
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [session?.user?.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(
        `http://localhost:5000/users/${session.user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            image,
            email: session.user.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update profile"
        );
      }

      alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 pt-36 pb-20">

      <div className="bg-base-100 rounded-3xl shadow-xl p-8">

        <div className="flex flex-col md:flex-row items-center gap-8">

          {image ? (
            <Image
              src={image}
              alt="profile"
              width={140}
              height={140}
              unoptimized
              className="rounded-full border-4 border-primary object-cover"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-primary text-white flex items-center justify-center text-5xl font-bold">
              {name?.charAt(0)}
            </div>
          )}

          <div>
            <h1 className="text-4xl font-black">
              {name}
            </h1>

            <p className="text-lg text-base-content/70 mt-2">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <div className="divider my-10">
          Edit Profile
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >
          <div>
            <label className="font-semibold">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Profile Image URL
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="input input-bordered w-full mt-2"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving
              ? "Updating..."
              : "Update Profile"}
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-primary text-white rounded-3xl p-10 shadow-xl">
          <h2 className="text-6xl font-black">
            {myTutors.length}
          </h2>

          <p className="text-xl mt-3">
            Tutors Added
          </p>
        </div>

        <div className="bg-secondary text-white rounded-3xl p-10 shadow-xl">
          <h2 className="text-6xl font-black">
            {myBookings.length}
          </h2>

          <p className="text-xl mt-3">
            Booking Sessions
          </p>
        </div>

      </div>
    </div>
  );
}