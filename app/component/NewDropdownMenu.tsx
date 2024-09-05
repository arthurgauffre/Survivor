import React, { useState } from 'react';

interface AstroDropdownMenuProps {
    options: string[]; // List of options for the dropdown
    onSelect: (value: string) => void; // Callback when an option is selected
}

const AstroDropdownMenu: React.FC<AstroDropdownMenuProps> = ({ options, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onSelect(value); // Call the onSelect function passed via props
    };

    return (
        <div>
            <label htmlFor="dropdown-menu" className="block text-sm font-medium text-gray-700">
                Select Option
            </label>
            <select
                id="dropdown-menu"
                value={selectedValue}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="" disabled>
                    -- Choose an Option --
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AstroDropdownMenu;
