"use client"; // Ensure this is at the top

import React, { useState, useEffect } from 'react';
import SpawnHeadband from "../component/SpawnHeadband";
import AstroDropdownMenu from "../component/AstroDropdownMenu"; // Adjust path if necessary

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

export default function Home() {
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

        {/* Dropdown for Sign 1 */}
        <div>
          <label className="block mb-1 text-sm">First Sign:</label>
          <AstroDropdownMenu onSelect={handleSign1Select} />
        </div>

        {/* Dropdown for Sign 2 */}
        <div>
          <label className="block mb-1 text-sm">Second Sign:</label>
          <AstroDropdownMenu onSelect={handleSign2Select} />
        </div>

        {/* Display compatibility result */}
        {selectedSign1 && selectedSign2 && (
          <div>
            <h3 className="text-md font-medium">Compatibility Result:</h3>
            {compatibility && compatibility > 50 ? (
              <p className="text-green-600">Compatibility: {compatibility}%</p>
            ) : (
              <p className="text-red-600">Compatibility: {compatibility}%</p>
            )}
          </div>
        )}
      </div>
    </SpawnHeadband>
  );
}
