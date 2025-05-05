"use client";

import React from 'react';

export default function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <p className="text-xl font-bold text-red-600">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}