"use client";

import { useState, useEffect } from "react";
import { Button, Spinner } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; 
import { UpdateTutorModal } from "@/components/UpdateTutorModal";
import { DeleteTutorModal } from "@/components/DeleteTutorModal";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MyTutorsPage() {

  useEffect(() => {
    document.title = "My-Tutors | Tutor Booking";
  }, []);

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeTutor, setActiveTutor] = useState(null);
  const [modalType, setModalType] = useState(null); 

  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchMyTutors = async () => {
      try {
        setLoading(true);
        
        // 1. Get the secure token for the request
        const { data: tokenData, error } = await authClient.token();
        if (error || !tokenData?.token) {
          throw new Error("Authentication session expired.");
        }

        // 2. Fetch with Authorization header
        const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/tutors?email=${userEmail}`,
  {
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  }
);

        if (res.ok) {
          const data = await res.json();
          setTutors(data);
        } else {
          toast.error("Failed to load your listings.");
        }
      } catch (error) {
        console.error("Failed to fetch tutor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTutors();
  }, [userEmail]);

  if (isAuthPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Spinner size="lg" color="cyan" />
        <p className="text-sm text-default-400 font-medium">Verifying your secure session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h3 className="text-xl font-bold text-rose-500">Access Restricted</h3>
        <p className="text-sm text-default-400 mt-1 max-w-xs">
          Please log into your account to manage your custom tutor listings.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] max-w-6xl mx-auto px-6 py-12 text-left">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">
          My Tutor Listings
        </h1>
        <p className="text-sm text-default-400 mt-1">
          Connected account: <span className="text-cyan-600 font-bold">{userEmail}</span>
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Spinner size="lg" color="cyan" />
          <p className="text-sm text-default-400 font-medium">Syncing database collections...</p>
        </div>
      ) : tutors.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-black/5 dark:border-white/5 rounded-[32px] bg-slate-50 dark:bg-slate-900/30">
          <h3 className="text-lg font-bold text-default-700">No Listings Connected</h3>
          <p className="text-sm text-default-400 mt-1 max-w-md mx-auto px-4">
            No tutor records found matching <span className="font-semibold text-rose-500">{userEmail}</span>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="flex items-center justify-between p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/5 shadow-sm">
              <div className="flex items-center gap-4">
                {tutor.image && (
                  <Image src={tutor.image} alt={tutor.name} height={200} width={300} className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/20" />
                )}
                <div>
                  <h3 className="font-black text-lg text-black dark:text-white leading-tight">{tutor.name}</h3>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">{tutor.specialty || tutor.subject}</p>
                  <p className="text-xs text-default-400 mt-0.5">Rate: <span className="font-bold text-default-600">${tutor.price}</span>/hr</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="flat" onClick={() => { setActiveTutor(tutor); setModalType("edit"); }} className="bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-xs px-3 h-9">
                  <BiEdit /> Edit
                </Button>
                <Button variant="flat" onClick={() => { setActiveTutor(tutor); setModalType("delete"); }} className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-xl font-bold text-xs px-3 h-9">
                  <FiTrash2 /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalType === "edit" && <UpdateTutorModal tutor={activeTutor} setTutors={setTutors} onClose={() => setModalType(null)} />}
      {modalType === "delete" && <DeleteTutorModal tutor={activeTutor} setTutors={setTutors} onClose={() => setModalType(null)} />}
    </div>
  );
}