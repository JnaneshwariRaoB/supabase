"use client";
import { useState } from 'react';
import useStore from '@/app/store/useStore';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <button onClick={toggleDarkMode} className="p-2 rounded bg-gray-800 text-white">
      {darkMode ? '🌙 Dark Mode' : '☀ Light Mode'}
    </button>
  );
}