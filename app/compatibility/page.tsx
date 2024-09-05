"use client"; // Ensure this is at the top

import React, { useState, useEffect } from 'react';
import SpawnHeadband from "../component/SpawnHeadband";
import AstroDropdownMenu from "../component/NewDropdownMenu"; // Adjust path if necessary

// Import compatibility data from a local JSON file
import compatibilityData from './compatibility.json'; // Adjust path if necessary

// Type definition based on updated JSON structure
type CompatibilityData = {
  compatibility: {
    [key: string]: {
      [key: string]: number; // Compatibility percentage
    }
  }
};

// List of astrological signs
const astrologicalSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

export default async function Home() {

  let data = await fetch('http://fastapi:8000/api/customers');
  let posts = await data.json()

  console.log(posts);

  const [selectedSign1, setSelectedSign1] = useState<string>("");
  const [selectedSign2, setSelectedSign2] = useState<string>("");
  const [compatibility, setCompatibility] = useState<number | null>(null);

  useEffect(() => {
    if (selectedSign1 && selectedSign2) {
      // Fetch compatibility percentage from the local JSON data
      const data: CompatibilityData = compatibilityData;
      const percentage = data.compatibility[selectedSign1]?.[selectedSign2] || null;
      setCompatibility(percentage);
    }
  }, [selectedSign1, selectedSign2]);

  const handleSign1Select = (value: string) => {
    setSelectedSign1(value);
    console.log("Selected Sign 1:", value);
  };

  const handleSign2Select = (value: string) => {
    setSelectedSign2(value);
    console.log("Selected Sign 2:", value);
  };

  return (
    <SpawnHeadband title="Compatibility">
      <div className="flex flex-col space-y-4 bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-medium">Select Two Astrological Signs</h2>

        <div className='flex justify-evenly flex-wrap'>
          <div>
            <label className="block mb-1 text-sm">First Sign:</label>
            <AstroDropdownMenu options={astrologicalSigns} onSelect={handleSign1Select} />
          </div>

          <div>
            <label className="block mb-1 text-sm">Second Sign:</label>
            <AstroDropdownMenu options={astrologicalSigns} onSelect={handleSign2Select} />
          </div>
        </div>

        {selectedSign1 && selectedSign2 && (
          <div>
            <h3 className="text-md font-medium">Compatibility Result:</h3>
            {compatibility !== null ? (
              compatibility > 50 ? (
                <p className="text-green-600">Compatibility: {compatibility}%</p>
              ) : (
                <p className="text-red-600">Compatibility: {compatibility}%</p>
              )
            ) : (
              <p className="text-gray-600">No compatibility data available.</p>
            )}
          </div>
        )}
      </div>
    </SpawnHeadband>
  );
}
