"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import NavLink from "./NavLink";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { authClient } from "@/lib/auth-client";
import { FaX } from "react-icons/fa6";
import { BiMenu } from "react-icons/bi";
//import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);

    const [mobileMenu, setMobileMenu] = useState(false);


  const user = session?.user || null;

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  if (isPending) {
    return (
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg">
          <span className="loading loading-spinner loading-md text-cyan-600"></span>
        </div>
      </div>
    );
  }
  

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav className="w-full max-w-8xl my-3 md:my-6 mx-2 md:mx-4 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 dark:border-white/10">

        {/* LOGO */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            Medi<span className="text-cyan-600">Queue</span>
          </Link>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8 text-sm font-black uppercase tracking-widest">

            <NavLink href="/">Home</NavLink>

            <NavLink href="/tutors">Tutors</NavLink>

            {user && (
              <>
              <div className="flex flex-row items-center whitespace-nowrap gap-4">
                <NavLink href="/add-tutor" >Add-Tutor</NavLink>

                <NavLink href="/my-tutors">My-Tutors</NavLink>

                <NavLink href="/my-booking">
                  My-Booking
                </NavLink>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
<div className="flex-1 flex justify-end items-center gap-3">

  <ThemeSwitcher />

  {/* MOBILE HAMBURGER */}
  <button
    onClick={() => setMobileMenu(!mobileMenu)}
    className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
  >
    {mobileMenu ? (
      <FaX size={24} />
    ) : (
      <BiMenu size={24} />
    )}
  </button>

  {user ? (
    <div className="relative hidden md:block">
      {/* AVATAR */}
      <button
        onClick={() => setOpen(!open)}
        className="focus:outline-none"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt="user"
            width={42}
            height={42}
            unoptimized
            className="rounded-full border-2 border-cyan-500 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b dark:border-slate-700">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-slate-500">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="hidden md:flex gap-2">
      <Link
        href="/login"
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full text-xs font-bold"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="border px-6 py-2 rounded-full text-xs font-bold"
      >
        Register
      </Link>
    </div>
  )}
</div>
      </nav>
      {mobileMenu && (
  <div className="md:hidden absolute top-full mt-2 left-4 right-4 bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4">

    <div className="flex flex-col gap-4">

      <NavLink href="/">Home</NavLink>

      <NavLink href="/tutors">Tutors</NavLink>

      {user && (
        <>
          <NavLink href="/add-tutor">
            Add-Tutor
          </NavLink>

          <NavLink href="/my-tutors">
            My-Tutors
          </NavLink>

          <NavLink href="/my-booking">
            My-Booking
          </NavLink>

          <NavLink href="/profile">
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="text-left text-red-500 font-semibold"
          >
            Logout
          </button>
        </>
      )}

      {!user && (
        <>
          <Link
            href="/login"
            className="bg-cyan-600 text-center text-white py-2 rounded-xl font-semibold"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="border text-center py-2 rounded-xl font-semibold"
          >
            Register
          </Link>
        </>
      )}
    </div>
  </div>
)}
    </div>
  );
}