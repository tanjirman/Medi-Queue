"use client";

import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    { label: "Mathematics & Calculus", href: "/tutors?subject=mathematics" },
    { label: "Physics & Core Sciences", href: "/tutors?subject=physics" },
    { label: "Chemistry & Molecular Tech", href: "/tutors?subject=chemistry" },
    {
      label: "Computer Science & Coding",
      href: "/tutors?subject=computer-science",
    },
    { label: "Language & Communications", href: "/tutors?subject=languages" },
  ];

  const platformLinks = [
    { label: "Find Available Tutors", href: "/tutors" },
    { label: "Become a Tutor", href: "/add-tutor" },
    { label: "Student Dashboard", href: "/profile" },
    { label: "Privacy & Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
  ];

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
              <FaGraduationCap className="text-white text-xl" />
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                Medi<span className="text-cyan-600">Queue</span>
              </h2>

              <p className="text-[9px] uppercase tracking-[3px] text-slate-400">
                Smart Learning
              </p>
            </div>
          </Link>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
            Eliminating scheduling manual headaches, managing queue conflicts,
            and securing instantly verified session paths to optimize modern
            student schedules.
          </p>
        </div>

        {/* Learning Services */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Learning Services
          </h3>

          <ul className="flex flex-col gap-2.5">
            {servicesLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  className="inline-block text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:translate-x-1 transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Explore Platform
          </h3>

          <ul className="flex flex-col gap-2.5">
            {platformLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  className="inline-block text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:translate-x-1 transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Contact & Support
          </h3>

          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-3">
              <FiMapPin className="text-cyan-500 text-lg shrink-0" />
              <span>Savar, Dhaka, Bangladesh</span>
            </li>

            <li className="flex items-center gap-3">
              <FiPhone className="text-cyan-500 text-lg shrink-0" />
              <a
                href="tel:+880123456789"
                className="hover:text-cyan-500 transition-colors"
              >
                +880 1234-567890
              </a>
            </li>

            <li className="flex items-center gap-3">
              <FiMail className="text-cyan-500 text-lg shrink-0" />
              <a
                href="mailto:support@mediqueue.com"
                className="hover:text-cyan-500 transition-colors"
              >
                support@mediqueue.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <p className="text-xs text-slate-500">
          &copy; {currentYear}{" "}
          <span className="font-semibold">MediQueue</span>. All rights
          reserved. Built for Smart Scheduling.
        </p>

        <div className="flex items-center gap-4">
          {[
            {
              href: "https://x.com",
              icon: <RiTwitterXFill className="text-base" />,
              label: "X",
            },
            {
              href: "https://linkedin.com",
              icon: <FiLinkedin className="text-base" />,
              label: "LinkedIn",
            },
            {
              href: "https://github.com",
              icon: <FiGithub className="text-base" />,
              label: "GitHub",
            },
            {
              href: "https://instagram.com",
              icon: <FiInstagram className="text-base" />,
              label: "Instagram",
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-cyan-500 hover:bg-cyan-500/10 hover:scale-110 transition-all"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}