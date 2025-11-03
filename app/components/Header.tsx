"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/NearshopLogoNew.png"
            alt="App Logo"
            width={120}
            height={80}
            className="rounded"
          />
          
        </div>

        {/* Right Side: Navigation Links */}
        {/* <nav className="hidden md:flex space-x-6 pr-2">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/tickets" className="text-gray-600 hover:text-blue-600">
            Tickets
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-blue-600">
            Profile
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
