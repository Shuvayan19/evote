"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Homepage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-3">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-emerald-500 text-3xl font-bold  ">
              EVote
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8 ">
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/createElection"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                Create
              </Link>
              <Link
                href="/vote"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                Vote
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Desktop Login Button */}
              <Link
                href="/auth/signin"
                className="hidden md:block bg-emerald-500 text-white dark:text-gray-900 px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors"
              >
                Login
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-500"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-100 dark:bg-gray-800 pb-4 px-4 transition-colors duration-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/createElection"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create
              </Link>
              <Link
                href="/vote"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vote
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/auth/signin"
                className="bg-emerald-500 text-white dark:text-gray-900 px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 md:py-20 px-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-900 dark:text-gray-50 text-4xl sm:text-5xl font-bold mb-4 text-center md:text-left">
            Make your voice count
          </h1>
          <p className="text-emerald-600 dark:text-emerald-500 text-lg sm:text-xl mb-8 text-center md:text-left">
            Simple. Secure. Transparent.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link
              href="/dashboard/createElection"
              className="bg-emerald-500 text-white dark:text-gray-900 px-8 py-3 rounded-full hover:bg-emerald-600 transition-colors font-medium text-center"
            >
              Create
            </Link>
            <Link
              href="/vote"
              className="border-2 border-emerald-500 text-emerald-500 px-8 py-3 rounded-full hover:bg-emerald-500 hover:text-white dark:hover:text-gray-900 transition-colors font-medium text-center"
            >
              Vote
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Create Election Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 transition-colors duration-200">
            <h2 className="text-emerald-600 dark:text-emerald-500 text-xl sm:text-2xl font-bold mb-4">
              Create Election
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Set up your election in minutes
            </p>
          </div>

          {/* Cast Vote Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 transition-colors duration-200">
            <h2 className="text-emerald-600 dark:text-emerald-500 text-xl sm:text-2xl font-bold mb-4">
              Cast Vote
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Simple and secure voting
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
