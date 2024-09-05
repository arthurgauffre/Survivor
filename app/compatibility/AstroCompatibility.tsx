"use client"; // Ensure this is at the top

import React, { useState, useEffect } from 'react';
import SpawnHeadband from "../component/SpawnHeadband";
import NewDropdownMenu from "../component/NewDropdownMenu"; // Adjust path if necessary

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

export default function AstroDropDownMenu ( { data } : { data: [string, string][]}) {
    const [compatibility, setCompatibility] = useState<number | null>(null);
    const [selectedValue1, setSelectedValue1] = useState<string>('toto');
    const [selectedValue2, setSelectedValue2] = useState<string>('toto');

    if (selectedValue1 && selectedValue2) {
        useEffect(() => {
            if (selectedValue1 && selectedValue2) {
                const data: CompatibilityData = compatibilityData;
                const percentage = data.compatibility[selectedValue1]?.[selectedValue2] || null;
                setCompatibility(percentage);
            }
        }, [selectedValue1, selectedValue2]);
    }
    const updateSelectedValue1 = (selectedValue: string): void => {
        setSelectedValue1(selectedValue)
    }

    const updateSelectedValue2 = (selectedValue: string): void => {
        setSelectedValue2(selectedValue)
    }

    return (
        <SpawnHeadband title="Compatibility">
            <div className="flex flex-col space-y-4 bg-white shadow-md rounded-md p-4">
                <h2 className="text-lg font-medium">Select Two Astrological Signs</h2>

                <div className='flex justify-evenly flex-wrap'>
                    <div>
                        <label className="block mb-1 text-sm">First Sign:</label>
                        <NewDropdownMenu options={astrologicalSigns} updateSelectedValue={updateSelectedValue1} />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm">Second Sign:</label>
                        <NewDropdownMenu options={astrologicalSigns} updateSelectedValue={updateSelectedValue2} />
                    </div>
                </div>

                {selectedValue1 && selectedValue2 && (
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
