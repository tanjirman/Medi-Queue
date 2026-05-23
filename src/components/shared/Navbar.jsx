"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// import { authClient } from "@/lib/auth-client";
import NavLink from "./NavLink";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  
  const router = useRouter();

  const user = session?.user || null;

  // LOGOUT
  const handleLogout = async () => {
    await authClient.signOut();

    window.location.href = "/login";
  };

  // LOADING STATE
  if (isPending) {
    return (
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-slate-100 dark:border-white/10">
          <span className="loading loading-spinner loading-md text-cyan-600"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav className="w-full max-w-8xl my-6 mx-4 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 dark:border-white/10 transition-all duration-300">
        {/* LEFT : LOGO */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            Medi<span className="text-cyan-600">Queue</span>
          </Link>
        </div>

        {/* CENTER : NAVIGATION */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">
            <NavLink href="/">Home</NavLink>

            <NavLink href="/tutors">Tutors</NavLink>

            {user && (
              <>
                <NavLink href="/add-tutor">Add Tutor</NavLink>

                <NavLink href="/my-tutors">My Tutors</NavLink>

                <NavLink href="/my-booked-sessions">My Booked Sessions</NavLink>
              </>
            )}
          </div>
        </div>

        {/* RIGHT : AUTH + THEME */}
        {/* RIGHT : AUTH + THEME */}
<div className="flex-1 flex justify-end items-center gap-3">
  
  {/* THEME SWITCHER */}
  <ThemeSwitcher />

  {user ? (
    // LOGGED IN
    <div className="flex items-center gap-3">
      
      {/* PROFILE AVATAR */}
      <Link href="/profile">
        {user?.image ? (
          <Image
            src={user.image}
            alt="user"
            width={42}
            height={42}
            unoptimized
            className="rounded-full border-2 border-cyan-500 cursor-pointer hover:scale-105 transition-all object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-black cursor-pointer">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </Link>

      {/* USER NAME */}
      <div className="hidden md:flex flex-col">
        <span className="text-xs text-slate-400 font-semibold">
          Welcome
        </span>

        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {user?.name}
        </span>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md"
      >
        Logout
      </button>
    </div>
  ) : (
    // NOT LOGGED IN
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all"
      >
        Register
      </Link>
    </div>
  )}
</div>
      </nav>
    </div>
  );
}
