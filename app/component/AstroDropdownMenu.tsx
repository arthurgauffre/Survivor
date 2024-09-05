import React, { useState } from 'react';

interface AstroDropdownMenuProps {
    onSelect: (value: string) => void;
}

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

const AstroDropdownMenu: React.FC<AstroDropdownMenuProps> = ({ onSelect }) => {
    const [selectedSign, setSelectedSign] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSign(value);
        onSelect(value);  // Call the onSelect function passed via props
    };

    return (
        <div>
            <label htmlFor="astro-signs" className="block text-sm font-medium text-gray-700">
                Select Astrological Sign
            </label>
            <select
                id="astro-signs"
                value={selectedSign}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="" disabled>
                    -- Choose a Sign --
                </option>
                {astrologicalSigns.map((sign) => (
                    <option key={sign} value={sign}>
                        {sign}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AstroDropdownMenu;
